import { useAuth } from '../../context/authContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const { auth } = useAuth();
  return auth?.user ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
