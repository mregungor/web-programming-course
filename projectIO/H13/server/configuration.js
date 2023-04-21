const path = require('path');
const exphbs=require('express-handlebars');
const mongoose = require('mongoose');
const express = require('express');
errorHandler = require('errorhandler');
const route = require('../router/route');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt');

module.exports = function(app) {
    //DB Connection
    mongoose.connect('mongodb://localhost:27017/project2');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error'));

    db.once('open', function(){
        console.log("Connected to the MongoDB");
    });

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

    route(app);
    
    return app;
}