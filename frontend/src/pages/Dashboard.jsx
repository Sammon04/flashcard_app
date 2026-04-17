import { useNavigate } from "react-router-dom"
import { Session } from "../util/Session"
import Header from '../components/Header'

function Dashboard() {
    const navigate = useNavigate()
    const curUser = Session.getCurUser()

    return (
        <>
            <Header user={curUser} />
            <h1>This will be the regular user dashboard</h1>
            <main>
                <button onClick={() => {window.location.href="/play"}}>Play!</button>
            </main>
        </>
    )
}

export default Dashboard