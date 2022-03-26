import { useState } from 'react'

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
      <button onClick={clickHandler}>good</button>
      <button onClick={clickHandler}>neutral</button>
      <button onClick={clickHandler}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum}</p>
      <p>average {sum/3}</p>
      <p>positive {good/sum * 100} %</p>
    </div>
  )
}

export default App