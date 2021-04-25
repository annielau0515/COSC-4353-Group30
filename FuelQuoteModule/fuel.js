setup = require('../Setup/app_setup')

const conn = require('../Database/database')
const app = setup.app
const path = setup.path
const session = setup.session

const PricingClass = require('../PricingModule/Pricing')

app.post('/fuelQuote', (req, res) => {
    var Pricing = new PricingClass.Pricing

    gallons = req.body.gallons;
    deliverydate = req.body.deliverydate;  

    Pricing.set_gallons(gallons);
    
    function client_query (fullname, Pricingclass, callback) {
        // Sends a query to mysql and returns the state the client lives in
        let sql = 'select* from client_information c where c.full_name = ?';
        conn.query(sql, fullname, function(err, results) {
            if (err) {
                callback(err, null, null)
            } else
            callback(null, Pricingclass, results)
        });
    }

    var info;

    client_query(req.session.fullname, Pricing, function(err, Pricingclass, content) {
        if (err) {
            console.log(err)
        }
        else {
            info = content[0]
            Pricingclass.set_location(info.state)
        }
    })

    // Sends a query to database to see if client has fuel quote history
    function quote_query (fullname, Pricingclass, gallons, callback) {
        let sql = 'select * from fuel_quote f where f.full_name = ?';
        conn.query(sql, fullname, function(err, results) {
            if (err) {
                callback(err, null, null, null)
            }
            else {
                callback(null, Pricingclass, gallons, results);
            }
        });
    }
    
    quote_query(req.session.fullname, Pricing, gallons, function(err, Pricingclass, gallons, results) {
        if (err) {
            console.log(err)
        }
        else {
            Pricingclass.set_history(results[0]);
            var price = Pricingclass.get_price();
            var cost = price * gallons

            // Add fuel quote to database
            sql = 'insert into fuel_quote(full_name, gallons, address1, price, cost) values(?, ?, ?, ?, ?)'
            conn.query(sql, [info.full_name, gallons, info.address1, price, cost], function(err) {
                if (err) throw err;
            })
        }
    })

    function displayPage(fullname, callback) {
        let sql = 'select* from fuel_quote f where f.full_name = ?'
        conn.query(sql, fullname, function(err, results) {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, results)
            }
        })
    }

    displayPage (req.session.fullname, function(err, results) {
        if (err) {
            console.log(err)
        }
        else {
            res.render('fuelQuoteDisplay', {results: results})
        }
    })
});