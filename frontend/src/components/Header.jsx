import { Session } from "../util/Session";

function Header() {
    const user = Session.getCurUser()

    return (
        <header className="dashboard-header">
            <div className="logo">LOGO</div>
            <nav>
                <span>Welcome {user.lname}, {user.fname}</span>
                <button className="button btn-logout" onClick={() => Session.logout()}>Logout</button>
            </nav>
        </header>
    )
}

export default Header