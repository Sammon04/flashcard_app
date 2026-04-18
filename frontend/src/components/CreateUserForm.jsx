import { useState } from "react"

function CreateUserForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        fname: "",
        lname: "",
        role: "",
        district: "",
        locale: "",
        wildcard: "",
        image: ""
    })

    //Change corresponding formData value
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value}))
    }

    //Call passed down submit function
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="from create-user-form">
            <section>
                <label>ID:</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} required/>
            </section>
            <section>
                <label>Password:</label>
                <input type="text" name="password" value={formData.password} onChange={handleChange} required/>
            </section>
            <section>
                <label>First Name:</label>
                <input type="text" name="fname" value={formData.fname} onChange={handleChange} required/>
            </section>
            <section>
                <label>Last Name:</label>
                <input type="text" name="lname" value={formData.lname} onChange={handleChange} required/>
            </section>
            <section>
                <label>Role:</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange}/>
            </section>
            <section>
                <label>District:</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange}/>
            </section>
            <section>
                <label>Locale:</label>
                <input type="text" name="locale" value={formData.locale} onChange={handleChange}/>
            </section>
            <section>
                <label>Wildcard:</label>
                <input type="text" name="wildcard" value={formData.wildcard} onChange={handleChange}/>
            </section>
            <section>
                <label>image:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange}/>
            </section>
            <button className="button btn-create-user">Create</button>
            <button className="button btn-cancel" onClick={() => window.history.back()}>Cancel</button>
        </form>
    )
}

export default CreateUserForm