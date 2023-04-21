var mongoose = require('mongoose');
var User = require('./userModel');
//var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/mbcrypt-test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'));

db.once('open', function(){
    console.log("Connected to the MongoDB");
});


//Find username and test password
User.findOne({username: 'emre'}, function(err, user){
    if(err){ 
        console.log('User name cannot be found or accessed');
        throw err;
    }

    console.log('user: '+ user);
    //test password
    /*
    bcrypt.compare('1234', user.password, function(err, isMatch)
    {
        if(err) throw err;
        console.log('1234 password is :', isMatch);
    });
    */
    
    user.comparePassword('1234', function(err,isMatch){
        if(err){
            console.log('Compare Password error');
            throw err;
        } 

        console.log('1234 password is :', isMatch);
    });
    
});
