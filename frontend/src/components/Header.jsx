import { Session } from "../util/Session";

function Header({ user, headerTitle }) {
    return (
        <header className="dashboard-header">
            {/* <div className="logo">LOGO</div> */}
            <nav>
                <span>Welcome {user.lname}, {user.fname}</span>
                <button className="button btn-logout" onClick={() => Session.logout()}>Logout</button>
            </nav>
            <h1>{headerTitle}</h1>
        </header>
    )
}

export default Header