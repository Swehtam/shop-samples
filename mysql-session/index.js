const config = require('../config/default');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);

const sessionStore = new mysqlStore({
    host:  config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

module.exports = sessionStore