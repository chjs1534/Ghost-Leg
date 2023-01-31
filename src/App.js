import { useState } from "react";
import './styles.css';

const Setter = () => {
  const [count, setCount] = useState(2)

  const increment = () => {
    setCount(count + 1);
    // setTopRow(oldTopRow => [...oldTopRow, <input type="text"></input>])
  }

  const decrement = () => {
    setCount(count - 1);
    // setTopRow(oldTopRow => oldTopRow.slice(0, -1))
  }

  return (
    <div className="counter">
      <button onClick={decrement} className="button">-</button>
      <h1>{count}</h1>
      <button onClick={increment} className="button">+</button>
    </div>
  )
}

const Box = () => {
  const [rungs, setRungs] = 
    useState([
      <div className="rung"></div>,
      <div className="rung"></div>
    ])
  const [columns, setColumns] = 
    useState([
      <div className="column">
        <input type="text"></input>
        <div className="vertLineRight">
          {rungs}
        </div>
        <input type="text"></input>
      </div>,
      <div className="column">
        <input type="text"></input>
        <div className="vertLineLeft">
          {rungs}
        </div>
        <input type="text"></input>
      </div>
    ])


  return (
    <div className="box">
      {columns}
    </div>
  )
}

const Result = () => {
  return (
    <div className="result">
      <ul className="resultList">
        <li>Hello World</li>
        <li>Hello World2</li>
      </ul>
    </div>
  )
}

const App = () => {
    return (
      <div className="page">
    <Setter />
    <Box />
    <Result />
      </div>
    )
}

export default App;