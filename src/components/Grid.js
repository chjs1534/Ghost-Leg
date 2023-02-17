import { useEffect, useImperativeHandle, useState } from "react"
import Node from "./Node"

export default function Grid(props) {
	useEffect(() => {
        if (props.doTraverse !== -1) console.log("hello")
    }, [props.doTraverse])

    //     traverse(i, j) {
    //         console.log("why")
    //         i = 0
    //         j = 0
    //         while (i != iMax) {
    //             let copy = [...visited]
    //             copy[i][j] = 1
    //             setVisited(copy)
    //             if (grid[i][j].bottom) {
    //                 // right
    //                 j++
    //             } else if (j-1 >= 0 && grid[i][j-1].bottom){
    //                 // left
    //                 copy = [...visited]
    //                 copy[i][j-1] = 0
    //                 setVisited(copy)
    //                 j--
    //             }
    //             // down
    //             i++
    //         }
    //     }
    // }))
    
    
    const [layout, dispatch] = [props.layout, props.dispatch]
    const grid = []
	const iMax = 50
	const jMax = layout.count
	const initialArray = Array.from({length: iMax}, () => Array.from({length: jMax}, () => -1))
	const [visited, setVisited] = useState(initialArray)

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

    // console.log(grid)

	return (
		<>
			<div className="grid">
				{grid.map((row, i) => {
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