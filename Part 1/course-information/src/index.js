import React from 'react';
import ReactDOM from 'react-dom';

// Header component
const Header = props => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  );
}

// Part component
const Part = props => {
  return (
    <>
      <p>
        {props.partName} {props.exerciseCount}
      </p>
    </>
  );
}

// Content component
// forEach won't work because it doesn't return anything, so .map function is the only choice
// each element should be provided with a key in React (key=...)
const Content = props => {
  return (
    <>
      {props.parts.map((part, i) => <Part partName={part.name} exerciseCount={part.exercises} key={i} />)}
    </>
  );
}

// Total component
const Total = props => {
  return (
    <>
      <p>Number of exercises {props.parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
    </>
  );
}

// Main component
const App = () => {
  const course = {
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
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);