export default function Node(props) {
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