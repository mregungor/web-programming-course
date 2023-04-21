var mongoose = require('mongoose');
var User = require('./userModel');

mongoose.connect('mongodb://localhost:27017/mbcrypt-test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'));

db.once('open', function(){
    console.log("Connected to the MongoDB");
});

//Create new User
var testUser= new User({
    username: 'emre',
    password: '1234'
});

testUser.save(function(err, doc){
    if(err){ 
        console.log('Could not save document into db');
        throw err;
    }
    console.log("Successfully recorded User, Id:"+ doc.id);
    //closeDBconnection();
});


function closeDBconnection(){
    //Close DB
    db.close( function (){
        console.log('DB is closed');
        process.exit(0);
    });
    console.log("DB user insertion task completed");
}
