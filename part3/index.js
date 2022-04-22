const express = require('express')
const app = express()

app.use(express.json())

let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(contacts)
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
    
    console.log(request.body)
    console.log(request.headers)
    const newId = contacts.length > 0
    ? Math.round(Math.random()*99999)
    : 0

    const person = request.body
    person.id =  newId

    contacts = contacts.concat(person)
    response.json(contacts)
  })


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})