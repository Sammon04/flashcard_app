import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Session } from "../util/Session"
import Header from '../components/Header'
import Leaderboard from "../components/Leaderboard"

function Dashboard() {
    const navigate = useNavigate()
    const curUser = Session.getCurUser()
    const [pending, setPending] = useState(false)
    const [userScores, setUserScores] = useState([])

    async function getUserScores () {
        setPending(true)
        try {
            const response = await fetch(`http://localhost/flashcard_app/backend/api/users/list_scores.php`)

            const answerData = await response.json()
            if (!answerData.error) {
                // var k = 0
                // const userScores = answerData.map(
                //     (user) => {
                //         k = k + 1
                //         // return [name=user[0], score=user[1]]
                //     }
                // )
                // console.log(userScores)
                setUserScores(answerData)
            } else {
                console.log(answerData.error)
            }
        } catch (err) {
            console.log(err)
        }
        setPending(false)
    }
    
    if (!userScores.length && !pending) {
        getUserScores()
    }

    return (
        <>
            <Header user={curUser} />
            <h1>Dashboard</h1>
            <div className="threeColumns">
                <div className="leftColumn">
                    <Leaderboard userScores={userScores}/>
                </div>
                <main>
                    <button onClick={() => {window.location.href="/play"}}>Play!</button>
                </main>
            </div>
        </>
    )
}

export default Dashboard