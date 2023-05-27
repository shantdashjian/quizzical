import React from 'react'
import {decode} from 'html-entities'
import {shuffle} from '../utils'

export default (props) => {

	const [ questionData, setQuestionData ] = React.useState(props.questionData)

	const [ allAnswers ] = React.useState(
		shuffle([props.questionData.correct_answer, ...props.questionData.incorrect_answers])
	)

	const answerButtons = allAnswers.map((answerText, index) => {
		const disabled = props.showAnswers
		let className = "answer-button"
		if (props.showAnswers) {
			if (answerText === questionData.correct_answer) {
				className += " correct-answer"
			} else if (answerText === questionData.userAnswer) {
				className += " incorrect-answer"
			}
		} else if (answerText === questionData.userAnswer) {
				className += " answered"
		}
		return <button key={index} className={className} onClick={answer} disabled={disabled}>{answerText}</button>
	})

	function answer(event) {
		const answerText = event.target.textContent
		setQuestionData(prev => (
			{...prev, userAnswer: answerText}
		))
		props.answer(props.questionIndex, answerText)
	}

	return (
		<div className="question--container">
			<h3 className="question--text">{decode(questionData.question)}</h3>
			<div className="answer-buttons">
				{answerButtons}
			</div>
		</div>
	)
}
