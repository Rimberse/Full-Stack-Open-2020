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
// Parts could eventually be stores in an array, but i didn't really bother with the code optimization
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course} />
      <Content part1Name={part1} part2Name={part2} part3Name={part3} exercises1Count={exercises1} exercises2Count={exercises2} exercises3Count={exercises3} />
      <Total exercises1Count={exercises1} exercises2Count={exercises2} exercises3Count={exercises3} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);