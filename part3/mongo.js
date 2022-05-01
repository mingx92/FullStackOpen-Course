const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> ')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@testcluster.ox1ey.mongodb.net/PhonebookDB?retryWrites=true&w=majority`

mongoose.connect(url)

const PhonebookSchema = new mongoose.Schema({
  name: String,
  phonenumber: String,
})

const Contact = mongoose.model('Contact', PhonebookSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Contact
    .find({})
    .then(contacts=> {
        contacts.forEach(contact => {
            console.log(`${contact.name} ${contact.phonenumber}`)
        })
        mongoose.connection.close()
    })
  }

  if (process.argv.length > 3) {
      const contact = new Contact({
          name: process.argv[3],
          phonenumber: process.argv[4]
        })
        
        contact.save().then(result => {
            console.log('Contact saved!')
            mongoose.connection.close()
        })
    }