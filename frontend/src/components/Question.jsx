function Question(props) {
    const handleChange = (event) => {
        const nextAnswers = props.selectedAnswers.map(answer => {
            if (answer.id != props.id) {
                return answer;
            } else {
                return {
                    ...answer,
                    val: event.target.value,
                }
            }
        })

        props.setSelectedAnswers(nextAnswers)
    }

    return(
        <article>
            <p>{props.question.text}</p>

            <label htmlFor={props.id + "answer1"}>
                {props.question.answer1}
            </label>
            <input type="radio" name={props.id + "answer"} id={props.id + "answer1"} value="1"
                checked={props.selectedAnswers[props.id].val === "1"}
                onChange={handleChange}/>

            <label htmlFor={props.id + "answer2"}>
                {props.question.answer2}
            </label>
            <input type="radio" name={props.id + "answer"} id={props.id + "answer2"} value="2"
                checked={props.selectedAnswers[props.id].val === "2"}
                onChange={handleChange}/>

            <br/>

            <label htmlFor={props.id + "answer3"}>
                {props.question.answer3}
            </label>
            <input type="radio" name={props.id + "answer"} id={props.id + "answer3"} value="3"
                checked={props.selectedAnswers[props.id].val === "3"}
                onChange={handleChange}/>

            <label htmlFor={props.id + "answer4"}>
                {props.question.answer4}
            </label>
            <input type="radio" name={props.id + "answer"} id={props.id + "answer4"} value="4"
                checked={props.selectedAnswers[props.id].val === "4"}
                onChange={handleChange}/>
        </article>
    )
}

export default Question