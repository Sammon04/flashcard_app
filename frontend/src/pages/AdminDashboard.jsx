import { Session } from "../util/Session"
import Header from '../components/Header'

function AdminDashboard() {
    console.log(Session.getCurUser())
    return (
        <>
        <Header />
            <h1>This will be the admin (hr) dashboard</h1>
        </>
    )
}

export default AdminDashboard