const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const validator = require('express-validator');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const hbs = require('express-handlebars');
const config = require('./config/default');

const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', hbs({
	layoutsDir: __dirname + '/views', 
	partialsDir: __dirname + '/views/partials',
	extname: 'hbs'
}));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'mystore',
  resave: false,
  saveUninitialized: false,
}));
app.use(validator());
app.use(fileUpload());

app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));

app.listen(config.port);