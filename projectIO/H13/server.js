const express = require('express');
const config = require('./server/configuration');
var app = express();
const port = 3000;

app.set('port', process.env.PORT || port );
app.set('views', __dirname + '/views');
app = config(app);

app.listen(app.get('port'), () => {
    console.log('Example app listening on port: ' + port);
  })

/*
app.use('/video', function (req, res, next){
    console.log("Middleware test");
    next();
});

app.get('/video', function(req, res){
    res.sendFile(path.resolve(__dirname,'backup/login.html'))
});

app.get('/', function(req, res){
  //res.send('Hello World!');
  res.sendFile(path.resolve(__dirname,'backup/index.html'))
});

app.get('/', function(req, res){
    //res.send('Hello World!');
    res.sendFile(path.resolve(__dirname,'backup/index.html'))
});

app.get('/register', function(req, res){
    res.sendFile(path.resolve(__dirname,'backup/register.html'))
});

app.get('/login', function(req, res){
    res.sendFile(path.resolve(__dirname,'backup/login.html'))
});

app.get('/product', function(req, res){
    res.send('Hello World!');
  });

app.get('/product/:productId', function(req, res){
    res.send('Product ID:  '+ req.params.productId);
});
*/

//app.use(express.static('public'));
/*
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
*/

/*
app.get('/', function(req,res){
    res.render('index');
});

app.get('/login', function(req,res){
    res.render('login/login');
});

app.get('/register', function(req,res){
    res.render('login/register');
});
*/