import { Session } from "../util/Session"
import Header from '../components/Header'

function Dashboard() {
    const navigate = useNavigate()
    const curUser = Session.getCurUser()

    return (
        <>
        <Header />
            <h1>This will be the regular user dashboard</h1>
        </>
    )
}

export default Dashboard