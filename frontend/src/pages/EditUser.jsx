import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import { Session } from "../util/Session"
import UserForm from "../components/UserForm"
import { BASE_URL } from "../config"

function EditUser() {
    const { id } = useParams() //Get id from url
    const [error, setError] = useState("")
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    //Load user data once component mounts
    useEffect(() => {
        const fetchUser = async () => {
            //Try getting user
            try {
                const response = await fetch(`${BASE_URL}/users/get_user.php?id=${encodeURIComponent(id)}`)
                const data = await response.json()

                if (response.ok) {
                    setUserData(data)
                } else {
                    setError(data.error || "Could not find user")
                }
            } catch (err) {
                setError('Could not connect to server.')
                console.error("Fetch error: ", err)
            }
        }
        fetchUser()
    }, [id])


    //Function to call when submitting form
    const handleUpdateUser = async (formData) => {
        setError("")
        try {
            //Attempt update
            const updateResponse = await fetch(`${BASE_URL}/users/update_info.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const updateResult = await updateResponse.json()
            
            //Go back to dashboard on success
            if (updateResult.success) {
                navigate('/admin_dashboard')
            } else {
                setError(updateResult.error || "Failed to update user.")
            }
        } catch (err) {
            setError('Could not connect to server.')
            console.error("Update error: ", err)
        }
    }


    return (
        <>
            <Header user={Session.getCurUser()} />
            <h1>Admin Dashboard</h1>
            <main>
                {error && <p className='error-message'>{error}</p>}
                {/*Render form once we got the user's data*/}
                {userData && (
                    <UserForm
                        onSubmit={handleUpdateUser}
                        initialData={userData}
                        isEdit={true}
                    />
                )}
            </main>
        </>
    )
}

export default EditUser