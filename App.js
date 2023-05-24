import React from 'react'
import Start from './components/Start'
import Questions from './components/Questions'

export default () => {
	const [ page, setPage ] = React.useState('start')

	function startGame() {
		setPage('questions')
	}

	return (
		<main>
			{page == 'start' &&
				<Start startGame={startGame}/>
			}
			{page == 'questions' && (
				<Questions />
			)}
		</main>
	)
}
