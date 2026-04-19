
function UserListItem({ user, onEdit, onDelete }) {
    return (
        <tr className="user-list-item">
            <td>{user.lname}, {user.fname}</td>
            <td>{user.role}</td>
            <td>{user.department}</td>
            <td>{user.location}</td>
            <td>{user.score}</td>
            <td>
                <button className="button btn-edit-user" onClick={() => onEdit(user.user_id)}>Edit</button>
                <button className="button btn-delete-user" onClick={() => onDelete(user.user_id)}>Delete</button>
            </td>
        </tr>
    )
}

export default UserListItem