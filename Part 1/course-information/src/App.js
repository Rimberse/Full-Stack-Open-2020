import React from 'react';

// The main component
const App = () => {
  // Original code of the exercise
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  // Improved version used in the exercise solution (ex. 1.1)
  const course = {
    // ex. 1.3, 1.4 & 1.5
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
  );
};

// Header component
const Header = props => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};
  
// Content component
// forEach won't work because it doesn't return anything, so .map function is the only choice, since it returns an array
// each component should be provided with a key in React (key=...)
const Content = props => {
  return (
    <>
      {props.parts.map((part, i) => <Part name={part.name} count={part.exercises} key={i} />)}
    </>
  );
};

// Part component (ex. 1.2)
const Part = props => {
  return (
    <>
      <p>
        {props.name} {props.count}
      </p>
    </>
  );
};

// Total component
const Total = props => {
  return (
    <>
      <p>Number of exercises {props.parts.reduce((acc, current) => acc + current.exercises, 0)}</p>
    </>
  );
};

export default App;