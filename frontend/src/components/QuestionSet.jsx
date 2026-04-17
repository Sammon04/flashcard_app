import { useState } from 'react'
import Question from './Question.jsx'

const tags = ['role', 'district', 'locale', 'wildcard']
const questionTexts = [
    'What is this person\'s role?',
    'What is this person\'s district?',
    'What is this person\'s primary language?',
    'Which of these is an interesting fact about this person?',
]

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

    const fetchAnswerSet = async () => {
        try {
            const response = await fetch('http://localhost/flashcard_app/backend/api/users/get_answers.php?id=100')

            const answerData = await response.json()
            if (!answerData.error) {
                const newQuestions = []

                for (let i = 0; i < 4; i++)
                {
                    // Which answer should be the correct one?
                    let place = Math.floor(Math.random() * 4)
                    const question = []

                    // Add the answers to the question
                    for (let j = 0; j < place; j++) {
                        question.push(
                            answerData[i][tags[i]].Incorrect[j]
                        )
                    }
                    question.push(answerData[i][tags[i]].Correct)
                    for (let j = place; j < 4; j++) {
                        question.push(
                            answerData[i][tags[i]].Incorrect[j]
                        )
                    }

                    newQuestions.push({text: questionTexts[i], answers: question})
                }

                setQuestions(newQuestions)
            } else {
                console.log(answerData.error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    if (!questions.length) {
        fetchAnswerSet();
    }


    let count = 0
    const questionsJSX = []
    questions.forEach((element) => {
        questionsJSX.push(<Question question={element} key={count} id={count}
        selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers}/>)
        count++
    })
    
    return(
        <section className='questionSet'>
            <div className='imgDiv'><img src="../../favicon.png"></img></div>
            {questionsJSX}
            <div className='actionsDiv'>
                <button>Skip</button>
                <button onClick={() => {console.log(selectedAnswers)}}>Submit</button>
            </div>
        </section>
    )
}

export default QuestionSet