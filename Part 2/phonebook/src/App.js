import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from './components/Notification';
import './App.css';

// ex. 2.6
function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);

  // ex. 2.10
  useEffect(() => {
    personService.read()
      .then(response => {
        setPersons(response);
      });
  }, []);

  const addPerson = event => {
    event.preventDefault();

    if (newName.length === 0 || newNumber.length === 0) {
      return;
    }

    // ex. 2.7
    // Convert names of persons to lowercase, then verify if the persons array contains a person with the inputted name (also lowercased)
    // Alert if the name already associated to one person and don't add it to the phonebook
    if (persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase().trim()) !== -1) {
      console.log(persons);
      // ex. 2.18
      if (persons.map(person => person.number).indexOf(newNumber.trim()) === -1) {

        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const existingPerson = persons.find(existingPerson => existingPerson.name === newName);
          const newPerson = { ...existingPerson, number: newNumber };
          personService.update(existingPerson.id, newPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson));
              setNewName('');
              setNewNumber('');
              setMessage(`${updatedPerson.name}'s number is changed to: ${updatedPerson.number}`);
              setTimeout(() => setMessage(null), 2500);
            })
            .catch(error => {
              // ex. 2.20
              setMessage(`Information of ${existingPerson.name} has already been removed from server`);
              setTimeout(() => setMessage(null), 2500);
              setPersons(persons.filter(person => person.id !== existingPerson.id));
            });
        }
        return;

      } else {
        setMessage(`${newName} is already added to phonebook`);
        setTimeout(() => setMessage(null), 2500);
        return;
      }
    }

    // Create new Person object
    const newPerson = {
      name: newName,
      number: newNumber
    };

    // Concatenate the existing array with then new entry, without modifying an old orray (cf: React state should be modified)
    personService.create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        setMessage(`Added ${newPerson.name}`);
        setTimeout(() => setMessage(null), 2500);
      })
      .catch(error => {
        setMessage(`${newPerson.name} ${newPerson.number} can't be added`);
        setTimeout(() => setMessage(null), 2500);
      });
  };

  const deletePerson = name => {
    if (window.confirm(`Delete ${name} ?`)) {
      const id = persons.find(person => person.name === name).id;
      
      personService.deleteEntry(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage(`${name} has been deleted`);
          setTimeout(() => setMessage(null), 2500);
        })
        .catch(error => {
          setMessage(`Information of ${name} has already been removed from server`);
          setTimeout(() => setMessage(null), 2500);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
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
      <Notification message={message} />
      <Filter value={search} handleChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={addPerson} nameValue={newName} numberValue={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={search.length === 0 ? persons : persons.filter(person => checkMatch(person))} handleClick={deletePerson} />
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

const Persons = ({ persons, handleClick }) => (<>{persons.map(person => <Person key={person.name} name={person.name} number={person.number} handleClick={handleClick} />)}</>);

const Person = props => <div>{props.name} {props.number} <button onClick={() => props.handleClick(props.name)}>Delete</button></div>;

export default App;
