const express = require("express")
const routes = express.Router()

routes.get('/', (req, res) => {
    req.getConnection((err,conn) => {
        if(err) res.send(err)
        
        conn.query('SELECT * FROM users', (err,rows) => {
            if(err) res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res) =>{
    req.getConnection((err, conn) => {

        conn.query('INSERT INTO users set ?', [req.body], (err,rows) => {
            if(err) return res.send(err)

            res.send('user inserted')
        })
    })
})

module.exports = routes