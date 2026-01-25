import { User } from '../../types/user';
import Button from '../common/Button';


type UserRowProps = {
  user: User;
  onDelete: (userId: number) => void;
};

function UserRow({ user, onDelete }: UserRowProps) {
  return (
    <tr>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        {user.role !== 'admin' && (
          <Button buttonName='Smazat' onClick={() => onDelete(user.id)}/>
        )}
      </td>
    </tr>
  );
}

export default UserRow;
