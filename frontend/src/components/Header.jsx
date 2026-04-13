import { Session } from "../util/Session";
import Button from "./Button";

function Header() {
    const user = Session.getCurUser()

    return (
        <header className="dashboard-header">
            <div className="logo">LOGO</div>
            <nav>
                <span>Welcome, {user.lname}, {user.fname}</span>
                <Button className="logout" onClick={() => Session.logout()} text="Logout"/>
            </nav>
        </header>
    )
}

export default Header