const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    unique: true
  },
  complete: {
    type: Boolean,
    default: false,
    required: true
  },
  dueOn: Date
}, {timestamps: true})


module.exports = mongoose.model('todo', todoSchema)
