/**
 * Created by Swendley on 22-3-2017.
 */

var http = require('client-http');
var moment = require('moment')
var MongoClient = require('mongodb').MongoClient
var oldData = "dfsd"

var timer = setInterval(getData, 1000);

function getData () {
    http.get("http://localhost:3001/api/streamdata/temp", function(data){
        var json = JSON.parse(data)
        var day = new Date(json.DateTime).getDate()
        var month = new Date(json.DateTime).getMonth()+1
        var year = new Date(json.DateTime).getFullYear()
        var hours = new Date(json.DateTime).getHours()
        var processedData = JSON.parse('{"Dag":'+day+', "Maand":'+month+', "Jaar":'+year+', "Uur":'+hours+', "Temperatuur":'+json.Temperature+'}')

       // console.log(processedData);

        if(JSON.stringify(oldData) != JSON.stringify(processedData)) {
            var test = oldData
            oldData = processedData;
            console.log(JSON.stringify(oldData) + "  ," + JSON.stringify(processedData))
            MongoClient.connect('mongodb://localhost:27017/ictlab', function (err, db) {
                if (err) throw err

                db.collection('temp').insertOne(test)
            })
        }
    });
}
