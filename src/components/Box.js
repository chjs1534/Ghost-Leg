import { useState, useEffect } from "react"
import Grid from "./Grid"

export default function Box(props) { 
    const [layout, dispatch] = [props.layout, props.dispatch]
    const [labels, setLabels] = useState(false)
    const [doTraverse, setDoTraverse] = useState(-1)

    const setTraverse = (i) => {
        setDoTraverse(i);
    }

    useEffect(() => {
        if (layout.activeRungs.length > 0) {
            setLabels(true)
            dispatch({type: "SETLABELS", fn: setTraverse})
        }
    }, [layout.activeRungs])

	return (
		<div className="box">
			<div className="inputsTopContainer">{labels ? layout.valuesTop : layout.inputsTop}</div>
			<Grid doTraverse={doTraverse} active={layout.activeRungs} layout={layout} dispatch={dispatch} />
			<div className="inputsBotContainer">{labels ? layout.valuesBot : layout.inputsBot}</div>
		</div>
	)
}