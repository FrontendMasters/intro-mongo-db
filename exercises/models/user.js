const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  betaUser: {
    type: Boolean
  },
  birthDate: Date,
  pets: [{type: String}],
  address: {
    other: Boolean,
    street: String,
    houseNumber: Number,
    zip: Number,
    city: String,
    State: String
  }
})

module.exports = mongoose.model('user', userSchema)
