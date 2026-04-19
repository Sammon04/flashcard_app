import { Session } from "../util/Session"
import Header from '../components/Header'
import { useEffect, useState } from "react"
import UserList from "../components/UserList"
import { BASE_URL } from '../config'
import { useNavigate } from "react-router-dom"
import UserForm from "../components/UserForm"
import FakeAd from "../components/FakeAd"

function AdminDashboard() {
    const [userList, setUserList] = useState([])
    const [error, setError] = useState('')
    const curUser = Session.getCurUser()
    const navigate = useNavigate()

    //Function to get users from db
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

    //Load user list once component mounts
    useEffect(() => {
        fetchUsers()
    }, [])

    //Function to call when edit button is clicked on a user
    const editUser = (id) => {
        navigate(`/edit_user/${id}`)
    }

    //Function to call when delete button is clicked on a user
    const deleteUser = async (id) => {
        //Confirm first
        if (window.confirm("Are you sure you want to delete this user?")) {
            //Try deleting user
            try {
                const deleteResponse = await fetch(`${BASE_URL}/users/delete.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({id})
                })
                const deleteData = await deleteResponse.json()

                if (deleteData.success) {
                    //Also remove user from userList so reload the UserList component
                    setUserList(prevUserList => prevUserList.filter(user => user.user_id !== id))
                } else {
                    setError(deleteData.error || 'Delete user failed.')
                }
            } catch (err) {
                setError('Could not connect to server.')
                console.error("Delete error: ", err)
            }
        }
    }

    //Function to call when submitting form
    const handleCreateUser = async (formData) => {
        setError("")
        try {
            //Attempt register
            const registerResponse = await fetch(`${BASE_URL}/users/register.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const registerResult = await registerResponse.json()
            
            //Go back to dashboard on success
            if (registerResult.success) {
                await fetchUsers()
                return true
            } else {
                setError(registerResult.error || "Failed to create user.")
                return false
            }
        } catch (err) {
            setError('Could not connect to server.')
            console.error("Register error: ", err)
            return false
        }
    }

    return (
        <>
            <Header user={curUser} />
            <h1>Admin Dashboard</h1>
            <div className="threeColumns">
                <div className="leftColumn">
                    <UserForm onSubmit={handleCreateUser}/>
                </div>
                <main className="admin-dashboard-container">
                    {/*Show any error message from the server*/}
                    {error && <p className='error-message'>{error}</p>}

                    <section>
                        {/*Show list if there are users to show, otherwise show empty message*/}
                        {(userList.length > 0) ? (
                            <UserList userList={userList} onEdit={editUser} onDelete={deleteUser}/>
                        ) : (
                            <p className="empty-message">No users found in the system.</p>
                        )}
                    </section>
                </main>
                <div className="rightColumn"><FakeAd/></div>
            </div>
        </>
    )
}

export default AdminDashboard