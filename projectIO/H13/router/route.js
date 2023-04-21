const exphbs=require('express-handlebars');
const User = require('../model/userModel');
const bcrypt= require('bcrypt');

module.exports = function(app) {
    
    app.get('/', function(req,res){
        res.render('index');
    });

    app.get('/login', function(req,res){
        res.render('login/login');
    });

    app.get('/register', function(req,res){
        res.render('login/register');
    });

    app.get('/user/:uname', function(req,res){
        //console.log(req.params.uname)
        User.findOne({username: req.params.uname}, 
        function(err, user){
            if(err) throw err;
            console.log(user);
            res.render('user', {usersObj: user});
        }).lean();
        //res.render('user');
    });

    app.post('/login/logincontrol',function(req,res){
        console.log(req.body);
        User.findOne({username: req.body.username}, function(err, user){
            if(err) throw err;
            bcrypt.compare(req.body.password, user.password, function(err, isMatch)
            {
                if(err) throw err;
                console.log('Entered Password '+ req.body.password +" - " + "isMatch: "+ isMatch);

                if(isMatch == true)
                {
                    res.redirect('/user/'+req.body.username);
                }else{
                    res.redirect('/login');
                }
            });//END-OF-BCRYTP
        });//END-OF-FINDONE - DB
    });//END-OF-POST

    app.post('/login/registrationcontrol', function(req,res){
        console.log(req.body);

        if(req.body.password == req.body.passwordcontrol)
        {
            console.log("Password Control OK")
            //Create new User
            var newUser= new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });

            newUser.save(function(err,doc){
                if(err)
                {
                    console.log("Cannot save document TestUser");
                    throw err;
                }
            
                console.log("TestUser recorded to db - doc:"+doc);
            });
            res.redirect('/user/'+newUser.username);
            //res.render('user');
            //res.send("Success: "+ newUser);
        }else{
            console.log("PASS CONTROL FAIL");
            res.redirect("/register");
        }

        console.log(req.body.username);
        //res.send("POST TEST");
    });

}