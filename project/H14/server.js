const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./routers/route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const MongoStore  = require('connect-mongo');
const { appendFileSync } = require('fs');

const app = express();
const port = 3000;

//DB Connection
mongoose.connect('mongodb://localhost:27017/project1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'));

db.once('open', function(){
    console.log("Connected to the MongoDB");
});



app.use(expressSession({
    secret: '?gizli_anahtar_',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/project1'})
}));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//Parse Application
app.use(bodyParser.urlencoded({extended: false}));
//Parse Application JSON
app.use(bodyParser.json());

//Display Properties
app.use( (req, res, next)=>{
  const {name} = req.session;
  //const name= req.session.name;
  if(name)
  {
    res.locals = { userLoginState: true }
  }
  else
  {
    res.locals = { userLoginState: false }
  }
  next();
});

//Routers
app.use('/',router);

app.listen(port, function(){
  //console.log(`Example app listening on port ${port}`)
  console.log("Example app listening on port: "+port);
})