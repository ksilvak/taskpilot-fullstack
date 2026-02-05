import Table from '@/components/common/Table/Table';
import { useUser } from '@/hooks/useUser';
import { usePassword } from '@/hooks/usePassword';
import FormTextInput from '@/components/common/Form/FormTextInput';
import Button from '@/components/common/Button';
import { useState, useEffect } from 'react';
import ErrorMessage from '@/components/common/ErrorMessage';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user, updateName } = useUser(token);
  const { changePassword, loading, error } = usePassword(token);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName ?? '');
    setLastName(user.lastName ?? '');
  }, [user]);

  const buttonLabel =
    user?.firstName || user?.lastName ? 'Upravit jméno' : 'Přidat jméno';

  console.log(user);

  return (
    <>
      <Button buttonName="Zpět" onClick={() => navigate('/tasks')} />
      <div>
        <div>
          <div>ID</div>
          <div>role</div>
          <div>email</div>
          <div>jméno a příjmení</div>
          <div>změna hesla</div>
        </div>
        <div>
          <div>{user?.id}</div>
          <div>{user?.role}</div>
          <div>{user?.email}</div>
          <div>
            <FormTextInput
              value={firstName}
              placeholder="Jméno"
              onChange={setFirstName}
            />
            <FormTextInput
              value={lastName}
              placeholder="Příjmení"
              onChange={setLastName}
            />
            <Button
              buttonName={buttonLabel}
              onClick={() => updateName(firstName, lastName)}
            />
          </div>
          <div>
            <FormTextInput
              type="password"
              placeholder="Aktuální heslo"
              value={currentPassword}
              onChange={setCurrentPassword}
            />

            <FormTextInput
              type="password"
              placeholder="Nové heslo"
              value={newPassword}
              onChange={setNewPassword}
            />

            <FormTextInput
              type="password"
              placeholder="Potvrdit nové heslo"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            <Button
              buttonName="Změnit heslo"
              disabled={loading || newPassword !== confirmPassword}
              onClick={() => changePassword(currentPassword, newPassword)}
            />
            {error && <ErrorMessage message={error} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
