import { Settings, LogOut, UserCog } from 'lucide-react';
import type { User } from '@/types/user';
import styles from '@/styles/components/UserMenu.module.scss';
import UserMenuItem from './UserMenuItem';

type UserMenuProps = {
  user: User | null;
  handleLogout: () => void;
  onAdminClick: () => void;
  onSettingsClick: () => void;
};

function UserMenu({
  user,
  handleLogout,
  onAdminClick,
  onSettingsClick,
}: UserMenuProps) {
  const userName =
    user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : user?.firstName || user?.lastName || user?.email;

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.nameWrapper}>
        <div>{userName}</div>
        {user?.role === 'admin' && (
          <div className={styles.adminWrapper}>[Admin]</div>
        )}
      </div>
      <div className={styles.menuButtonsWrapper}>
        <UserMenuItem
          onClick={onSettingsClick}
          childrenIcon={<Settings size={16} />}
          childrenName="Nastavení"
        />
        {user?.role === 'admin' && (
          <UserMenuItem
            onClick={onAdminClick}
            childrenIcon={<UserCog size={16} />}
            childrenName="Admin - spáva uživatelů"
          />
        )}
        <UserMenuItem
          onClick={handleLogout}
          childrenIcon={<LogOut size={16} />}
          childrenName="Odhlásit"
        />
      </div>
    </div>
  );
}

export default UserMenu;
