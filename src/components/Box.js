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
            <div 
                className="ladder"
                style={{
                    width: layout.count === 1 ? "20%" : 
                        layout.count === 2 ? "40%" :
                        layout.count === 3 ? "60%" :
                        layout.count === 4 ? "80%" :
                        "100%"
                }}
            >
                <div 
                    className="inputsTopContainer"
                    style={{
                        marginBottom: labels ? "0px" : "10px"
                    }}
                >
                    {labels ? layout.valuesTop : layout.inputsTop}
                </div>
                <Grid setTraverse={setTraverse} doTraverse={doTraverse} active={layout.activeRungs} 
                    layout={layout} dispatch={dispatch} />
                <div 
                    className="inputsBotContainer"
                    style={{
                        marginTop: labels ? "0px" : "10px"
                    }}
                >
                    {labels ? layout.valuesBot : layout.inputsBot}
                </div>
            </div>
        </div>
	)
}