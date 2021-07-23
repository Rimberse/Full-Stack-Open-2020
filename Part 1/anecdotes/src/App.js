import React, { useState } from 'react';
import './App.css';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ];

  const votes = {};
  // Fill object with zero values
  anecdotes.forEach((el, index) => votes[index] = 0);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(votes);

  // ex. 1.13
  const vote = () => {
    const copy = { ...points };
    copy[selected] += 1;
    setPoints(copy);
  };

  // ex. 1.14
  const findMostUpvoted = () => {
    let max = 0;

    Object.values(points).forEach(el => {
      if (el > max) {
        max = el;
      }
    });

    // Find the index of the property with the max value
    return Object.keys(points).find(key => points[key] === max);
  };

  const Anecdote = ({ anecdotes, points, number }) => {
    return (
      <>
        <p>{anecdotes[number]}</p>
        <p>Has {points[number]} votes</p>
      </>
    );
  };

  const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

  // ex. 1.12
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} points={points} number={selected} />
      <Button handleClick={vote} text="Vote" />
      <Button handleClick={() => setSelected(Math.round(Math.random() * (anecdotes.length - 1)))} text="Next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} points={points} number={findMostUpvoted()} />
    </div>
  );
}

export default App;