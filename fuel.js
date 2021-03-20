
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


    app.post('/fuel', (req, res) => {

        const gallons = req.body.gallons;

        const schema = Joi.object({
            gallons: Joi.number().min(1).max(1000000).required()
        });

        const result = schema.validate(req.body);

        if (result.error) {
            res.status(400).send(result.error);
            return;
        };

        const schemadate = Joi.object({
            deliverydate: Joi.date()
        });

        const resultdate = schemadate.validate(req.body.deliverydate);

        if (resultdate.error) {
            res.status(400).send(result.error);
            return;
        }

        const deliverydate = req.body.deliverydate;
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