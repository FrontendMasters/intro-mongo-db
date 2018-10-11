const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  
  
}, {timestamps: true})
