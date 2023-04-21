var http = require('http');
var dateTime = require('./testModule');
var url = require('url');

http.createServer(
function(req, res){
    console.log("Server started at port 8080");
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write("Date & Time:"+dateTime.testDateTime());
    res.write("\n"+req.url+"\n");
    //res.end("\nHello World");
    var urlDataQuery= url.parse(req.url, true).query;
    var urlDataStr=urlDataQuery.year+" - "+urlDataQuery.month;
    if(urlDataStr.includes("undefined"))
        res.end("-HELLO WORLD-");
    else
        res.end(urlDataStr);  
}
).listen(8080);