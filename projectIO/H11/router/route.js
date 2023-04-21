const exphbs=require('express-handlebars');

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
}