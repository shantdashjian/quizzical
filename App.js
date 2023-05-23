import React from 'react'

export default () => {
	// https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple
	const [ page, setPage ] = React.useState('start')

	return (
		<main>
			{page == 'start' &&
				<div className="start--container">
					<h1 className="start--heading">Quizzical</h1>
					<h2 className="start--description">Test Your Knowledge about Mythology!</h2>
					<button className="start--button">Start the Adventure!</button>
				</div>
			}
			{page == 'questions' && (
				<h1>Questions</h1>
			)}
		</main>
	)
}
