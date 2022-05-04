const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then( () => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const PhonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength:[3,'name:minlength'],
        required:true
    },
    phonenumber: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\d{2}-\d{6,}$|^\d{3}-\d{5,}$/.test(v)
            },
            message: 'phonenumber:customvalidator'
        },
        required: true
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