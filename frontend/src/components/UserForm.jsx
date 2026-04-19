import { useState } from "react"

function UserForm({ onSubmit, initialData = {}, isEdit = false }) {
    //Initialize form data with initalData if it exists, otherwise empty
    const [formData, setFormData] = useState({
        id: initialData.user_id || "",
        fname: initialData.fname || "",
        lname: initialData.lname || "",
        role: initialData.role || "",
        district: initialData.district || "",
        locale: initialData.locale || "",
        wildcard: initialData.wildcard || "",
        image: initialData.image || "",
        password: ""
    })

    //Change corresponding formData value
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value}))
    }

    //Call passed down submit function and clear form if successful (and not editing)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await onSubmit(formData)

        if (success && !isEdit) {
            emptyFormData()
        }
    }

    const emptyFormData = () => {
        setFormData({
            id: "",
            fname: "",
            lname: "",
            role: "",
            district: "",
            locale: "",
            wildcard: "",
            image: "",
            password: ""
        })
    }

    return (
        <>
            <h3>{(isEdit) ? `Editing User: ${formData.id}` : "Create User"}</h3>
            <form onSubmit={handleSubmit} className="form user-form">
                {/*Only show id and password if in create mode*/}
                {!isEdit && (
                    <>
                        <section>
                            <label>ID:</label>
                            <input type="text" name="id" value={formData.id} onChange={handleChange} required/>
                        </section>
                        <section>
                            <label>Password:</label>
                            <input type="text" name="password" value={formData.password} onChange={handleChange} required/>
                        </section>
                    </>
                )}

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
                <button type="submit" className="button btn-submit-user-form">{(isEdit) ? "Save" : "Create"}</button>
                <button type="button" className="button btn-cancel" onClick={() => (isEdit) ? window.history.back() : emptyFormData()}>Cancel</button>
            </form>
        </>
    )
}

export default UserForm