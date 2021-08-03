import React, { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const MostVoted = ({anecdote, votes}) => {
  if (votes === 0){
    return(
      <h1>Vote for any Anecdote to determine the highest voted</h1>
    )
  }
  return(
    <div>
      <q>{anecdote}</q>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0)); //example: Array(5) creates an ampty array with as its size, fill(3) means fill all elements with 3

  const nextAnecdote = () => {
    let maxIndex = anecdotes.length;
    let rndmIndex = Math.floor(Math.random() * maxIndex);
    setSelected(rndmIndex);
  };

  const addVote = () => {
    const newVotes = [...vote];
    newVotes[selected] = vote[selected] + 1;
    setVote(newVotes);
  };

  const mostVotes = Math.max(...vote);
  const mostVotedAnecdotes = vote.indexOf(mostVotes);

  return (
    <div>

      <h1>Anecdote of the day</h1>
      <q>{anecdotes[selected]}</q>
      <p>has {vote[selected]} votes</p>
      <Button text="Vote" handleClick={addVote} />
      <Button text="Next Anecdote" handleClick={nextAnecdote} />

      <hr/>

      <MostVoted anecdote={anecdotes[mostVotedAnecdotes]} votes={mostVotes}/>

    </div>
  );
};

export default App;
