import LoginForm from '../components/LoginForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLoginAttempt = async (id, password) => {
        setError('')
        try {
            const response = await fetch('http://localhost/flashcard_app/backend/api/users/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id, password})
            })

            const data = await response.json()

            if (data.success) {
                console.log("Login success for user id:", data.user_id)
                //TODO: Actually save the returned user_id somewhere to "log in" the user
                //TODO: Check if user is admin or not -> navigate to appropriate dashboards
                //      This would need 'admin' to be passed back to us as well
                navigate('/dashboard')
            } else {
                setError(data.error || 'Login failed.')
            }
        } catch (err) {
            setError('Could not connect to server.')
        }
    }

    return (
        <div className='login-page'>
            <h1>Login With Your HR-Provided Credentials</h1>
            {error && <p className='error-message'>{error}</p>}
            <LoginForm onLogin={handleLoginAttempt} />
        </div>
    )
}

export default Login