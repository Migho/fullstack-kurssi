const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))
morgan.token('data', function (req, res) { return JSON.stringify(req.body || {}) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


let persons = [
  {
    id: 1,
    name: "haloo1",
    number: "123123"
  },
  {
    id: 2,
    name: "haloo2",
    number: "123123"
  },
  {
    id: 3,
    name: "haloo3",
    number: "123123"
  },
]

app.get('/info', (req, res) => {
  console.log(req.timestamp)
  res.send(`<h1>Puhelinluettelossa ${persons.length} henkilön tiedot</h1><h1>${new Date()}</h1>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ 
      error: 'Name or number is missing' 
    })
  } else if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({ 
      error: 'Name is not unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.floor(10000000))
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})