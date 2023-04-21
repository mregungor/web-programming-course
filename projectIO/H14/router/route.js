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

    app.get('/admin/:uname', function(req,res){
        console.log(req.params.uname);
        var query= User.find({});
        

        User.findOne({username: req.session.username}, 
            function(err, user){
                if(err) throw err;
                //console.log("step 1");
                query.exec(function(err,allusers){
                    res.render('admin', {usersObj: user, allusers: allusers});
                });
                //res.render('admin', {usersObj: user});
            }
        ).lean();
    
        //res.render('admin');
    });

    app.post('/admin/:uname', function(req,res){
        console.log("admin post");
        //User.find({})
        //res.redirect('/admin/:'+req.session.username);
          
    });

    app.get('/user/:uname', function(req,res){

        if(req.session.authLvl==2)
        {
            res.redirect('/admin/:'+req.session.username);
        }
        else if(req.session.authLvl==5)
        {
            //console.log(req.params.uname)
            if(req.params.uname == req.session.username)
            {
                User.findOne({username: req.session.username}, 
                    function(err, user){
                        if(err) throw err;
                        //console.log(user);
                        res.render('user', {usersObj: user});
                    }).lean();
            }
        }
        else
        {
            res.redirect('/login');
        }
        
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
                    //SESSION
                    req.session.username = user.username;
                    req.session.regdate = user.regDate;
                    req.session.id = user._id;
                    req.session.authLvl=user.user_auth;
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

    app.get('/logout', function(req,res){
        console.log("Pressed Logout Menu Button");
        //close session
        req.session.destroy(function(err, docs){
            if(err) throw err;
            res.redirect('/');
        });
    });

}