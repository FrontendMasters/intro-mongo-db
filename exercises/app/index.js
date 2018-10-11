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
  const todo = await Todo.findById(id).exec()
  res.status(200).json(todo)
})

app.get('/todos', async (req, res) => {
  const todos = await Todo.find({}).lean().exec()
  res.status(200).json(todos)
})

app.post('/todo', async () => {
  const todoToCreate = req.body.todo
  const todo = await Todo.create(todoToCreate)
  res.status(201).json(todo.toJSON())
})

connect('mongodb://localhost:27017/intro-to-mongodb')
  .then(() => app.listen(4000, () => {
    console.log('server on http://localhost:4000')
  }))
  .catch(e => console.error(e))
