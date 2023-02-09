import { useState } from "react";
import './styles.css';

const Setter = (props) => {

	// const handle = (e, index, row) => {
	// 	if (row === "top") {
	// 		const temp = inputsTop
	// 		temp[index] = e.target.value
	// 		setInputsTop(temp)
	// 	} else {
	// 		const temp = inputsBot
	// 		temp[index] = e.target.value
	// 		setInputsBot(temp)
	// 	}
	// }

	const increment = () => {
		if (props.count < 10) {
			props.setCount(props.count + 1)
			props.setInputsMatch([...props.inputsMatch, <input className="input"></input>])
		}
	}

	const decrement = () => {
		if (props.count > 2) {
			props.setCount(props.count - 1)
			props.setInputsMatch(props.inputsMatch.slice(0, -1))
		}
	}

	// const generate = () => {
	// 	const gcd = (a, b) => {
	// 		while (a !== b) 
	// 			if (a > b) a = a - b
	// 			else b = b - a
	// 		return a
	// 	}

	// 	// add rungs
	// 	const nums = new Set([])
	// 	let prev = 0
	// 	while (nums.size < count - 1) {
	// 		let curr = Math.floor(Math.random()*8)+1
	// 		// gcd has to be different
	// 		while (gcd(curr+1, prev+1) !== 1) {
	// 			curr = Math.floor(Math.random()*8)+1
	// 		}
	// 		if (nums.size < nums.add(curr).size) prev = curr
	// 	}

	// 	const list = []
	// 	for (const num of nums.values()) {
	// 		const temp = []
	// 		for (let i = 0; i < num; i++) {
	// 			temp.push(<div className="rung" key={i}></div>)
	// 		}
	// 		list.push(temp)
	// 	}
	// 	list.push([])
		
	// 	props.setColumns(
	// 		oldCols => oldCols.map(
	// 			(_, i) => {
	// 				return (
	// 					<div className="column" key={i}>
	// 						<p className="text" onClick={showPath}>{inputsTop[i]}</p>
	// 						<div className="vertLineRight">
	// 							{list[i]}
	// 						</div>
	// 						<p className="text">{inputsBot[i]}</p>
	// 					</div>
	// 				)
	// 			}
	// 		)
	// 	)
		
	// 	// get result
	// 	let a = []
	// 	let result = []
	// 	// get swaps in order
	// 	let index = 0
	// 	for (const num of nums.values()) {
	// 		result.push(index)
	// 		for (let i = 1; i < num+1; i++) {
	// 			a.push([i/(num+1), index])
	// 		}
	// 		index++
	// 	}
	// 	result.push(index)
	// 	a.sort()
		
	// 	// perform swaps
	// 	for (let i = 0; i < a.length; i++) {
	// 		const temp = result[a[i][1]]
	// 		result[a[i][1]] = result[a[i][1]+1]
	// 		result[a[i][1]+1] = temp
	// 	}

	// 	let temp = []
	// 	for (let i = 0; i < result.length; i++) {
	// 		temp.push(inputsTop[result[i]] + " = " + inputsBot[i])
	// 	}
	// 	props.setInputsMatch(temp)
	// }

	return (
		<div>
			<div className="counter">
				<button onClick={decrement} className="button">-</button>
				<h1>{props.count}</h1>
				<button onClick={increment} className="button">+</button>
			</div>
		</div>
	)
}

const Node = (props) => {
	let className = "node"
	const extraClassName = 
		(props.bottom && props.left) ? "-full" : 
		(!props.bottom && !props.left) ? "" : 
		(!props.left && props.bottom) ? "-bottom" :
		"-left"
	className += extraClassName

	if (props.visited === 1) className += "-visited"
	if (props.visited === 0) className += "-visited-bot"

	return (
		<div className={className} key={props.j}></div>
	)
}

const Grid = (props) => {
	const grid = []
	const iMax = 50
	const jMax = props.count
	const initialArray = Array.from({length: iMax}, () => Array.from({length: jMax}, () => -1))
	const [visited, setVisited] = useState(initialArray)

	const traverse = (i, j) => {
		i = 0
		j = 0
		while (i != iMax) {
			let copy = [...visited]
			copy[i][j] = 1
			setVisited(copy)
			if (grid[i][j].bottom) {
				// right
				j++
			} else if (j-1 >= 0 && grid[i][j-1].bottom){
				// left
				copy = [...visited]
				copy[i][j-1] = 0
				setVisited(copy)
				j--
			}
			// down
			i++
		}
	}

	for (let i = 0; i < iMax; i++) {
		const row = []
		for (let j = 0; j < jMax; j++) {
			const bottom = (i === iMax-1 || j === jMax-1 || 
				!props.active.some(element => element[0] === i && element[1] === j)) ? false : true
			const currentNode = {
				i: i,
				j: j,
				bottom: bottom,
				left: true,
				visited: visited[i][j]
			}
			row.push(currentNode)
		}
		grid.push(row)
	}
	
	return (
		<>
			<div className="grid">
				{grid.map((row, i) => {
					return (
						<div key={i} className="row">
							{row.map((node, j) => {
								const {row, col, bottom, left, visited} = node
								return (
									<Node
										key={j}
										bottom={bottom}
										left={left}
										visited={visited}
									/>
								)
							})
							}
						</div>
					)
				})
				}
			</div>
			<button onClick={traverse}>Traverse</button>
		</>
	)
}

const InputTop = (props) => {
	return (
		<div className="inputsTopContainer">
			{props.inputsMatch}
		</div>
	)
}

const Box = (props) => {
	const [active, setActive] = useState([])
	const generate = () => {
		const numRungs = Math.floor(Math.random() * (20 - (props.count + 3) + 1) + (props.count + 3))

		const nums = new Set()
		while (nums.size < numRungs) {
			nums.add(Math.floor(Math.random() * 49))
		}
		
		for (const num of nums.values()) {
			const idx = Math.floor(Math.random() * (props.count - 1)) 
			setActive(active => [...active, [num, idx]])
		}
	}

	return (
		<div className="box">
			<button onClick={generate}>Start</button>
			<InputTop inputsMatch={props.inputsMatch} />
			<Grid count={props.count} active={active} />
		</div>
	)
}

const Result = (props) => {
	return (
		<div className="result">
		{/* <ul className="resultList">
			{props.inputsMatch.map(i => <li key={i}>{i}</li>)}
		</ul> */}
		</div>
	)
}

const App = () => {
	const [count, setCount] = useState(0)
	const [inputsMatch, setInputsMatch] = useState([])

    return (
		<div className="page">
			<Setter count={count} setCount={setCount} inputsMatch={inputsMatch}
				setInputsMatch={setInputsMatch} />
			<Box count={count} inputsMatch={inputsMatch}/>
			<Result inputsMatch={inputsMatch} />
		</div>
    )
}

export default App;