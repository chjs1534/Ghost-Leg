export default function Node(props) {
	return (
		<div className="nodeContainer">
			<div
                key={props.j}
                style={
                    {
                    borderLeft: props.left ? (props.visited === 1
                         ? "2px solid red" : "2px solid") : "",
                    borderBottom: props.bottom ? (props.visited === 1 
                        || props.visited === 0 ? "2px solid red" : "2px solid") : "",
                    position: "relative",
                    left: "50%",
                    flex: 1
                    }
                }
            >
            </div>
		</div>
	)
}