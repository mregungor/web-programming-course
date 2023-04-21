const path = require('path');
const exphbs=require('express-handlebars');
const mongoose = require('mongoose');
const express = require('express');
errorHandler = require('errorhandler');
const route = require('../router/route');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = function(app) {
    //DB Connection
    mongoose.connect('mongodb://localhost:27017/project2');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error'));

    db.once('open', function(){
        console.log("Connected to the MongoDB");
    });

    app.use(expressSession({
        secret: 'internetprogrammingcourse',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create(
            {mongoUrl: 'mongodb://localhost:27017/project2'})
        //cookie: { secure: true } //HTTPS için
    }));

    //app.use('/public/', express.static(path.join(__dirname,'../public')));
    app.use(express.static('public'));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
    app.engine('handlebars', exphbs.engine());
    app.set('view engine', 'handlebars');

    //Parse application 
    app.use(bodyParser.urlencoded({extended: false}));
    //parse application json
    app.use(bodyParser.json());

    //Middleware
    app.use( (req, res, next)=>{
        //const userid = req.session.id;
        //const username = req.session.username;
        const {username} = req.session;
        //console.log("User ID:"+userid);
        //const {username} = req.session;
        if(username)
        {
            res.locals = { userMenu: true }
        }else{
            res.locals = { userMenu: false}
        }
        next();
    });

    route(app);
    
    return app;
}