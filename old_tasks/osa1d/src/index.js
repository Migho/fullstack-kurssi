import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/*
//Oops I accidentally did "statistics" too, well I guess this is even better
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if (total === 0) {
    return (
      <p>Ei statustiikkoja :(</p>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="Hyvä" value={props.good}/>
        <Statistic text="Neutraali" value={props.neutral}/>
        <Statistic text="Bad" value={props.bad}/>
        <Statistic text="Yhteensä" value={total}/>
        <Statistic text="Keskiarvo" value={(props.good * 1 + props.neutral * 0 + props.bad * -1) / total}/>
        <Statistic text="Positiivisa" value={props.good / total}/>
      </tbody>
    </table>
  )
}

const Statistic = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => props.set(props.value + 1)}>{props.name}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>ANNA PALAUTETTA</h1>
      <div>
        <Button set={setGood} value={good} name="good"/>
        <Button set={setNeutral} value={neutral} name="neutral"/>
        <Button set={setBad} value={bad} name="bad"/>
      </div>
      <h1>Statistiikat</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
*/

const BestAnectode = (props) => {
  let maxAt = 0;

  for (let i = 0; i < props.list.length; i++) {
    maxAt = props.list[i] > props.list[maxAt] ? i : maxAt;
  }

  return (
    <>
    <h1>Anecdote with most votes</h1>
    <p>{props.anecdotes[maxAt]}</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const copy = [...vote]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {vote[selected]} votes</p>
      <button onClick={() => {
        copy[selected] += 1
        setVote(copy)
      }}>
        Vote
      </button>
      <button onClick={() => setSelected(Math.floor((Math.random() * 6)))}>next anecdote</button>
      <BestAnectode list={copy} anecdotes={props.anecdotes}></BestAnectode>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)