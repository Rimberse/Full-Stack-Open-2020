// Exercise 3.12
const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://Rimberse:${password}@rimberse.dsnmu.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: name,
    number: number
});

const saveEntry = person => {
    person.save().then(result => {
        console.log('Added ' + name + ', number ' + number + ' to phonebook!');
        mongoose.connection.close();
    });
}

const queryEntries = () => {
    Person.find({}).then(result => {
        result.forEach(note => console.log(note));
        mongoose.connection.close();
    });
}

if (process.argv.length === 3) {
    queryEntries();
} else {
    saveEntry(person);
}
