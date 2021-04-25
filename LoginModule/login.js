setup = require('../Setup/app_setup')

const conn = require('../Database/database')
const app = setup.app
const path = setup.path
const session = setup.session

// sends the login html 
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, "../Main/public/login.html"));
});

// gets the login information
app.post('/', (req,res)=> {
    var login = req.body.loginName;
    var pwd = req.body.loginPass;
    let sql = 'select * from user_credentials u where ? = u.id and ? = u.password';
    if (login && pwd) {
        conn.query(sql, [login, pwd], function(err, results, fields) {
            if (results.length > 0) {
                conn.query('select c.full_name from client_information c where c.id = ?', login, (err, results, fields) => {
                    req.session.fullname = results[0].full_name;
                    res.sendFile(path.join(__dirname, '../Main/public/FuelQuoteForm.html'));
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

// lets the user sign up
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
            res.sendFile(path.join(__dirname, '../Main/public/client_information.html'));
        };
    });
});

// makes the user fill out information if they signed up
app.post('/client_information', (req, res) => {
    let sql = 'insert into user_credentials(id, password) values(?, ?)';
    conn.query(sql, [req.session.username,req.session.pwd], (err) => {
        if (err) throw err;
    });

    var fullname = req.body.fullName;
    req.session.fullname = fullname
    var add1 = req.body.Address1;
    var add2 = req.body.Address2;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;

    sql = 'insert into client_information(id, full_name, address1, address2, city, state, zip_code)';
    sql+= ' values(?,?,?,?,?,?,?)';
    conn.query(sql, [req.session.username,fullname,add1,add2,city,state,zip], (err)=> {
        if (err) throw err;
    });
            
    res.sendFile(path.join(__dirname, '../Main/public/FuelQuoteForm.html'));
});
