import { useEffect, useState} from "react"
import Node from "./Node"

export default function Grid(props) { 
    const [layout, dispatch] = [props.layout, props.dispatch]
	const iMax = 50
	const jMax = layout.count
    const [visited, setVisited] = useState(new Map())
    const [row, setRow] = useState(-1)
    const [col, setCol] = useState(-1)

    const checkRung = (i, j) => {
        return i !== iMax-1 && j !== jMax-1 && 
            props.active.some(el => el[0] === i && el[1] === j)
    }

    useEffect(() => {
        if (row >= 0 && row < iMax) {
            setTimeout(() => {
                // traverse
                setVisited(new Map(visited.set(row*jMax+col, 1)))
                if (checkRung(row, col)) {
                    // right
                    setCol(col => col + 1)
                } else if (col-1 >= 0 && checkRung(row, col-1)) {
                    // left
                    setVisited(new Map(visited.set(row*jMax+col-1, 0)))
                    setCol(col => col - 1)
                }
                setRow(row => row + 1)
                if (row === iMax-1) {
                    dispatch({type: "ADDMATCHBOT", index: col})
                }
            }, 100)
        }
    }, [row])
    
	useEffect(() => {
        if (props.doTraverse !== -1 && props.doTraverse !== null) {
            setVisited(vis => new Map(vis.clear()))
            setCol(props.doTraverse)
            setRow(0)
            dispatch({type: "ADDMATCHTOP", fn:props.setTraverse, index: props.doTraverse}) 
        }
    }, [props.doTraverse])

	return (
        <div className="grid">
            {[...Array(iMax)].map((_, i) => {
                return (
                    <div key={i} className="row">
                        {[...Array(jMax)].map((_, j) => {
                            return (
                                <Node
                                    key={i*jMax+j}
                                    bottom={checkRung(i, j)}
                                    left={true}
                                    visited={visited.has(i*jMax+j) ? visited.get(i*jMax+j) : -1}
                                />
                            )
                        })
                        }
                    </div>
                )
            })
            }
        </div>
	)
}