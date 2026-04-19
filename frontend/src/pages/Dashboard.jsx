import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Session } from "../util/Session"
import Header from '../components/Header'
import Leaderboard from "../components/Leaderboard"
import FakeAd from '../components/FakeAd'

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
                if (answerData.length >= 10) {
                    if (answerData.length > 10) {
                        setUserScores(answerData.slice(0, 10))
                    }
                    
                    var userIn = false

                    for (var i = 0; i < answerData.length; i++){
                        if (answerData[i][0] == curUser.user_id){
                            userIn = true
                            break
                        }
                    };

                    if (!userIn){

                        answerData.map(
                            (user) => {
                                user.push(false)
                            }
                        )

                        answerData.push([curUser.user_id, curUser.fname + " " + curUser.lname, curUser.score, true])

                        setUserScores(answerData)
                        console.log(answerData)
                        return
                    }

                }
                
                answerData.forEach(
                        (user) => {
                            if (user[0] == curUser.user_id){
                                user.push(true)
                            }
                            user.push(false)
                        }
                    )

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
            <Header user={curUser} headerTitle={"Dashboard"}/>
            <div className="threeColumns">
                <div className="leftColumn">
                    <Leaderboard userScores={userScores}/>
                </div>
                <main>
                    <button onClick={() => {window.location.href="/play"}}>Play!</button>
                </main>
                <div className='rightColumn'>
                    <FakeAd/>
                </div>
            </div>
        </>
    )
}

export default Dashboard