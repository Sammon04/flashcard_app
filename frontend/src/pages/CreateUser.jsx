// import { useState } from "react"
// import { useNavigate } from 'react-router-dom'
// import UserForm from "../components/UserForm"
// import { BASE_URL } from '../config'
// import Header from "../components/Header"
// import { Session } from "../util/Session"

// function CreateUser() {
//     const [error, setError] = useState("")
//     const navigate = useNavigate()

//     //Function to call when submitting form
//     const handleCreateUser = async (formData) => {
//         setError("")
//         try {
//             //Attempt register
//             const registerResponse = await fetch(`${BASE_URL}/users/register.php`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json'},
//                 body: JSON.stringify(formData)
//             })
//             const registerResult = await registerResponse.json()
            
//             //Go back to dashboard on success
//             if (registerResult.success) {
//                 navigate('/admin_dashboard')
//             } else {
//                 setError(registerResult.error || "Failed to create user.")
//             }
//         } catch (err) {
//             setError('Could not connect to server.')
//             console.error("Register error: ", err)
//         }
//     }

//     return (
//         <>
//             <Header user={Session.getCurUser()} />
//             <h1>Create User</h1>
//             <main>
//                 {/*Show error message if there is one to show*/}
//                 {error && <p className='error-message'>{error}</p>}
//                 <UserForm onSubmit={handleCreateUser}/>
//             </main>
//         </>
//     )
// }

// export default CreateUser