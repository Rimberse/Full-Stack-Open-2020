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
        {props.partName} {props.exercisesCount}
      </p>
    </>
  );
}

// Content component
const Content = props => {
  return (
    <>
      <Part partName={props.part1Name} exercisesCount={props.exercises1Count} />
      <Part partName={props.part2Name} exercisesCount={props.exercises2Count} />
      <Part partName={props.part3Name} exercisesCount={props.exercises3Count} />
    </>
  );
}

// Total component
const Total = props => {
  return (
    <>
      <p>Number of exercises {props.exercises1Count + props.exercises2Count + props.exercises3Count}</p>
    </>
  );
}

// Main component
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  return (
    <div>
      <Header courseName={course} />
      <Content part1Name={part1.name} part2Name={part2.name} part3Name={part3.name} exercises1Count={part1.exercises} exercises2Count={part2.exercises} exercises3Count={part3.exercises} />
      <Total exercises1Count={part1.exercises} exercises2Count={part2.exercises} exercises3Count={part3.exercises} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);