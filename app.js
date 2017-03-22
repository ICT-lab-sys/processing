/**
 * Created by Swendley on 22-3-2017.
 */

var http = require('client-http');

http.get("http://localhost:3001/api/temp", function(data){
    data && console.log(data);
});