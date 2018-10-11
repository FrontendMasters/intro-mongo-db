const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connect = (url) => mongoose.connect(url, {
  useNewUrlParser: true
})

module.exports = connect
