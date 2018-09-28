const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const validator = require('express-validator');
const hbs = require('express-handlebars');

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
app.use(validator());

app.use('/', require('./routes/index'));

app.listen(8080);
