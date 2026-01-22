import UserRow from "./UserRow";
import { User } from "../../types/user";


type UsersTableProps = {
    users: User[],
    onDelete: (userId: number) => void,
}

function UsersTable ({users, onDelete}: UsersTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Akce</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <UserRow
                        key={user.id}
                        user={user}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default UsersTable;
