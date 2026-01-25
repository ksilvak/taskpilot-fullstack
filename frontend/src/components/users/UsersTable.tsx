import UserRow from './UserRow';
import Table from '../common/Table/Table';
import { User } from '../../types/user';

type UsersTableProps = {
  users: User[];
  onDelete: (userId: number) => void;
};

function UsersTable({ users, onDelete }: UsersTableProps) {
  return (
    <Table columns={['Email', 'Role', 'Akce']}>
        {users.map((user) => (
          <UserRow key={user.id} user={user} onDelete={onDelete} />
        ))}
    </Table>
  );
}

export default UsersTable;
