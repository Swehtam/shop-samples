const express = require('express');
const body_parser = require('body-parser');
const validator = require('express-validator');
const hbs = require('express-handlebars');
const app = express();

app.set('view engine', 'handlebars');
app.engine('handlebars', hbs({
	defaultLayout: 'index', 
	layoutsDir: __dirname + '/views'
}));
app.use(express.static(__dirname + '/static'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(validator());

app.use('/', require('./routes/index'));

app.listen(8080);
