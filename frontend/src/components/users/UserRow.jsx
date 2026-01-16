function UserRow ({user, onDelete}) {

    return (
        <tr>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                {user.role !== 'admin' && (
                <button onClick={() => onDelete(user.id)}>
                    Smazat
                </button>
                )}
            </td>
        </tr>
    );

}

export default UserRow
