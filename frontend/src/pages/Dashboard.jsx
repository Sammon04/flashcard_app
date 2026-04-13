import { Session } from "../util/Session"
import Header from '../components/Header'

function Dashboard() {
    console.log(Session.getCurUser())
    return (
        <>
        <Header />
            <h1>This will be the regular user dashboard</h1>
        </>
    )
}

export default Dashboard