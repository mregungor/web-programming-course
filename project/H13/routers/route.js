const express = require('express');
const exphbs = require('express-handlebars');
const router= express.Router();
const User = require('../models/userModel');

router.get('/', function(req,res){
    res.render('pages/index');
});

router.get('/login', function(req,res){
    res.render('pages/login');
});

router.get('/register', function(req,res){
    res.render('pages/register');
});

router.post('/registercontrol', function(req,res){
    //console.log(req.body);

    console.log("------------");
    console.log("username: "+req.body.username);
    if(req.body.password == req.body.passwordcontrol)
    {
        console.log("Password Match");
        //Record to Database
        res.send("POST method works");
        //Create new User
        var regUser= new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        console.log(regUser);
        regUser.save(function(err, doc){
            if(err){ 
                console.log('Could not save document into db');
                throw err;
            }
            console.log("Successfully recorded User, Id:"+ doc.id);
        });
        
    }
    else
    {
        console.log("Password Mismatch");
        res.redirect("/register");
    }
    //res.send("POST method works");
});

router.post('/logincontrol', function(req,res){
    var name=req.body.username;
    var password=req.body.password;
    //Find username and test password
    User.findOne({username: name}, function(err, user){
        if(err){ 
            console.log('User name cannot be found or accessed');
            throw err;
        }

        console.log('user: '+ user);
        
        user.comparePassword(password, function(err,isMatch){
            if(err){
                console.log('Compare Password error');
                throw err;
            } 

            console.log(password +" password is :"+ isMatch);

            if(isMatch == true)
            {
                var userpath="/user/"+name;
                res.redirect(userpath);
            }else
            {
                res.redirect("/");
            }
        }); //END-OF-COMPARE PASSWORD
    
    });//END-OF-FIND ONE

});//END-OF-POST METHOD

router.get("/user/:uname", function(req,res){
    console.log(req.params);
    /*
    User.findOne({
        username: req.params.uname    
    }).then(user=>{
        console.log(user);
        console.log(user.username);
        console.log(user.email);
        res.render('pages/user', {userobj: user});
    })
    */
    
    User.find({
        username: req.params.uname    
    },(err, user) => {
        if (!err) {
            res.render("pages/user", {userobj: user});
        }
        else {
            console.log('Error ' + err);
        }
    }).lean(); // It is prevent the warning when trying to display records
    
});

module.exports = router;

/*
app.use('/product', function(req, res, next){
    console.log("Middleware test - req:"+req);
    next();
});

app.get('/product', function(req,res){
    res.sendFile(path.resolve(__dirname,'login.html'));
});

app.get('/', function(req, res){
  //res.send('Hello World!');
  res.sendFile(path.resolve(__dirname,'index.html'));
});

app.get('/login', function(req, res){
    //res.send('Hello World!');
    res.sendFile(path.resolve(__dirname,'login.html'));
});


app.get('/register', function(req, res){
    //res.send('Hello World!');
    res.sendFile(path.resolve(__dirname,'register.html'));
});

app.get('/product/:productId', function(req, res){
   // res.send('<p> product Id: ${req.params_productId}</p>');
   //res.send('productId ' + req.params.productId);
   // res.send(`<p> product Id: ${req.params_productId}</p>`);
   //res.setHeader('Content-type','text/html')
   //res.send("<p> product Id: "+ req.params.productId +"</p>");
});
*/
