import ReactDOM from 'react-dom';
import App from './App';


// JavaScript practice
// Variables
const x = 1;
let y = 5;

console.log(x, y);
y += 10;
console.log(x, y);
y = 'someText';
console.log(x, y);
// x = 4;     // gives error

// Arrays
const array = [1, -1, 3];
array.push(5);

console.log(array.length);
console.log(array[1]);

array.forEach(value => console.log(value));

const t = [1, -1, 3];
const t2 = t.concat(4);

console.log(t);
console.log(t2);

const arrayMap = [1, 2, 3, 4, 5];
const m1 = arrayMap.map(value => value * 2);
console.log(m1);

const m2 = arrayMap.map(value => '<li>' + value + '</li>');
console.log(m2);

const arrayDest = [1, 2, 3, 4, 5];

const [first, second, ...rest] = arrayDest;
console.log(first, second);
console.log(rest);

// Objects
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD'
};

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5
};

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University'
};

console.log(object1.name);
console.log(object2.size);
console.log(object3["name"]);
const fieldName = 'age';
console.log(object1[fieldName]);

object1.address = 'Helsinki';
object1['secret number'] = 12345;

// Functions
const sum = (a, b) => {
  console.log(a);
  console.log(b);
  return a + b;
};

console.log(sum(43, 87));

const square = p => p * p;
console.log(square(4));

const t3 = [1, 2, 3, 4, 5];
const t3Squared = t3.map(p => p * p);
console.log(t3Squared);

function product(a, b) {
  return a * b;
};

console.log(product(2, 6));

const average = function(a, b) {
  return (a + b) / 2;
};

console.log(average(2, 5));

// Object methods and "this"
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log("Hello, my name is " + this.name);
  },
  doAddition: function(a, b) {
    console.log(a + b);
  }
};

arto.greet();

arto.growOlder = function() {
  this.age += 1;
};

console.log(arto.age);
arto.growOlder();
console.log(arto.age);

arto.doAddition(1, 4);

const referenceToAddition = arto.doAddition;
referenceToAddition(10, 15);

const referenceToGreet = arto.greet;
referenceToGreet.bind(arto)();
// referenceToGreet();      <- this gives error, since the global object doesn't contain a property called 'name'
setTimeout(arto.greet.bind(arto), 1000);

// Classes
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log("Hello, my name is " + this.name);
  }
};

const adam = new Person("Adam Ondra", 35);
adam.greet();

const janja = new Person("Janja Garnbret", 22);
janja.greet();


// Part 1 practice [Introduction to React]
/*const names = ["Aaron", "Steve", "Dave", "Carole", "Monika"];
const randN = Math.round(Math.random(names.length) * (names.length - 1));

ReactDOM.render(
  <App name={names[randN]} />,
  document.getElementById('root')
);*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/*let counter = 1;

const refresh = () => {
  ReactDOM.render(<App counter={counter} />,
  document.getElementById('root'));
};

refresh();

setInterval(() => {
  refresh();
  counter += 1;
}, 1000);*/