import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  );
}

const Content = props => {
  return (
    <>
      <p>
        {props.part1Name} {props.exercises1Count}
      </p>
      <p>
        {props.part2Name} {props.exercises2Count}
      </p>
      <p>
        {props.part3Name} {props.exercises3Count}
      </p>
    </>
  );
}

const Total = props => {
  return (
    <>
      <p>Number of exercises {props.exercises1Count + props.exercises2Count + props.exercises3Count}</p>
    </>
  );
}

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