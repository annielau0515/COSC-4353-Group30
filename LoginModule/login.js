const express = require('express');
const conn = require('../FuelQuoteModule/database.js');
const path = require('path')
const session = require('express-session');
const app = express();
//const fuel = require('../FuelQuoteModule/fuel.js');

app.use(session({secret: 'secret', saveUninitialized: true,resave: true}));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false}));

app.use(express.static(path.join(__dirname,'./public')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/login.html'));
});

app.post('/', (req,res)=> {
    var login = req.body.loginName;
    var pwd = req.body.loginPass;
    let sql = 'select * from user_credentials u where ? = u.id and ? = u.password';
    if (login && pwd) {
        req.session.loggedin = true;
        conn.query(sql, [login, pwd], function(err, results, fields) {
        if (results.length > 0) {
            conn.query('select c.full_name from client_information c where c.id = ?', login, (err, results, fields) => {
                console.log(results)
                req.session.fullname = results[0].full_name;
                res.sendFile(path.join(__dirname+'/FuelQuoteForm.html'));
            });
        }
        else {
            res.send('Please enter a valid username and password');
        };
        });
    }
    else {
        res.send('Please enter a username and password');
        
    };
});

app.post('/signup', (req, res) => {
    var login = req.body.signName;
    var pwd = req.body.signPass;
    conn.query('select * from user_credentials u where u.id = ?', login, (err, results, fields) => {
        if (err) throw err;
        else if (results.length > 0) {
            res.send("That username is already taken. Please enter a different username.");
        }
        else {
            req.session.username = login;
            req.session.pwd = pwd;
            res.sendFile(path.join(__dirname + '/client_information.html'));
        };
    });
});

app.post('/client_information', (req, res) => {
    let sql = 'insert into user_credentials(id, password) values(?, ?)';
        conn.query(sql, [req.session.username,req.session.pwd], (err) => {
            if (err) throw err;
            var fullname = req.body.fullName;
            var add1 = req.body.Address1;
            var add2 = req.body.Address2;
            var city = req.body.city;
            var state = req.body.state;
            var zip = req.body.zip;
            if (add2) {
                let sql = 'insert into client_information(id, full_name, address1, address2, city, state, zip_code)';
                sql+= ' values(?,?,?,?,?,?,?)';
                conn.query(sql, [req.session.username,fullname,add1,add2,city,state,zip], (err)=> {
                    if (err) throw err;
                    req.session.fullname = fullname;
                });
            }
            else {
                let sql = 'insert into client_information(id, full_name, address1, city, state, zip_code)';
                sql+= ' values(?,?,?,?,?,?)';
                conn.query(sql, [req.session.username,fullname,add1,city,state,zip], (err)=> {
                    if (err) throw err;
                    req.session.fullname = fullname;
    
                });
                
            };
            res.sendFile(path.join(__dirname+'/FuelQuoteForm.html'));
        });
    
});

app.post('/fuelQuote', (req, res) => {

    var gallons = req.body.gallons;
    var deliverydate = req.body.deliverydate;  

    //Sends a query to mysql and returns the state the client lives in
    var sql = 'select c.state from client_information c where c.full_name = ?';
 
    const fullname = req.session.fullname;

    conn.query(sql, fullname, function(err, results, fields) {
        const state = results[0].state;
        
        
        if (state === 'TX') {
            sql = 'select in_state_price from price';
            conn.query(sql, function(err, results, fields) {
                if (err) throw err;
                const price = results[0].in_state_price;
                sql = 'select c.address1 from client_information c where c.full_name = ?';
                conn.query(sql, fullname, function(err, results, fields) {
                    if (err) throw err;
                    var address = results[0].address1;;
                    
                    const cost = gallons * price;
                    if (deliverydate) {
                        sql = 'insert into fuel_quote(full_name, gallons, delivery_date, address1, price, cost)'
                        sql += ' value(?, ?, ?, ?, ?, ?);';
                        conn.query(sql,[fullname, gallons, deliverydate,address,price,cost], function(err) {
                            if (err) throw err;
                            console.log('data successfully added to fuel quote');
                            conn.query('select * from fuel_quote', function(err, results, fields) {
                                if (err) throw err;
                                app.set('views', __dirname);
                                app.set('view engine', 'ejs');
                                console.log(results);

                                res.render('fuelQuoteDisplay', {results: results});
                            });
                        });
                    }
                    else {
                        sql = 'insert into fuel_quote(full_name, gallons, address1, price, cost)'
                        sql += ' value(?, ?, ?, ?, ?);';
                        conn.query(sql,[fullname, gallons,address,price,cost], function(err) {
                            if (err) throw err;
                            console.log('data successfully added to fuel quote');
                            conn.query('select * from fuel_quote', function(err, results, fields) {
                                if (err) throw err;
                                app.set('views', __dirname);
                                app.set('view engine', 'ejs');
                                console.log(results);

                                res.render('fuelQuoteDisplay', {results: results});
                            });
                        });
                    };
                });
            });
        }
        else {
            sql = 'select out_of_state_price from price';
            conn.query(sql, function(err, results, fields) {
                if (err) throw err;
                const price = results[0].out_of_state_price;
                sql = 'select c.address1 from client_information c where c.full_name = ?';
                conn.query(sql, fullname, function(err, results, fields) {
                    if (err) throw err;
                    var address = results[0].address1;;
                    
                    const cost = gallons * price;
                    if (deliverydate) {
                        sql = 'insert into fuel_quote(full_name, gallons, delivery_date, address1, price, cost)'
                        sql += ' value(?, ?, ?, ?, ?, ?);';
                        conn.query(sql,[fullname, gallons, deliverydate,address,price,cost], function(err) {
                            if (err) throw err;
                            console.log('data successfully added to fuel quote');
                            conn.query('select * from fuel_quote', function(err, results, fields) {
                                if (err) throw err;
                                app.set('views', __dirname);
                                app.set('view engine', 'ejs');
                                console.log(results);

                                res.render('fuelQuoteDisplay', {results: results});
                            });
                        });
                    }
                    else {
                        sql = 'insert into fuel_quote(full_name, gallons, address1, price, cost)'
                        sql += ' value(?, ?, ?, ?, ?);';
                        conn.query(sql,[fullname, gallons,address,price,cost], function(err) {
                            if (err) throw err;
                            console.log('data successfully added to fuel quote');
                            conn.query('select * from fuel_quote', function(err, results, fields) {
                                if (err) throw err;
                                app.set('views', __dirname);
                                app.set('view engine', 'ejs');
                                console.log(results);

                                res.render('fuelQuoteDisplay', {results: results});
                            });
                        });
                    };
                });
            });
        };
        
    });
});   




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//module.exports = app;