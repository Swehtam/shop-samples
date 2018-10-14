const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const validator = require('express-validator');
const session = require('express-session');
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
    secret: 'shop00', 
    cookie: { 
        maxAge : 3600000, 
        httpOnly: true }, 
    resave: false, 
    saveUninitialized: false
}));
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use(validator());

app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/account', require('./routes/account'));

app.listen(config.port);