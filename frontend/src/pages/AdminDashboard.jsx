import { Session } from "../util/Session"
import Header from '../components/Header'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import UserList from "../components/UserList"

function AdminDashboard() {
    //TEMP LIST FOR TESTING PURPOSES - To replace with actual list of all users + ALL their info
    let tempUserList = [
        {
            "user_id": "998",
            "fname": "Test1",
            "lname": "User1",
            "role": "Role1",
            "district": "Dist1",
            "locale": "Locale1"
        },
        {
            "user_id": "999",
            "fname": "Test2",
            "lname": "User2",
            "role": "Role2",
            "district": "Dist2",
            "locale": "Locale2"
        }
    ]

    const editUser = (id) => {
        console.log(`This will move to EditUser.jsx page for user_id: ${id}`)
    }

    const deleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            console.log(`This will call delete.php for user_id: ${id}`)
        }
    }

    const navigate = useNavigate()
    const curUser = Session.getCurUser()


    return (
        <>
            <Header />
            <h1>This will be the admin (hr) dashboard</h1>
            <main>
                {(tempUserList.length > 0) ? (
                    <UserList userList={tempUserList} onEdit={editUser} onDelete={deleteUser}/>
                ) : (
                    <p className="empty-message">No users found in the system.</p>
                )}
            </main>
        </>
    )
}

export default AdminDashboard