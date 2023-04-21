var http = require('http');
var fs = require('fs');

fs.unlink('deletethis.txt',function(err){
    if(err){ 
        console.log("Cannot Delete File"); 
        throw err;
    }
    console.log("File is deleted!");
});
