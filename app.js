/**
 * Created by Swendley on 22-3-2017.
 */

var http = require('client-http');
var moment = require('moment')
var MongoClient = require('mongodb').MongoClient;
var oldDataTemp = "dfsd"
var oldDataHumidity = "dfsd"

var timerTemp = setInterval(getDataTemp, 1000);
var timerHumidity = setInterval(getDataHumidity, 1000);

function getDataTemp () {
    http.get("http://localhost:3001/api/streamdata/temp", function(data){
        var json = JSON.parse(data);
        var day = new Date(json.DateTime).getDate();
        var month = new Date(json.DateTime).getMonth()+1
        var year = new Date(json.DateTime).getFullYear()
        var hours = new Date(json.DateTime).getHours()
        var processedData = JSON.parse('{"Dag":'+day+', "Maand":'+month+', "Jaar":'+year+', "Uur":'+hours+', "Temperatuur":'+json.Temperature+'}')

       // console.log(processedData);

        if(JSON.stringify(oldDataTemp) != JSON.stringify(json)) {
            oldDataTemp = json;
            console.log(JSON.stringify(oldDataTemp) + "  ," + JSON.stringify(json))
            MongoClient.connect('mongodb://localhost:27017/ictlab', function (err, db) {
                if (err) throw err

                db.collection('temp').insertOne(processedData)
            })
        }
    });
}


function getDataHumidity () {
    http.get("http://localhost:3001/api/streamdata/humidity", function(data){
        var json = JSON.parse(data);
        var day = new Date(json.DateTime).getDate();
        var month = new Date(json.DateTime).getMonth()+1
        var year = new Date(json.DateTime).getFullYear()
        var hours = new Date(json.DateTime).getHours()
        var processedData = JSON.parse('{"Dag":'+day+', "Maand":'+month+', "Jaar":'+year+', "Uur":'+hours+', "Luchtvochtigheid":'+json.Humidity+'}')

        // console.log(processedData);

        if(JSON.stringify(oldDataHumidity) != JSON.stringify(json)) {
            oldDataHumidity = json;
            console.log(JSON.stringify(oldDataHumidity) + "  ," + JSON.stringify(json))
            MongoClient.connect('mongodb://localhost:27017/ictlab', function (err, db) {
                if (err) throw err

                db.collection('humidity').insertOne(processedData)
            })
        }
    });
}