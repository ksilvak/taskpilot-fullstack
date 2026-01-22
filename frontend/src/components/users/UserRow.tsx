import { User } from "../../types/user";

type UserRowProps = {
    user: User,
    onDelete: (userId: number) => void,
}

function UserRow ({user, onDelete}: UserRowProps) {

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
