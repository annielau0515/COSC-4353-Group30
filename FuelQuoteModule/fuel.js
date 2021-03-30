
const mysql = require('mysql')
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

var connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'liltre94',
    database: 'fuel_company'
});

app.post('/fuel', (req, res) => {

    const gallons = req.body.gallons;
    const deliverydate = req.body.deliverydate;

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

        connection.query('insert into fuel_quote(gallons, delivery_date) values (?, ?)', [gallons, deliverydate]);

    }
    else {
        const schema = Joi.number().min(1).required();

        const result = schema.validate(gallons);

        if (result.error) {
            res.status(400).send(result.error);
            return;
        };
        
        connection.query('insert into fuel_quote(gallons) values(?)', [gallons]);
    };    

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