import { useState } from "react";
import './styles.css';

const Setter = (props) => {
	const [count, setCount] = useState(0)
	const [inputsTop, setInputsTop] = useState([])
	const [inputsBot, setInputsBot] = useState([])

	const handle = (e, index, row) => {
		if (row === "top") {
			const temp = inputsTop
			temp[index] = e.target.value
			setInputsTop(temp)
		} else {
			const temp = inputsBot
			temp[index] = e.target.value
			setInputsBot(temp)
		}
	}

	const col = 
		<div className="column" key={count}>
			<input className="input" type="text" onInput={e => handle(e, count, "top")}></input>
			<div className="vertLineRight"></div>
			<input className="input" type="text" onInput={e => handle(e, count, "bot")}></input>
		</div>

	const increment = () => {
		if (count < 7) {
			setCount(count + 1)
			props.setColumns(oldCols => [...oldCols, col])
		}
	}

	const decrement = () => {
		if (count > 2) {
			setCount(count - 1)
			props.setColumns(oldCols => oldCols.slice(0, -1))
		}
	}

	const generate = () => {
		const gcd = (a, b) => {
			while (a !== b) 
				if (a > b) a = a - b
				else b = b - a
			return a
		}

		// add rungs
		const nums = new Set([])
		let prev = 0
		while (nums.size < count - 1) {
			let curr = Math.floor(Math.random()*8)+1
			// gcd has to be different
			while (gcd(curr+1, prev+1) !== 1) {
				curr = Math.floor(Math.random()*8)+1
			}
			if (nums.size < nums.add(curr).size) prev = curr
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
							<p className="text">{inputsTop[i]}</p>
							<div className="vertLineRight">
								{list[i]}
							</div>
							<p className="text">{inputsBot[i]}</p>
						</div>
					)
				}
			)
		)
		
		// get result
		let a = []
		let result = []
		// get swaps in order
		let index = 0
		for (const num of nums.values()) {
			result.push(index)
			for (let i = 1; i < num+1; i++) {
				a.push([i/(num+1), index])
			}
			index++
		}
		result.push(index)
		a.sort()
		
		// perform swaps
		for (let i = 0; i < a.length; i++) {
			const temp = result[a[i][1]]
			result[a[i][1]] = result[a[i][1]+1]
			result[a[i][1]+1] = temp
		}

		let temp = []
		for (let i = 0; i < result.length; i++) {
			temp.push(inputsTop[result[i]] + " = " + inputsBot[i])
		}
		props.setInputsMatch(temp)
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

const Result = (props) => {
	return (
		<div className="result">
		<ul className="resultList">
			{props.inputsMatch.map(i => <li key={i}>{i}</li>)}
		</ul>
		</div>
	)
}

const App = () => {
	const [columns, setColumns] = useState([])
	const [inputsMatch, setInputsMatch] = useState([])

    return (
		<div className="page">
			<Setter columns={columns} setColumns={setColumns} inputsMatch={inputsMatch}
				setInputsMatch={setInputsMatch} />
			<Box columns={columns} />
			<Result inputsMatch={inputsMatch} />
		</div>
    )
}

export default App;