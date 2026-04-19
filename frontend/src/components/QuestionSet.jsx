import { useState } from 'react'
import { Session } from "../util/Session"
import Question from './Question.jsx'

const tags = ['fname', 'lname', 'role', 'department', 'location', 'wildcard']
const questionTexts = [
    'What is this person\'s first name?',
    'What is this person\'s last name?',
    'What is this person\'s role?',
    'What is this person\'s department?',
    'What is this person\'s location within the company?',
    'Which of these is an interesting fact about this person?',
]

function QuestionSet(props) {
    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')

    const [imageURL, setImageURL] = useState('')
    const [questions, setQuestions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([])
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
                const index = Math.floor(Math.random() * others.length)
                
                const selectedImage = others[index].image
                if (!selectedImage) {
                    setImageURL('')
                    setError(`No image found for ${others[index].fname} ${others[index].lname}`)
                } else {
                    setImageURL('http://localhost/flashcard_app/' + selectedImage)
                    setError('')
                    return others[index].user_id
                }
            } else {
                setError(users.error)
            }
        } catch (err) {
            setError(err)
        }
        return -1
    }

    // Sets the answer set to that of a random user and three others
    const fetchAnswerSet = async () => {
        setPending(true)
        try {
            const id = await getRandomUser()
            if (id === -1) {
                setPending(false)
                return
            }
            const response = await fetch(`http://localhost/flashcard_app/backend/api/users/get_answers.php?id=${id}`)

            const answerData = await response.json()
            if (!answerData.error) {
                console.log(answerData)
                const newQuestions = []
                const newCorrectAnswers = []
                const newSelectedAnswers = []

                for (let i = 0; i < answerData.length; i++)
                {
                    newSelectedAnswers.push({id: i, val: "-1"})
                    // Which answer should be the correct one?
                    let place = Math.floor(Math.random() * 4)
                    newCorrectAnswers.push(place)
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
                setSelectedAnswers(newSelectedAnswers)
                setError('')
            } else {
                console.log(answerData.error)
                setError(answerData.error)
            }
        } catch (err) {
            console.log(err)
            setError(err)
        }

        setPending(false)
    }

    const handleSubmit = async () => {
        setSubmitted(true)
        let correct = 0
        for (let i = 0; i < correctAnswers.length; i++) {
            correct += correctAnswers[i] == selectedAnswers[i].val
        }

        if (!correct) return

        try {
            const response = await fetch(`http://localhost/flashcard_app/backend/api/users/update_score.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id: curUser.user_id, score: correct}) // assuming 1 point per question
            })
        } catch (err) {
            setError(err)
        }
    }

    const handleSkip = () => {
        setQuestions([])
        setPending(false)
        setSubmitted(false)
        setError('')
    }

    if (!questions.length && !pending && !error) {
        fetchAnswerSet();
    }


    let count = 0
    const questionsJSX = []
    questions.forEach((element) => {
        questionsJSX.push(<Question question={element} key={count} id={count}
        selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers}
        correctAnswers={correctAnswers} submitted={submitted}/>)
        count++
    })

    return(
        <section className='questionSet'>
            <div className='imgDiv'>
                <img src={imageURL || 'http://localhost/flashcard_app/backend/uploads/users/human.png'} />
            </div>
            {error && <p className='error-message'>{error}</p>}

            {questionsJSX}
            <div className='actionsDiv'>
                <button onClick={handleSkip}>{submitted || error ? 'Next Person' : 'Skip'}</button>
                <button onClick={handleSubmit} disabled={submitted || error} >Submit</button>
            </div>
        </section>
    )
}

export default QuestionSet