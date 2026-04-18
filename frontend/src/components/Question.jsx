function Question(props) {
    const handleClick = (event) => {
        if (props.submitted) return

        const nextAnswers = props.selectedAnswers.map(answer => {
            if (answer.id != props.id) {
                return answer;
            } else {
                const val = event.target.id[event.target.id.length - 1]
                return {
                    ...answer,
                    val: val,
                }
            }
        })

        props.setSelectedAnswers(nextAnswers)
    }

    const selectedAnswer = props.selectedAnswers[props.id].val
    const correctAnswer = props.correctAnswers[props.id]
    const isCorrect = selectedAnswer == correctAnswer
    const hasSubmitted = props.submitted
    const classNames = ['', '', '', '']
    let questionClassName = ''

    if (hasSubmitted) {
        questionClassName = isCorrect ? 'correct' : 'incorrect'
        if (!isCorrect && selectedAnswer !== "-1") {
            classNames[parseInt(selectedAnswer)] = 'incorrectAnswer'
        }
        classNames[parseInt(correctAnswer)] = 'correctAnswer'
    } else {
        classNames[0] = selectedAnswer === "0" ? 'selectedAnswer' : ''
        classNames[1] = selectedAnswer === "1" ? 'selectedAnswer' : ''
        classNames[2] = selectedAnswer === "2" ? 'selectedAnswer' : ''
        classNames[3] = selectedAnswer === "3" ? 'selectedAnswer' : ''
    }

    return(
        <article className={questionClassName}>
            <h5>{props.question.text}</h5>

            <div className="answerGrid">
                <button id={props.id + "answer0"}
                    className={classNames[0]}
                    onClick={handleClick}>
                        {props.question.answers[0]}
                </button>

                <button id={props.id + "answer1"}
                    className={classNames[1]}
                    onClick={handleClick}>
                        {props.question.answers[1]}
                </button>

                <button id={props.id + "answer2"}
                    className={classNames[2]}
                    onClick={handleClick}>
                        {props.question.answers[2]}
                </button>

                <button id={props.id + "answer3"}
                    className={classNames[3]}
                    onClick={handleClick}>
                        {props.question.answers[3]}
                </button>
            </div>

        </article>
    )
}

export default Question