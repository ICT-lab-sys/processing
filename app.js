/**
 * Created by Swendley on 22-3-2017.
 */

var http = require('client-http');
var moment = require('moment')

var timer = setInterval(getData, 1000);

function getData () {
    http.get("http://localhost:3001/api/temp", function(data){
        var json = JSON.parse(data)
        console.log(json.DateTime);

    });
}
