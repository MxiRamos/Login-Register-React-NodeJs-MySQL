const express = require("express");
const mysql = require("mysql");
const routes = require("./routes.js");
const {application} = require('express')
const myconn = require('express-myconnection')
const cors = require('cors')

//app.use(express.json());
const app = express()

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
app.use('/api', routes)

app.listen(5000, () => {
    console.log("running on port", 5000)
});