import { useState } from 'react'
import { Session } from "../util/Session"
import Question from './Question.jsx'

const tags = ['name', 'role', 'department', 'location', 'wildcard']
const questionTexts = [
    'What is this person\'s name?',
    'What is this person\'s role?',
    'What is this person\'s department?',
    'What is this person\'s location within the company?',
    'Which of these interesting facts is about this person?',
]

function QuestionSet(props) {
    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [score, setScore] = useState(0)

    const [imageURL, setImageURL] = useState('')
    const [userList, setUserList] = useState([])
    const [questions, setQuestions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([])

    const curUser = Session.getCurUser()
    

    const getUserList = async () => {
        // Don't fetch it if we already have it
        if (userList.length) return userList

        try {
            const response = await fetch('http://localhost/flashcard_app/backend/api/users/list_users.php')

            const users = await response.json()
            if (!users.error) {
                // Filter out the currently logged in user
                const others = users.filter((user) => user.user_id != curUser.user_id)
                if (!others.length) {
                    setImageURL('')
                    setError('No other users in database')
                    return
                }

                // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
                let currentIndex = others.length;

                // While there remain elements to shuffle...
                while (currentIndex) {

                    // Pick a remaining element...
                    let randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;

                    // And swap it with the current element.
                    [others[currentIndex], others[randomIndex]] = [
                    others[randomIndex], others[currentIndex]];
                }

                const params = new URLSearchParams(document.location.search)
                const count = parseInt(params.get("count"))
                // No need to clamp count, slice does so already
                const sliced = others.slice(0, count)

                // Update our cache
                setUserList(count ? sliced : others)
                return count ? sliced : others
            } else {
                setError(users.error)
            }
        } catch (err) {
            setError(err)
        }

        return []
    }

    const getRandomUser = async () => {
        const users = await getUserList()
        if (!users.length) return -1

        // Users is a shuffled list, so every element is random
        const user = users.shift()
        let id = user.user_id
        const selectedImage = user.image
        setUserList(users)

        // Something wrong with the image, then don't display questions
        if (!selectedImage) {
            setImageURL('')
            setError(`No image found for ${user.fname} ${user.lname}`)
            id = -1
        } else {
            setImageURL('http://localhost/flashcard_app/' + selectedImage)
            setError('')
        }

        if (users.length === 0) {
            setCompleted(true)
        }

        return id
    }

    // Sets the answer set to that of a random user and three others
    const fetchAnswerSet = async () => {
        if (completed) return

        // Prevents a double load while we wait for the fetch
        setPending(true)

        try {
            const id = await getRandomUser()
            if (id === -1) return // pls don't make -1 a valid value

            const response = await fetch(`http://localhost/flashcard_app/backend/api/users/get_answers.php?id=${id}`)

            const answerData = await response.json()
            console.log(answerData)

            if (!answerData.error) {
                const newQuestions = []
                const newCorrectAnswers = []
                const newSelectedAnswers = []

                for (let i = 0; i < answerData.length; i++)
                {
                    // -1 is a sentinel value for selected answer
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

        const newScore = score + correct
        setScore(newScore)

        if (!completed || newScore <= curUser.score) return

        try {
            const response = await fetch(`http://localhost/flashcard_app/backend/api/users/update_score.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id: curUser.user_id, score: newScore}) // assuming 1 point per question
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

    if (!questions.length && !pending && !error && !completed) {
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
                <button onClick={handleSkip} disabled={completed}>
                    {submitted || error ? 'Next Person' : 'Skip'}
                </button>
                <button onClick={handleSubmit} disabled={submitted || error} >
                    {completed ? 'Submit' : 'Check Answers'}
                </button>
            </div>
            {completed && submitted && <p>Score: {score}</p>}
        </section>
    )
}

export default QuestionSet