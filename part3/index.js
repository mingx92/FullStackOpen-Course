require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Contact = require('/models/contact')

app.use(express.static('build'))
app.use(express.json())
morgan.token('post_body', function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_body'))
app.use(cors())


const Contact = mongoose.model('Contact', PhonebookSchema)

app.get('/api/persons', (request, response) => {
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
    const id = Number(request.params.id);
    const person = contacts.find(person => person.id === id)
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    } 
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    
    const person = request.body
    if (person.name && person.number) {
        if (!contacts.find(ppl => ppl.name === person.name)) {
            const newId = contacts.length > 0
            ? Math.round(Math.random()*99999)
            : 0
            person.id =  newId
            contacts = contacts.concat(person)
            response.json(contacts)

        } else {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }   
       
    } else {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})