import { useState } from 'react'
import { Session } from "../util/Session"
import Question from './Question.jsx'

const tags = ['role', 'district', 'locale', 'wildcard']
const questionTexts = [
    'What is this person\'s role?',
    'What is this person\'s district?',
    'What is this person\'s primary language?',
    'Which of these is an interesting fact about this person?',
]

function QuestionSet(props) {
    const [pending, setPending] = useState(false)
    const [imageURL, setImageURL] = useState('')
    const [questions, setQuestions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])

    // Here we assume a fixed length for the question set
    const [selectedAnswers, setSelectedAnswers] = useState([
        {id: 0, val:"-1"},
        {id: 1, val:"-1"},
        {id: 2, val:"-1"},
        {id: 3, val:"-1"},
        {id: 4, val:"-1"},
    ])
    const [submitted, setSubmitted] = useState(false)

    const curUser = Session.getCurUser()
    

    const getRandomUser = async () => {
        try {
            const response = await fetch('http://localhost/flashcard_app/backend/api/users/list_users.php')

            const users = await response.json()
            if (!users.error) {
                // Filter out the currently logged in user
                const others = users.filter((user) => user.user_id != curUser.user_id)
                if (!others.length) {
                    console.log('No other users in database')
                    return curUser.user_id
                }

                // Select an id at random
                let index = Math.floor(Math.random() * others.length)
                setImageURL(others[index].image)
                return others[index].user_id
            } else {
                console.log(users.error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Sets the answer set to that of a random user and three others
    const fetchAnswerSet = async () => {
        setPending(true)
        try {
            const id = await getRandomUser()
            const response = await fetch(`http://localhost/flashcard_app/backend/api/users/get_answers.php?id=${id}`)

            const answerData = await response.json()
            if (!answerData.error) {
                console.log(answerData)
                const newQuestions = []
                const newCorrectAnswers = []

                for (let i = 0; i < 4; i++)
                {
                    // Which answer should be the correct one?
                    let place = Math.floor(Math.random() * 4)
                    newCorrectAnswers.push(place + 1)
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
                setCorrectAnswers(newCorrectAnswers)
            } else {
                console.log(answerData.error)
            }
        } catch (err) {
            console.log(err)
        }

        setPending(false)
    }

    const handleSubmit = async () => {
        setSubmitted(true)
        let incorrect = 0
        for (let i = 0; i < correctAnswers.length; i++) {
            incorrect += correctAnswers[i] != selectedAnswers[i].val
        }

        if (incorrect) return

        try {
            const response = await fetch(`http://localhost/flashcard_app/backend/api/users/update_score.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id: curUser.user_id, score: 4}) // assuming 1 point per question
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleSkip = () => {
        setQuestions([])
        setPending(false)
        setSubmitted(false)
    }

    if (!questions.length && !pending) {
        fetchAnswerSet();
    }


    let count = 0
    const questionsJSX = []
    questions.forEach((element) => {
        questionsJSX.push(<Question question={element} key={count} id={count}
        selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers}/>)
        count++
    })
    
    const submitDisabled = 'disabled';
    return(
        <section className='questionSet'>
            <div className='imgDiv'><img src="../../favicon.png"></img></div>
            {questionsJSX}
            <div className='actionsDiv'>
                <button onClick={handleSkip}>Skip</button>
                <button onClick={handleSubmit} disabled={submitted} >Submit</button>
            </div>
        </section>
    )
}

export default QuestionSet