const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  social: {
    twitter: {
      type: String,
      unique: true,
      sparse: true
    },
    linkedin: {
      type: String,
      unique: true,
      sparse: true
    }
  }
}, {timestamps: true})

module.exports = mongoose.model('author', authorSchema)
