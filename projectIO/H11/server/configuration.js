const path = require('path');
const exphbs=require('express-handlebars');
const mongoose = require('mongoose');
const express = require('express');
errorHandler = require('errorhandler');
const route = require('../router/route');

module.exports = function(app) {
    //app.use('/public/', express.static(path.join(__dirname,'../public')));
    app.use(express.static('public'));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
    app.engine('handlebars', exphbs.engine());
    app.set('view engine', 'handlebars');
    route(app);
    return app;
}