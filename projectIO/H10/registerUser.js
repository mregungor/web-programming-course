var mongoose = require('mongoose');
var User = require('./userModel');

mongoose.connect('mongodb://localhost:27017/postgresql');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
    console.log("Connected to the MongoDB");
});

//Create new User
var testUser= new User({
    _id: '625ff6436fbfafac9036b0aa',
    username: 'suleyman',
    password: 'derya1234'
});

testUser.save(function(err,doc){
    if(err)
    {
        console.log("Cannot save document TestUser");
        throw err;
    }

    console.log("TestUser recorded to db - doc:"+doc);
    closeDBconnection();
});


function closeDBconnection()
{
    db.close(function(){
        console.log("DB is closed");
        process.exit(0);
    });
}
