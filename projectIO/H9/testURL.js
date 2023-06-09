var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(
    function(req,res){
        //var urlData=url.parse(req.url, true);
        //var fileName="."+"/productpages"+urlData.pathname;
        var qData=url.parse(req.url, true).query;
        var fileName="."+"/productpages"+"/"+qData.productId+".html";

        fs.readFile(fileName, function(err,data)
        {
            if(err){
                res.writeHead(404,{'Content-Type':'text/html'});
                return res.end("404 - Not Found");
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }).listen(8080);