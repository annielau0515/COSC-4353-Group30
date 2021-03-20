const express = require('express');
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

console.log(__dirname);  // directory of file 
app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connect...")
    }
})

app.get("/", (req, res) => {
    //res.send('<a href="http://127.0.0.1:5500/Client%20Profile.html">Client Profile</a><br><a href="http://127.0.0.1:5500/Welcome.html">Welcome</a>')
    res.render("index");
});
app.listen(5500, () => {
    console.log("Server started on Port 5500");
})