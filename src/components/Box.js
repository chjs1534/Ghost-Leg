import { useState } from "react"
import Grid from "./Grid"

export default function Box(props) { 
    const [layout, dispatch] = [props.layout, props.dispatch]
	const [active, setActive] = useState([])
    const [labels, setLabels] = useState(false)
    const [doTraverse, setDoTraverse] = useState(-1)

    const setTraverse = (index) => {
        console.log("BRUH")
    }

	const generate = () => {
		const numRungs = Math.floor(Math.random() * (20 - (layout.count + 3) + 1) + (layout.count + 3))

		const nums = new Set()
		while (nums.size < numRungs) {
			nums.add(Math.floor(Math.random() * 49))
		}
		
		for (const num of nums.values()) {
			const idx = Math.floor(Math.random() * (layout.count - 1)) 
			setActive(active => [...active, [num, idx]])
		}
		
        setLabels(true)
        dispatch({type: "SETLABELS", fn:setTraverse})
	}

	return (
		<div className="box">
			<button onClick={generate}>Start</button>
			<div className="inputsTopContainer">{labels ? layout.valuesTop : layout.inputsTop}</div>
			<Grid doTraverse={props.doTraverse} active={active} layout={layout} />
			<div className="inputsBotContainer">{labels ? layout.valuesBot : layout.inputsBot}</div>
		</div>
	)
}