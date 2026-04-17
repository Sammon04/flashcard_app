import { Session } from "../util/Session"
import Header from '../components/Header'
import { useEffect, useState } from "react"
import UserList from "../components/UserList"
import { BASE_URL } from '../config'

function AdminDashboard() {
    const [userList, setUserList] = useState([])
    const [error, setError] = useState('')
    const curUser = Session.getCurUser()

    //Load user list once component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const listResponse = await fetch(`${BASE_URL}/users/list_users.php`)
                const data = await listResponse.json()
                
                if (listResponse.ok) {
                    setUserList(data)
                } else {
                    setError(data.error || 'Failed to load users.')
                }
            } catch (err) {
                setError('Could not connect to server.')
                console.error("Fetch error: ", err)
            }
        }
        fetchUsers()
    }, [])

    //Function to call when edit button is clicked on a user
    const editUser = (id) => {
        console.log(`This will move to EditUser.jsx page for user_id: ${id}`)
    }

    //Function to call when delete button is clicked on a user
    const deleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            console.log(`This will call delete.php for user_id: ${id}`)
        }
    }

    return (
        <>
            <Header user={curUser} />
            <h1>This will be the admin (hr) dashboard</h1>
            <main>
                {/*Show list if there are users to show, otherwise show empty message*/}
                {(userList.length > 0) ? (
                    <UserList userList={userList} onEdit={editUser} onDelete={deleteUser}/>
                ) : (
                    <p className="empty-message">No users found in the system.</p>
                )}
                {/*Show any error message from the server*/}
                {error && <p className='error-message'>{error}</p>}
            </main>
        </>
    )
}

export default AdminDashboard