import React, { useState } from 'react';
import './App.css';

// ex. 2.6
function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const addPerson = event => {
    event.preventDefault();
    // ex. 2.7
    // Convert names of persons to lowercase, then verify if the persons array contains a person with the inputted name (also lowercased)
    // Alert if the name already associated to one person and don't add it to the phonebook
    if (persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase().trim()) !== -1) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (persons.map(person => person.number).indexOf(newNumber.trim()) !== -1) {
      alert(`${newNumber} is already added to the phonebook`);
      return;
    }

    // Create new Person object
    const newPerson = {
      name: newName,
      number: newNumber
    };

    // Concatenate the existing array with then new entry, without modifying an old orray (cf: React state should be modified)
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  // Helper method used inside of a filter method, which indicates if there is a match between names and a search value
  const checkMatch = person => {
    // For every letter in search's input field check a match
    for (let i = 0; i < search.length; i++) {
      // As soon as no match is encountered, return false, no point in continuing futher
      if (person.name.toLowerCase().charAt(i) !== search.trim().toLowerCase().charAt(i)) {
        return false;
      }
    }

    // Otherwise return true, since it's a full match
    return true;
  };

  const handleNameChange = event => setNewName(event.target.value);
  // ex. 2.8
  const handleNumberChange = event => setNewNumber(event.target.value);
  // ex. 2.9
  const handleSearchChange = event => setSearch(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} handleChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={addPerson} nameValue={newName} numberValue={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={search.length === 0 ? persons : persons.filter(person => checkMatch(person))} />
      {/* {search.length === 0 ? persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
      : persons.filter(person => checkMatch(person)).map(person => <div key={person.name}>{person.name} {person.number}</div>)} */}
    </div>
  );
};

// ex. 2.10
const Filter = ({ value, handleChange }) => <>Filter shown with <input value={value} onChange={handleChange} /></>;

const PersonForm = ({ handleSubmit, nameValue, numberValue, handleNameChange, handleNumberChange }) => (
  <form onSubmit={handleSubmit} >
    <div>Name : <input value={nameValue} onChange={handleNameChange} /></div>
    <div>Number : <input value={numberValue} onChange={handleNumberChange} /></div>
    <div><button type="submit">Add</button></div>
  </form>
);

const Persons = ({ persons }) => (<>{persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}</>);

const Person = props => <div>{props.name} {props.number}</div>

export default App;
