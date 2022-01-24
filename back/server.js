const express = require("express");
const mysql = require("mysql");
const routes = require("./routes.js");
const {application} = require('express')
const myconn = require('express-myconnection')
const cors = require('cors')


const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Password@123",
    database: "library"
})



app.post('/register', (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (user, password) VALUES(?,?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    )
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE user = ? AND password = ? ",
        [username, password],
        (err, result) => {
            if(err){
                res.send({err: err});
            } 

            if (result) {
                    res.send(result);
            } else{
                    res.send({ message: "Wrong username/password combination!"})
            }
            
        }
    )
})


/*
const app = express()
app.use(express.json());

app.set('port', process.env.PORT || 5000)

const dbOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Password@123',
    database: 'library'
};


app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())


app.get('/', (req, res) =>{
    res.send("bienvenidos")

})
app.use('/register', routes)

*/


app.listen(5000, () => {
    console.log("running on port", 5000)
});