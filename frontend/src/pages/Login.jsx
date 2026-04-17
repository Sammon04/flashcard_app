import LoginForm from '../components/LoginForm'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Session } from '../util/Session'
import { BASE_URL } from '../config'

function Login() {
    const [error, setError] = useState('')
    const navigate = useNavigate()

    //Send user to appropriate dashboard if they're already logged in
    useEffect(() => {        
        if (Session.isLoggedIn()) {
            const userData = Session.getCurUser()
            navigate((userData.admin) ? "/admin_dashboard" : "/dashboard")
        }
    }, [navigate])

    //Function to call when user clicks login button
    const handleLoginAttempt = async (id, password) => {
        setError('')
        try {
            //Attempt login
            const loginResponse = await fetch(`${BASE_URL}/users/login.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id, password})
            })
            const loginData = await loginResponse.json()

            //Login did not return success code
            if (!loginResponse.ok) {
                setError(loginData.error || 'Login Failed')
                return;
            }

            //Get full user data to save to Session
            const userResponse = await fetch(`${BASE_URL}/users/get_user.php?id=${encodeURIComponent(id)}`)
            const userData = await userResponse.json()

            //Save user data and redirect to appropriate dashboard
            if (userResponse.ok) {
                Session.setUser(userData)
                navigate(userData.admin ? '/admin_dashboard' : '/dashboard')
            } else { //User response did not return success code 
                setError(userData.error || 'User info fetch failed.')
            }
        } catch (err) {
            setError('Could not connect to server.')
            console.error("Login error: ", err)
        }
    }

    return (
        <main className='login-page'>
            <h1>Login With Your HR-Provided Credentials</h1>
            {error && <p className='error-message'>{error}</p>}
            <LoginForm onLogin={handleLoginAttempt} />
        </main>
    )
}

export default Login