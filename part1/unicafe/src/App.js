import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({good, bad, neutral}) => {
  let sum = good + bad + neutral;
  if (sum === 0) {
    return (
      <div>No feedback given </div>
    )
  }

  return(
    <div>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={sum} />
      <StatisticLine text="average" value ={sum/3} />
      <StatisticLine text="positive" value ={`${good / sum * 100} %`} />
    </div>
  )
}

const MyButton = ({label, clickHandler}) => {

  return (
    <button onClick={clickHandler}>{label}</button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let sum= good+neutral+bad;

  const clickHandler = (e) => {
    console.log(e.target.innerText);
    switch (e.target.innerText) {
      case 'good':
        setGood(good+1);
        break;
      case 'neutral':
        setNeutral(neutral+1);
        break;
      case 'bad':
        setBad(bad+1);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <MyButton label='good' clickHandler={clickHandler} />
      <MyButton label='neutral'clickHandler={clickHandler} />
      <MyButton label='bad' clickHandler={clickHandler} />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App