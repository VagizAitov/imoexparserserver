const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const axios = require('axios')

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'users'
})


const PORT = process.env.PORT || 8082
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users"
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.post('/users', (req, res) => {
    const sql = 'INSERT INTO users (`id`, `pass`, `login`, `token`) VALUES (?)'
    const values = [
        req.body.id,
        req.body.pass,
        req.body.login,
        req.body.token
    ]
    
    db.query(sql, [values], (err, data) => {
        if(err) return res.json({Message: 'Err'})
        return res.json
    })
})

app.post('/posts', (req, res) => {
    const sql = 'INSERT INTO posts (`id`, `iduser`, `title`, `text`) VALUES (?)'
    const values = [
        req.body.id,
        req.body.iduser,
        req.body.title,
        req.body.text
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json({Message: 'Err'})
        return res.json
    })
})

app.get(`/posts`, (req, res) => {
    const sql = `SELECT * FROM posts`
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/empty', (req, res) => {
    const sql = `SELECT * FROM empty`
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get(`/posts/:id`, (req, res) => {
    const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get(`/posts/:uid/:id`, (req, res) => {
    const sql = `SELECT * FROM posts WHERE iduser = ${req.params.uid} AND id = ${req.params.id}`
    console.log(req.params.uid, req.params.id)
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get(`/users/:login`, (req, res) => {
    const sql = `SELECT * FROM users WHERE login = '${req.params.login}'`
    console.log(req.params.login)
    db.query(sql, (err, data) => {
        if(err) return console.log(err);
        return res.json(data);
    })
})

app.get('/liked/:iduser', (req, res) => {
    const sql = `SELECT * FROM liked WHERE iduser = '${req.params.iduser}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.get('/liked/:iduser/:idpost', (req, res) => {
    const sql = `SELECT * FROM liked WHERE iduser = '${req.params.iduser}' AND idpost = '${req.params.idpost}'`;
    console.log(req.body.iduser)
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post('/liked', (req, res) => {
    const sql = 'INSERT INTO liked (`iduser`, `idpost`) VALUES (?)'
    const values = [
        req.body.iduser,
        req.body.idpost
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json({Message: `${err}`})
        return res.json
    })
})

app.delete('/liked', (req, res) => {
    const sql = `DELETE FROM liked WHERE iduser = ${req.body.iduser} AND idpost = ${req.body.idpost}`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json
    })
})

app.listen(PORT, (err) => {
    console.log(`${PORT}`, err)
    setInterval(() => axios.get(
        'http://localhost:8082/empty'
    ), 2500)
})