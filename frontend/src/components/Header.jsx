import { Session } from "../util/Session";
import { useNavigate } from "react-router-dom"

function Header({ user, headerTitle }) {

    var additionalNavButtons = ""
    if (user.admin) {
        additionalNavButtons = <div>
            <button onClick={() => navigate("/dashboard")}>Player Dashboard</button>
            <button onClick={() => navigate("/admin_dashboard")}>Admin Dashboard</button>
        </div>
    }


    const navigate = useNavigate()

    return (
        <header className="dashboard-header">
            {/* <div className="logo">LOGO</div> */}
            <nav>
                <div>
                    <span>Welcome {user.lname}, {user.fname}</span>
                    <button className="button btn-logout" onClick={() => Session.logout()}>Logout</button>
                </div>
                {additionalNavButtons}
            </nav>
            <h1>{headerTitle}</h1>
        </header>
    )
}

export default Header