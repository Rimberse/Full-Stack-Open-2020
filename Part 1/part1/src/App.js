import React, { useState } from 'react';

// Passing data with props helps us with making component dynamic
// The props that are passed to the component are directly destructured into the variables name and age
/*const Hello = ({ name, age }) => {
  // Single line arrow functions implicitly return it's body
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
};*/

// Just yet another experimentation with React
/*const App = props => {
  const now = new Date();
  const a = 10;
  const b = 20;

  return(
    <div>
      <p>Hello {props.name}, it's {now.toLocaleTimeString()}!</p>
      <p>
        {a} + {b} is {a + b}
      </p>
    </div>
  );
};*/

// Different ways of passing the data with props. Curly braces {} are used to evaluate JS expression
/*const App = () => {
  const name = Math.round(Math.random()) === 1 ? "Rick" : "Steven";
  const age = Math.round(Math.random() * 75);

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Sarah" age={3 + 17} />
      <Hello name="John" age={27} />
      <Hello name={name} age={age} />
    </>
  )
};*/

/*const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
  // React's 'State' hook. Here we use array destructuring to get the first and second array elements returns by the function call
  // counter is a state variable, setCountr is a function to update this variable. 0 passes to function initializes coutner with this value
  const [ counter, setCounter ] = useState(0);

  // Since each time setCounter function is called, React re-renders the component and calls the function again
  // setTimeout(() => setCounter(counter + 1), 1000);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  // debugging
  // console.log("rendering...", counter);

  return (
    <>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="Increment" />
      <Button handleClick={decreaseByOne} text="Decrement" />
      <Button handleClick={setToZero} text="Reset" />
    </>
  )
};*/

const History = props => {
  if (props.allClicks.length === 0) {
    return (
      <div>The app is used by pressing the buttons</div>
    )
  }

  return (
    <div>Button press history: {props.allClicks.join(" ")}</div>
  )
};

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>    
  )
};

export default App;