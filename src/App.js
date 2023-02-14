import { useEffect, useState } from "react";
import './styles.css';

const Setter = (props) => {
	const iMax = 50

	const traverse = (i, j) => {
		i = 0
		j = 1
		while (i != iMax) {
			let copy = [...props.visited]
			copy[i][j] = 1
			props.setVisited(copy)
			if (props.grid[i][j].bottom) {
				// right
				j++
			} else if (j-1 >= 0 && props.grid[i][j-1].bottom){
				// left
				copy = [...props.visited]
				copy[i][j-1] = 0
				props.setVisited(copy)
				j--
			}
			// down
			i++
		}
	}

	const handle = (e, index, row) => {
		if (row === "top") {
			props.setTopValues(topVal => topVal.map((v, i) => {
				if (i === index) return <div key={i} className="inputsText" onClick={traverse}>
					{e.target.value}</div>
				return v
			}))
		} else {
			props.setBotValues(botVal => botVal.map((v, i) => {
				if (i === index) return <div key={i} className="inputsText">{e.target.value}</div>
				return v
			}))
		}
	}

	const increment = () => {
		if (props.count < 6) {
			props.setInputsTop([...props.inputsTop, 
				<input className="input" type="text" key={props.count}
					onChange={e => handle(e, props.count, "top")}></input>])
			props.setInputsBot([...props.inputsBot, 
				<input className="input" type="text" key={props.count}
					onChange={e => handle(e, props.count, "bot")}></input>])
			props.setCount(props.count + 1)
			props.setTopValues([...props.topValues, ""]) // change
			props.setBotValues([...props.botValues, ""]) // change
		}
	}

	const decrement = () => {
		if (props.count > 2) {
			props.setCount(props.count - 1)
			props.setInputsTop(props.inputsTop.slice(0, -1))
			props.setInputsBot(props.inputsBot.slice(0, -1))
			props.setTopValues(props.topValues.slice(0, -1))
			props.setBotValues(props.botValues.slice(0, -1))
		}
	}

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
		<div className="nodeContainer">
			<div className={className} key={props.j}></div>
		</div>
	)
}

const Grid = (props) => {
	const iMax = 50
	const jMax = props.count
	let gr = []

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
				vi: props.visited[i][j]
			}
			row.push(currentNode)
		}
		gr.push(row)
	}

	useEffect(() => {
		props.setGrid(gr)
	}, [gr])
	
	return (
		<>
			<div className="grid">
				{props.grid.map((row, i) => {
					return (
						<div key={i} className="row">
							{row.map((node, j) => {
								const {row, col, bottom, left, vi} = node
								return (
									<Node
										key={j}
										bottom={bottom}
										left={left}
										visited={vi}
									/>
								)
							})
							}
						</div>
					)
				})
				}
			</div>
		</>
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
		
		props.setInputsTop(props.topValues)
		props.setInputsBot(props.botValues)
	}

	return (
		<div className="box">
			<button onClick={generate}>Start</button>
			<div className="inputsTopContainer">
				{props.inputsTop}
			</div>
			<Grid count={props.count} active={active} grid={props.grid} setGrid={props.setGrid}
			visited={props.visited} />
			<div className="inputsBotContainer">
				{props.inputsBot}
			</div>
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
	const [inputsTop, setInputsTop] = useState([])
	const [inputsBot, setInputsBot] = useState([])
	const [topValues, setTopValues] = useState([])
	const [botValues, setBotValues] = useState([])
	const jMax = count
	const [visited, setVisited] = useState(Array.from({length: 50}, 
		() => Array.from({length: jMax}, () => -1)))
	const [grid, setGrid] = useState([])

    return (
		<div className="page">
			<Setter count={count} setCount={setCount} inputsTop={inputsTop}
				setInputsTop={setInputsTop} inputsBot={inputsBot} setInputsBot={setInputsBot}
				topValues={topValues} setTopValues={setTopValues} botValues={botValues}
				setBotValues={setBotValues} visited={visited} setVisited={setVisited} 
				grid={grid} setGrid={setGrid} />
			<Box count={count} inputsTop={inputsTop} inputsBot={inputsBot} setInputsTop={setInputsTop}
				setInputsBot={setInputsBot} topValues={topValues} botValues={botValues}
				visited={visited} grid={grid} setGrid={setGrid} />
			{/* <Result inputsMatch={inputsMatch} /> */}
		</div>
    )
}

export default App;