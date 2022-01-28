import {Navigate, Outlet} from 'react-router-dom';

const AdminAuthRoute = ({currentUser}) => {
  const userDetails = currentUser?.details;
  const isAdmin = userDetails?.is_admin;
  return isAdmin ? <Outlet/> : <Navigate replace to={`/app/${userDetails?.username}/projects`} />;
};

export default AdminAuthRoute;
