import { useState } from "react"

function LoginForm({onLogin}) {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin(id, password) //Pass data back up to Login.jsx
    }

    return (
        <form onSubmit={handleSubmit} className="form login-form">
            <section>
                <label>ID:</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
            </section>
            <section>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </section>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm