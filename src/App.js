import { useState } from "react";
import './styles.css';

const Setter = (props) => {
	const [count, setCount] = useState(2)

	const increment = () => {
		if (count < 7) {
			setCount(count + 1)
			props.setColumns(oldCols => [...oldCols, props.colEven])
		}
	}

	const decrement = () => {
		if (count > 2) {
			setCount(count - 1)
			props.setColumns(oldCols => oldCols.slice(0, -1))
		}
	}

	const generate = () => {
		const nums = new Set([])
		while (nums.size < count - 1) {
			nums.add(Math.floor(Math.random() * 7)+1)
		}

		const list = []
		for (const num of nums.values()) {
			const temp = []
			for (let i = 0; i < num; i++) {
				temp.push(<div className="rung" key={i}></div>)
			}
			list.push(temp)
		}
		list.push([])
		
		props.setColumns(
			oldCols => oldCols.map(
				(_, i) => {
					return (
						<div className="column" key={i}>
							<input className="input" type="text"></input>
							<div className="vertLineRight">
								{list[i]}
							</div>
							<input className="input" type="text"></input>
						</div>
					)
				}
			)
		)
	}

	return (
		<div>
			<button onClick={generate}>Start</button>
			<div className="counter">
				<button onClick={decrement} className="button">-</button>
				<h1>{count}</h1>
				<button onClick={increment} className="button">+</button>
			</div>
		</div>
	)
}

const Box = (props) => {

	return (
		<div className="box">
			{props.columns}
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
  	const colEven = 
		<div className="column">
			<input className="input" type="text"></input>
			<div className="vertLineRight">
			</div>
			<input className="input" type="text"></input>
		</div>
	const [columns, setColumns] = useState([colEven, colEven])

    return (
		<div className="page">
			<Setter columns={columns} setColumns={setColumns} colEven={colEven} />
			<Box columns={columns} />
			<Result />
		</div>
    )
}

export default App;