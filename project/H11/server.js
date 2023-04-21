const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req,res){
    res.render('pages/index');
});

app.get('/login', function(req,res){
    res.render('pages/login');
});

app.get('/register', function(req,res){
    res.render('pages/register');
});


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

app.listen(port, function(){
  console.log(`Example app listening on port ${port}`)
})