import LoginForm from '../components/LoginForm'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Session } from '../util/Session'

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
            const response = await fetch('http://localhost/flashcard_app/backend/api/users/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id, password})
            })

            const successData = await response.json()

            if (successData.success) {
                try {
                    const response = await fetch(`http://localhost/flashcard_app/backend/api/users/get_user.php?id=${encodeURIComponent(id)}`)

                    const data = await response.json()
                    console.log(data)
                    if (data) {
                        Session.setUser(data)
                        navigate(data.admin ? '/admin_dashboard' : '/dashboard')
                    } else {
                        setError(data.error || 'User info fetch failed.')
                    }
                } catch (err) {
                    setError('Could not connect to server.')
                }
            } else {
                setError(successData.error || 'Login failed.')
            }
        } catch (err) {
            setError('Could not connect to server.')
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