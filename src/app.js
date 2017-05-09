const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

let counter = 0

app.put('/counter', (req, res) => {
  counter = req.body.counter

  res.json({counter})
})

app.post('/counter/increment', (req, res) => {
  counter += 1

  res.json({ counter })
})

app.post('/counter/decrement', (req, res) => {
  counter -= 2

  res.json({ counter })
})

app.get('/counter', (req, res) => {
  res.json({ counter })
})

module.exports = app
