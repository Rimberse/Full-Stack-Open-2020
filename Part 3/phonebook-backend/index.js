const express = require('express');
const nodemon = require('nodemon');
const app = express();
app.use(express.json());

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
];

app.get('/', (request, response) => {
    response.send('<h1>Phonebook backend</h1>');
});

// ex. 3.1
app.get('/api/persons', (request, response) => {
    response.json(persons);
});

// ex. 3.2
app.get('/info', (request, response) => {
    response.send(`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>
    `);
});

// ex. 3.3
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

// ex. 3.4
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    
    if (person) {
        persons = persons.filter(person => person.id !== id);
        response.status(204).end();
    } else {
        response.status(410).end();
    }
});

// ex. 3.5
app.post('/api/persons', (request, response) => {
    const body = request.body;

    // ex. 3.6
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        });
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    let randN = Math.round(Math.random() * (1000000 - 1) + 1);

    while (persons.find(person => person.id === randN)) {
        randN = Math.round(Math.random() * (1000000 - 1) + 1);
    }

    const person = {
        id: randN,
        name: body.name,
        number: body.number
    };

    persons = persons.concat(person);
    response.status(200).json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
