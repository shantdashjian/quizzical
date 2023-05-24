import React from 'react'
import {decode} from 'html-entities'
import {shuffle} from '../utils'

export default (props) => {

	const [ data, setData ] = React.useState(props.data)

	const [ allAnswers ] = React.useState(
		shuffle([props.data.correct_answer, ...props.data.incorrect_answers])
	)

	const answerButtons = allAnswers.map((answerText, index) => {
		let className = "answer-button"
		if (props.showAnswers) {
			if (answerText == data.correct_answer) {
				className += " correct-answer"
			} else if (answerText == data.userAnswer) {
				className += " incorrect-answer"
			}
		} else if (answerText == data.userAnswer) {
				className += " answered"
		}
		return <button key={index} className={className} onClick={answer}>{answerText}</button>
	})

	function answer(event) {
		const answerText = event.target.textContent
		setData(prev => (
			{...prev, userAnswer: answerText}
		))
		props.answer(props.questionIndex, answerText)
	}

	return (
		<div className="question--container">
			<h3 className="question--text">{decode(props.data.question)}</h3>
			<div className="answer-buttons">
				{answerButtons}
			</div>
		</div>
	)
}
