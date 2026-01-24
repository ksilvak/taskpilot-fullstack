import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
