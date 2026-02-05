import React from 'react';
import Button from '../Button';

type UserMenuItemProps = {
  childrenName: React.ReactNode;
  childrenIcon: React.ReactNode;
  onClick: () => void;
};

function UserMenuItem({
  childrenIcon,
  childrenName,
  onClick,
}: UserMenuItemProps) {
  return (
    <Button
      onClick={onClick}
      buttonName={
        <>
          {childrenIcon}
          {childrenName}
        </>
      }
    />
  );
}

export default UserMenuItem;
