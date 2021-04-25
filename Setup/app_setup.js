const express = require('express');
const app = express()
const path = require('path')
const session = require('express-session');


app.use(session({secret: 'secret', saveUninitialized: true,resave: true}));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false}));

app.use(express.static(path.join(__dirname,'../Main/public')));

app.set('views', path.join(__dirname, '../Main/views'));
app.set('view engine', 'ejs');

exports.app = app
exports.session = session
exports.path = path