const mongoose = require('mongoose')
const cuid = require('cuid')
const connect = require('./exercises/connect')
const url = 'mongodb://localhost:27017/intro-mongodb-testing'

global.newId = () => {
  return mongoose.Types.ObjectId()
}

beforeEach(async done => {
  const db = cuid()
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {})
    }
    return done()
  }
  if (mongoose.connection.readyState === 0) {
    try {
      await connect(url + db)
      clearDB()
    } catch (e) {
      throw e
    }
  } else {
    clearDB()
  }
})
afterEach(done => {
  mongoose.disconnect()
  return done()
})
afterAll(done => {
  return done()
})
