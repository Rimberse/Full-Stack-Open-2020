import React, { useState } from 'react';
import './App.css';

// ex. 1.10
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;
const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>;

// ex. 1.8
const Statistics = ({ good, neutral, bad }) => {
  // Calculate total, average score and the percentage of positive scores
  const total = good + neutral + bad;
  const avgScore = total === 0 ? 0 : ((good * 1) + (neutral * 0) + (bad * -1)) / total;
  const positivePercentage = total === 0 ? 0 : good / total * 100;

  // ex. 1.9
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  } else {
    return(
      <>
        {/* ex. 1.11 */}
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            {/* ex. 1.7 */}
            <Statistic text="all" value={total} />
            <Statistic text="average" value={avgScore.toFixed(3)} />
            <Statistic text="positive" value={positivePercentage.toFixed(3).concat(" %")} />
          </tbody>
        </table>
      </>
    )
  }
};

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // If the item wasn't stored to the localStorage yet, then use the default value (0), otherwise the value obtained from the localStorage
  const goodValue = localStorage.getItem("good") === null ? good : Number(localStorage.getItem("good"));
  const neutralValue = localStorage.getItem("neutral") === null ? neutral : Number(localStorage.getItem("neutral"));
  const badValue = localStorage.getItem("bad") === null ? bad : Number(localStorage.getItem("bad"));

  // Save the values to the localStorage, to get them once the page reloads
  const saveValue = (name, setFunction) => {
    const oldValue = Number(localStorage.getItem(name));
    const updatedValue = oldValue + 1;
    setFunction(updatedValue);
    localStorage.setItem(name, updatedValue);
  };

  // ex. 1.6
  return (
    <div>
      <p><b>Give feedback</b></p>
      <Button handleClick={() => saveValue("good", setGood)} text="good" />
      <Button handleClick={() => saveValue("neutral", setNeutral)} text="neutral" />
      <Button handleClick={() => saveValue("bad", setBad)} text="bad" />
      <p><b>Statistics</b></p>
      <Statistics good={goodValue} neutral={neutralValue} bad={badValue} />
    </div>
  )
};

export default App;