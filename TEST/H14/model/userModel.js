var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_Factor= 8;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: {type: String},
    user_auth: {type: Number, default: 5},
    regDate: { type: Date , default: Date.now }
});

UserSchema.pre('save', function(next)
{
    var user = this;

    if(!user.isModified('password')) return next();

    //generate salt
    bcrypt.genSalt(SALT_Factor, function(err, salt)
    {
        if(err) return next(err);

        //hash
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password=hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb)
{
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User',UserSchema);

