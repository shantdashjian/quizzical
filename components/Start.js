import React from 'react'

export default (props) => {
	return (
		<div className="container start--container">
			<h1 className="start--heading">Quizzical</h1>
			<h2 className="start--description">Test Your Knowledge about Mythology!</h2>
			<button className="start--button" onClick={props.startGame}>Start the Adventure!</button>
		</div>
	)
}
