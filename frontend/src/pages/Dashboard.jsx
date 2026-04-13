import { Session } from "../util/Session"

function Dashboard() {
    console.log(Session.getCurUser())

    return <h1>This will be the regular user dashboard</h1>
}

export default Dashboard