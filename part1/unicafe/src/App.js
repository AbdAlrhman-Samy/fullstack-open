import "./App.css";
import React, { useState } from "react";

const Display = () => {
  return <h1>Give Feedback</h1>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h1>Statistics</h1>
      <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
      </ul>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const voteGood = () => setGood(good+1);
  const voteNeutral = () => setNeutral(neutral+1)
  const voteBad = () => setBad(bad+1)


  return (
    <div>
      <Display />

      <Button text="Good" handleClick={voteGood}/>
      <Button text="Neutral" handleClick={voteNeutral}/>
      <Button text="Bad" handleClick={voteBad}/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;
