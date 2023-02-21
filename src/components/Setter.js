import { useReducer } from "react"
import Box from "./Box"
import { INITIAL_STATE, layoutReducer } from "./layoutReducer"

export default function Setter() {
    const [layout, dispatch] = useReducer(layoutReducer, INITIAL_STATE)

	const increment = () => {
        const handleIn = (e, index, colType) => {
            dispatch({
                type:`SETVALUE${colType}`,
                index:index,
                value:e.target.value
            })
        }

		if (layout.count < 6) {
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
		if (layout.count > 2) {
			dispatch({type:"DECREMENT"})
		}
	}

    const generateRungs = () => {
        dispatch({type:"GENRUNGS"})
    }

	return (
		<div className="page">
            <div className="controls">
                <button onClick={generateRungs}>Start</button>  
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
