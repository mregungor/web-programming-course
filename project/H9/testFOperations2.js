var fs = require('fs');

fs.unlink('deletethis.txt', function(err){
    if(err){ 
        console.log("txt cannot be deleted!"); 
        throw err;
    }
    console.log("Txt Deleted!");
});