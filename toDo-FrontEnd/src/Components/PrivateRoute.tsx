import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('JwtToken'); // get JWT token from storage

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
