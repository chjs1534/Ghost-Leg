import { useReducer, useState } from "react"
import Box from "./Box"
import { INITIAL_STATE, layoutReducer } from "./layoutReducer"

export default function Setter() {
    const [layout, dispatch] = useReducer(layoutReducer, INITIAL_STATE)
    const [started, setStarted] = useState(false)

	const increment = () => {
        const handleIn = (e, index, colType) => {
            dispatch({
                type:`SETTEXT${colType}`,
                index:index,
                value:e.target.value
            })
        }

		if (layout.count < 10 && !started) {
			dispatch({
                type:"INCREMENT", 
                inputTop: 
                    <input 
                        className="input" 
                        type="text" 
                        key={layout.count} 
                        onChange={e => handleIn(e, layout.count, "TOP")}
                    >
                    </input>,
                inputBot:
                    <input 
                        className="input" 
                        type="text" 
                        key={layout.count}
                        onChange={e => handleIn(e, layout.count, "BOT")}
                    >
                    </input>
            })
		}
	}

	const decrement = () => {
		if (layout.count > 1 && !started) {
			dispatch({type:"DECREMENT"})
		}
	}

    const generateRungs = () => {
        if (layout.textTop.every((el) => el !== "") 
            && layout.textBot.every((el) => el !== "")
            && !started && layout.count !== 0){
                dispatch({type:"GENRUNGS"})
                setStarted(true)
        }
    }
 
	return (
		<div className="page">
            <div className="controls">
                <button className="start" onClick={generateRungs}>Start</button>  
                <div className="counter">
                    <button onClick={decrement} className="button">-</button>
                    <h1>{layout.count}</h1>
                    <button onClick={increment} className="button">+</button>
                </div>
            </div>
            <Box layout={layout} dispatch={dispatch} />
		</div>
	)
}
