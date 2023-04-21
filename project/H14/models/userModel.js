var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_FACTOR = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true},
    email: { type: String },
    regDate: { type: Date , default: Date.now },
    user_clearance: { type: Number, default: 5}
});

UserSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password')) return next();

    //Salt
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb)
{
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch)
    {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);