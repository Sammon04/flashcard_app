import { useNavigate } from "react-router-dom"
import { Session } from "../util/Session"
import Header from '../components/Header'
import QuestionSet from "../components/QuestionSet"

function Play() {
    const navigate = useNavigate()
    const curUser = Session.getCurUser()

    return (
        <>
            <main>
                <QuestionSet userID={curUser}/>
                <br/>
                <button onClick={() => {window.location.href="/"}}>Return to Dashboard</button>
            </main>
        </>
    )
}

export default Play