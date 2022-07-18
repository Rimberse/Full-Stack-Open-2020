const express = require('express');
// const nodemon = require('nodemon');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
// ex. 3.11
app.use(express.static('build'));
require('dotenv').config({ path: "../.env" });

const Person = require("./models/Person");

// ex. 3.8
morgan.token('newPerson', (request, response) => JSON.stringify(request.body));
// ex. 3.7
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :newPerson'));

// Brute force way
/*const personLogger = (request, response, next) => {
    console.log(request.body);
    next();
}

app.use(personLogger);*/

// ex. 3.16
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError')
        return response.status(400).send({ error: 'malformatted id' });

    next(error);
}

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
    // response.json(persons);
    // ex. 3.13
    Person.find({}).then(people => response.json(people));
});

// ex. 3.2
app.get('/info', (request, response, next) => {
    // ex. 3.18
    Person.collection.countDocuments()
        .then(count => {
            response.send(`
                <div>
                    <p>Phonebook has info for ${count} people</p>
                    <p>${new Date()}</p>
                </div>
            `);
        })
        .catch(error => next(error))
});

// ex. 3.3
app.get('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    // const person = persons.find(person => person.id === id);
    
    // ex. 3.18
    Person.findById(request.params.id)
        .then(person => {
            if (person)
                response.json(person);
            else
                response.status(404).end();
        })
        .catch(error => next(error));

    // if (person) {
    //     response.json(person);
    // } else {
    //     response.status(404).end();
    // }
});

// ex. 3.4
app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    // const person = persons.find(person => person.id === id);

    // ex. 3.15
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
    
    // if (person) {
    //     persons = persons.filter(person => person.id !== id);
    //     response.status(204).end();
    // } else {
    //     response.status(410).end();
    // }
});

// ex. 3.5
app.post('/api/persons', (request, response) => {
    const body = request.body;

    // ex. 3.6
    if (body.name == undefined || body.number == undefined) {
        return response.status(400).json({
            error: 'name or number is missing'
        });
    }

    // if (persons.find(person => person.name === body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     });
    // }

    // let randN = Math.round(Math.random() * (1000000 - 1) + 1);

    // while (persons.find(person => person.id === randN)) {
    //     randN = Math.round(Math.random() * (1000000 - 1) + 1);
    // }

    const person = new Person({
        // id: randN,
        name: body.name,
        number: body.number
    });

    // persons = persons.concat(person);
    // response.status(200).json(person);

    // ex. 3.14
    person.save().then(savedPerson => response.json(savedPerson));
});

// ex. 3.17
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});

app.use(errorHandler);

// ex. 3.10
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
