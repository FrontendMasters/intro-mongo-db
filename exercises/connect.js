const mongoose = require('mongoose')

const connect = (url) => mongoose.connect(url, {
  useNewUrlParser: true
})

module.exports = connect
