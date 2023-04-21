var mongoose = require('mongoose');
var User = require('./userModel');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/postgresql');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
    console.log("Connected to the MongoDB");
});

User.findOne({username: 'derya'}, function(err, user){
    if(err) throw err;
    /*
    user.comparePassword('12345', function(err, isMatch){
        if(err) throw err;
        console.log("Entered Password 12345 is:" + isMatch);
    });

    user.comparePassword('eray123', function(err, isMatch){
        if(err) throw err;
        console.log("Entered Password eray123 is:" + isMatch);
    });
    */
    //user.comparePassword('derya1234', function(err, isMatch)

    //console.log("user info:"+user)
    bcrypt.compare('derya1234', user.password, function(err, isMatch)
    {
        if(err) throw err;
        console.log('Entered Password derya1234 is:" + isMatch', isMatch);
    });
    

});
