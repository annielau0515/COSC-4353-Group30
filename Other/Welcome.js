const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./login.html'));
});

app.post('/Welcome', async (req, res) => {

    var node = document.getElementsByClassName('loginBtn');
    if (node == "Log In") {
        try {
            let foundUser = users.find((data) => req.body.username === data.username);
            if (foundUser) {
    
                let submittedPass = req.body.password;
                let storedPass = foundUser.password;
    
                const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
                if (passwordMatch) {
                    let usrname = foundUser.username;
                    res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br>`);
                } else {
                    res.send("<div align ='center'><h2>Invalid username or password</h2></div><br><br>");
                }
            }
            else {
    
                let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
                await bcrypt.compare(req.body.password, fakePass);
    
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br>");
            }
        } catch {
            res.send("Internal server error");
        }
    }
    else {
        try{
            let foundUser = users.find((data) => req.body.username === data.username);
            if (!foundUser) {
        
                let hashPassword = await bcrypt.hash(req.body.password, 10);
        
                let newUser = {
                    id: Date.now(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hashPassword,
                };
                users.push(newUser);
                console.log('User list', users);
        
                res.send("<div align ='center'><h2>Registration successful</h2></div><br><br>");
            } else {
                res.send("<div align ='center'><h2>Email already used</h2></div><br><br>");
            }
        } catch{
            res.send("Internal server error");
        }
    }
});




server.listen(5500, function(){
    console.log("server is listening on port: 5500");
});