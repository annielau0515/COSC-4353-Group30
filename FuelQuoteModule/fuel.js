const conn = require('./database.js');
const Joi = require('joi');
const express = require('express')
const path = require('path')
const app = express();

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: false}));


function fuelQuoteForm() {
    app.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname + '/fuel form.html'), (err) => {
            if (err) {
                res.send('The Fuel Quote form was not loaded');
            }
            else {return true;};
        })

    });   
}

var quote = fuelQuoteForm();

//sets username to theloudmute
var username = 'theloudmute';

app.post('/fuel', (req, res) => {

    var gallons = req.body.gallons;
    var deliverydate = req.body.deliverydate;

    if (deliverydate) {
        const schema = Joi.object().keys({
            gallons: Joi.number().min(1).required(),
            deliverydate: Joi.date()
        });

        const inputs = {
            gallons: gallons,
            deliverydate: deliverydate
        };

        const result = schema.validate(inputs);

        if (result.error) {
            res.status(400).send(result.error);
            return;
        };


    }
    else {
        const schema = Joi.number().min(1).required();

        const result = schema.validate(gallons);

        if (result.error) {
            res.status(400).send(result.error);
            return;
        };

    };    

    //Sends a query to mysql and returns the state the client lives in
    var sql = 'select c.state from customers c where c.username = ?';

    conn.query(sql, username, function(err, results, fields) {
        const state = results[0].state;
        
        
        if (state === 'TX') {
            sql = 'select in_state_price from price';
            conn.query(sql, function(err, results, fields) {
                if (err) throw err;
                const price = results[0].in_state_price;
                sql = 'select c.address from customers c where c.username = ?';
                conn.query(sql, username, function(err, results, fields) {
                    if (err) throw err;
                    var address = results[0].address;;
                    
                    const cost = gallons * price;
                    if (deliverydate) {
                        sql = 'insert into fuel_quote(gallons, delivery_date, address, price, cost)'
                        sql += ' value(?, ?, ?, ?, ?);';
                        conn.query(sql,[gallons, deliverydate,address,price,cost], function(err) {
                            if (err) throw err;
                            console.log('data successfully added to fuel quote');
                        });
                    }
                    else {
                        sql = 'insert into fuel_quote(gallons, address, price, cost)'
                        sql += ' value(?, ?, ?, ?);';
                        conn.query(sql,[gallons,address,price,cost], function(err) {
                            if (err) throw err;
                            console.log('data successfully added to fuel quote');
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
                sql = 'select c.address from customers c where c.username = ?';
                conn.query(sql, username, function(err, results, fields) {
                    if (err) throw err;
                    var address = results[0].address;;
                    
                    const cost = gallons * price;
                    if (deliverydate) {
                        sql = 'insert into fuel_quote(gallons, delivery_date, address, price, cost)'
                        sql += ' value(?, ?, ?, ?, ?);';
                        conn.query(sql,[gallons, deliverydate,address,price,cost], function(err) {
                            if (err) throw err;
                            console.log('data successfully added to fuel quote');
                        });
                    }
                    else {
                        sql = 'insert into fuel_quote(gallons, address, price, cost)'
                        sql += ' value(?, ?, ?, ?);';
                        conn.query(sql,[gallons,address,price,cost], function(err) {
                            if (err) throw err;
                            console.log('data successfully added to fuel quote');
                        });
                    };
                });
            });
        };
        
    });
});


/*
class Pricing
{
    constructor(gallons, profit, customer) {
        this.gallons = gallons;
        this.profit = profit;
        this.customer = customer;
    }
};
*/
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));