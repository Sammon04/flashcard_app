import { Session } from "../util/Session"
import Header from '../components/Header'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function AdminDashboard() {
    const navigate = useNavigate()
    const curUser = Session.getCurUser()


    return (
        <>
        <Header />
            <h1>This will be the admin (hr) dashboard</h1>
        </>
    )
}

export default AdminDashboard