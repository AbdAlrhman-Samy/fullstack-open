const express = require("express")
const { json } = require("express/lib/response")
const morgan = require('morgan')

const app = express()

app.use(express.json())

//create new token called 'contact' and give it a function for the middleware to use
morgan.token('contact', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['contact'](req, res)
    ].join(' ')
  })
)


let persons = [
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


app.get('/info', (req, res)=>{
    res.send(`
    <h1>Phonebook has info for ${persons.length} people</h1>
    <h2>${new Date()}</h2>
    `)
    res.json(persons)
})

app.get('/api/persons', (req, res)=>{
    res.json(persons)
})

app.get('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id)

    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    } else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id)

    persons = persons.filter(person => person.id !== id)

    res.json(persons)
})

app.post('/api/persons/', (req, res)=>{

    const body = req.body

    //check if contact info is missing
    if(body.number && body.name){
        //get contact info from body
        const {name, number} = body

        //check if contact already exists
        const person = persons.find(person => person.name === name)

        if(person){
            return res.status(409).json({error: "Contact already exists"}) //409 = conflict

        } else {

            persons = [...persons, {id: persons.length+1, name, number}]
            return res.json(persons)
        }
        
    } else return res.status(400).json({error: "Contact data missing"})
})


const PORT = 3001
app.listen(PORT)