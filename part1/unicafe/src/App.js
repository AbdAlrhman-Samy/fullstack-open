import React, { useState } from "react";

const Display = () => {
  return <h1>Give Feedback</h1>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let allVotes = good + neutral + bad;
  let voteAverage = (good - bad) / allVotes;
  let positivePercentage = (good / allVotes) * 100;

  if (allVotes > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={allVotes} />
            <StatisticsLine text="Average" value={voteAverage} />
            <StatisticsLine text="Positive%" value={positivePercentage} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h2>No Feedback Given</h2>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const voteGood = () => setGood(good + 1);
  const voteNeutral = () => setNeutral(neutral + 1);
  const voteBad = () => setBad(bad + 1);

  return (
    <div>
      <Display />

      <Button text="Good" handleClick={voteGood} />
      <Button text="Neutral" handleClick={voteNeutral} />
      <Button text="Bad" handleClick={voteBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;