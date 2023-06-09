import React from 'react'
import Question from './Question'

export default () => {

	const [questionsData, setQuestionsData] = React.useState([])
	const [showAnswers, setShowAnswers] = React.useState(false)
	const [errorMessage, setErrorMessage] = React.useState(null)
	const [startTime, setStartTime] = React.useState(null)

	const minQuestionsLoadingDelay = 2000
	const maxQuestionsLoadingDelay = 8000

	const totalScore =
		`${questionsData.filter(
			questionData => questionData.userAnswer === questionData.correct_answer
		).length} 
		/ ${questionsData.length}`

	const timeToAnswerInSeconds = ((Date.now() - startTime) / 1000).toFixed(1)

	React.useEffect(() => {
		play()
	}, [])

	function play() {
		setQuestionsData([])
		const startTime = Date.now()
		const abortFetchIfAPIDownController = new AbortController()
		const abortFetchIfAPIDownTimeout = setTimeout(() => {
			abortFetchIfAPIDownController.abort()
		}, maxQuestionsLoadingDelay)
		fetch("https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple",
			{
				signal: abortFetchIfAPIDownController.signal
			})
			.then(res => {
				return res.json()
			})
			.then(data => {
				if (data.results.length === 0) {
					throw Error('No results were sent back from the questions database!')
				}
				const elapsedTime = Date.now() - startTime;
				const delay = Math.max(minQuestionsLoadingDelay - elapsedTime, 0);
				setTimeout(() => {
					setQuestionsData(data.results)
					setShowAnswers(false)
					setStartTime(Date.now())
				}, delay)
			})
			.catch(error => {
				if (error.name === 'AbortError') {
					setErrorMessage('Error fetching questions data: API is down!')
				} else {
					setErrorMessage(`Error fetching questions data: ${error.message}`);
				}
			})
			.finally(
				() => {
					clearTimeout(abortFetchIfAPIDownTimeout)
				}
			)
	}

	const questions = questionsData.map((questionData, index) => (
		<Question key={index} questionIndex={index} questionData={questionData} showAnswers={showAnswers} answer={answer}/>
	))

	function answer(questionIndex, userAnswer) {
		setQuestionsData(prev => {
			return prev.map((questionData, index) => {
				return index === questionIndex
					? {...questionData, userAnswer: userAnswer}
					: questionData
			})
		})
	}

	if (errorMessage) {
		return (
			<div className="container error--container">
				<h3>{errorMessage}</h3>
			</div>
		)
	}

	if (questionsData.length === 0) {
		return (
			<div className="container loading--container">
				<img className="loading--image" alt="Loading..." src="images/loading.gif"/>
			</div>
		)
	}

	return (
		<div className="container questions--container">
			{questions}
			{!showAnswers && (
				<div>
					<button className="check-answers-button" onClick={() => {
						setShowAnswers(true)
					}}>Check answers
					</button>
				</div>
			)}
			{showAnswers && (
				<div className="results-container">
					<span
						className="total-score-text">You scored {totalScore} correct answers in {timeToAnswerInSeconds} seconds!</span>
					<button className="play-again-button" onClick={play}>Play again</button>
				</div>
			)}
		</div>
	)
}
