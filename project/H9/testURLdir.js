var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(
function(req, res){
    var urlDataQuery= url.parse(req.url, true).query;
    var year=urlDataQuery.year;
    var filename="."+"/"+year+".html";
    console.log(filename);
    fs.readFile(filename, function(err,data){
        if(err){ throw err;}
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    }); 
}
).listen(8080);