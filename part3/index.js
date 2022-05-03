const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Contact = require('./models/contact')

app.use(express.json())

var morgan = require('morgan')
morgan.token('post_body', function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_body'))

app.use(cors())

app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  console.log("Getting People Info")
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/info', (request, response) => {
    let ppl_count = contacts.length;
    let current_time = new Date();
    response.send(`Phonebook has info for ${ppl_count} people ${current_time}`)
  })

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
      if (contact) {
        response.json(contact)
      } else {
          response.status(404).end()
        }     
    })
    .catch(error => {
      console.log(error => next(error))
    })
  })

app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndRemove(request.params.id).then(result => {
      response.status(204).end()
    }) 
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    
    const person = request.body
    if (person.name && person.phonenumber) {
      const contact = new Contact({
        name: person.name,
        phonenumber: person.phonenumber
      })

      contact.save().then(savedContact => {
        response.json(savedContact)
      })
      
        // if (!contacts.find(ppl => ppl.name === person.name)) {
        //     const newId = contacts.length > 0
        //     ? Math.round(Math.random()*99999)
        //     : 0
        //     person.id =  newId
        //     contacts = contacts.concat(person)
        //     response.json(contacts)

        // } else {
        //     return response.status(400).json({
        //         error: 'name must be unique'
        //     })
        // }   
       
    } else {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    
  })

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact ={
    name: body.name,
    phonenumber: body.phonenumber
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})