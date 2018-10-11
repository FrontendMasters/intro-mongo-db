const express = require('express')
const morgan = require('morgan')
const connect = require('../connect')
const {json, urlencoded} = require('body-parser')
const app = express()
const Todo = require('./todo')

app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.get('/todo/:id', async (req, res) => {
  const todoId = req.params.id
})

app.get('/todos', async (req, res) => {
  
})

app.post('/todo', async () => {
  const todoToCreate = req.body.todo
})

connect('mongodb://localhost:27017/intro-to-mongodb')
  .then(() => app.listen(4000, () => {
    console.log('server on http://localhost:4000')
  }))
  .catch(e => console.error(e))
