const express = require('express');
const config = require('./server/configuration');
const expressSession = require('express-session');
var app = express();
const port = 3000;

app.set('port', process.env.PORT || port );
app.set('views', __dirname + '/views');
app = config(app);



app.listen(app.get('port'), () => {
    console.log('Example app listening on port: ' + port);
  })

