const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const validator = require('express-validator');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const hbs = require('express-handlebars');
const config = require('./config/default');
const passport = require('passport');
const initPassport = require('./passport/init');
const sessionStore = new mysqlStore({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});


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
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use(validator());
app.use(session({
    key: 'session_store',
    secret: 'session_secret',
    resave: true,
    store: sessionStore,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/account'));

app.listen(config.port);