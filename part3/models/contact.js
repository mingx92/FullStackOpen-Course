const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
  
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PhonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength:3,
    required:true
  },
  phonenumber: {
    type: String,
    minlength:1,
    required:true
  }
})

PhonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Contact', PhonebookSchema)