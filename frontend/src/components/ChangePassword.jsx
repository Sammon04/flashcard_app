import { useState } from "react"
import { BASE_URL } from "../config"


function ChangePassword({ user_id }) {
    const [passwords, setPasswords] = useState({ old_password: "", new_password: "" })
    const [status, setStatus] = useState({ msg: "", isError: false })
    
    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value })
    }

    //Function to call when submitting update password form
    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        setStatus({ msg: "", isError: false })

        try {
            //Try updating password
            const response = await fetch(`${BASE_URL}/users/update_password.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: user_id,
                    old_password: passwords.old_password,
                    new_password: passwords.new_password
                })
            })
            const data = await response.json()

            if (data.success) {
                setStatus({ msg: "Password updated successfully", isError: false })
                setPasswords({ old_password: "", new_password: "" }) //Clear form
            } else {
                setStatus({ msg: data.error || "Update failed", isError: true })
            }
        } catch (err) {
            setStatus({ msg: "Could not connect to server.", isError: true })
        }
    }


    return (
        <>
            <h3>Change Password</h3>
            {status.msg && (
                <p className={(status.isError) ? "error-message" : "success-message"}>{status.msg}</p>
            )}
            <form onSubmit={handleUpdatePassword}>
                <section>
                    <label>Old Password:</label>
                    <input type="text" name="old_password" value={passwords.old_password} onChange={handleChange} required/>
                </section>
                <section>
                    <label>New Password:</label>
                    <input type="text" name="new_password" value={passwords.new_password} onChange={handleChange} required/>
                </section>
                <button type="submit" className="button btn-update-password">Update Password</button>
            </form>
        </>
    )
}

export default ChangePassword