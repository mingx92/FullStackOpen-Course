const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Contact = require('./models/contact')

app.use(express.json())

var morgan = require('morgan')
morgan.token('post_body', function (req, ) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_body'))

app.use(cors())

app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    console.log('Getting People Info')
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.get('/api/info', (request, response) => {
    Contact.find({}).then(contacts => {
        let ppl_count = contacts.length
        let current_time = new Date()
        response.send(`Phonebook has info for ${ppl_count} people ${current_time}`)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        if (contact) {
            response.json(contact)
        } else {
            //handle case where no matching object is found in database and return value of contact is null
            response.status(404).end()
        }
    })
        //handle scenario where promise returned by findById is rejected, for instance when format of id is incorrect
        .catch( error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id).then( () => {
        response.status(204).end()
    })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const person = request.body
    if (person.name && person.phonenumber) {
        const contact = new Contact({
            name: person.name,
            phonenumber: person.phonenumber
        })

        contact.save().then(savedContact => {
            response.json(savedContact)
        })
            .catch(error => next(error))
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
    const contact = {
        name: body.name,
        phonenumber: body.phonenumber
    }

    Contact.findByIdAndUpdate(request.params.id, contact, { new: true, runValidators:true, context:'query' })
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
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})