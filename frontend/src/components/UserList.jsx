import UserListItem from "./UserListItem"

function UserList({ userList, onEdit, onDelete }) {
    

    return (
        <table className="user-list">
            <thead>
                <tr>
                    {/*Show limited information here. Full information will be on edit page*/}
                    <th>Name</th>
                    <th>Role</th>
                    <th>District</th>
                    <th>Locale</th>
                    <th>Score</th>
                    {/*Buttons like Edit or Delete*/}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((user) => (
                    <UserListItem key={user.user_id} user={user} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    )    
}

export default UserList