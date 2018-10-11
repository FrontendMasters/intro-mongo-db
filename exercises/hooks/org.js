const mongoose = require('mongoose')
const Project = require('./project')
const cdnUrl = 'https://cdn.adminapp.com'

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    status: {
      type: String,
      required: true,
      default: ['active'],
      enum: ['active', 'trialing', 'overdue', 'canceled']
    },
    last4: {
      type: Number,
      min: 4,
      max: 4
    }
  }
})


orgSchema.post('remove', async (doc, next) => {
  await Project.remove({org: doc._id}).exec()
  next()
})

orgSchema.virtual('avatar').get(function() {
  return `${cdnUrl}/${this._id.toString()}`
})

module.exports = mongoose.model('org', orgSchema)
