import { useState } from 'react'
import Question from './Question.jsx'

function QuestionSet(props) {
    const [questions, setQuestions] = useState([])

    // Here we assume a fixed length for the question set
    const [selectedAnswers, setSelectedAnswers] = useState([
        {id: 0, val:"-1"},
        {id: 1, val:"-1"},
        {id: 2, val:"-1"},
        {id: 3, val:"-1"},
        {id: 4, val:"-1"},
    ])

    // TODO: replace with actual fetching
    if (!questions.length) {
        setQuestions([
            {
                text : "What is this person's name?",
                answer1 : "Raymond DiDonato",
                answer2 : "Samuel Belanger",
                answer3 : "Gabriel Ball",
                answer4 : "Lohann spy_tf2",
            },
            {
                text : "What is this person's role?",
                answer1 : "Front-end Dev",
                answer2 : "Back-end Dev",
                answer3 : "Creative lead",
                answer4 : "Wait, they work here?",
            },
            {
                text : "What is this person's district?",
                answer1 : "Redford",
                answer2 : "Somewhere",
                answer3 : "France",
                answer4 : "Nowhere",
            },
            {
                text : "What is this person's primary language?",
                answer1 : "English",
                answer2 : "French",
                answer3 : "Klingon",
                answer4 : "Morse Code",
            },
            {
                text : "Which of these is an interesting fact about this person?",
                answer1 : "placeholder",
                answer2 : "placeholder",
                answer3 : "placeholder",
                answer4 : "placeholder",
            },
        ])
    }


    let count = 0
    const questionsJSX = []
    questions.forEach((element) => {
        questionsJSX.push(<Question question={element} key={count} id={count}
        selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers}/>)
        count++
    })
    
    return(
        <section>
            {questionsJSX}
            <br/>
            <button>Skip</button>
            <button onClick={() => {console.log(selectedAnswers)}}>Submit</button>
        </section>
    )
}

export default QuestionSet