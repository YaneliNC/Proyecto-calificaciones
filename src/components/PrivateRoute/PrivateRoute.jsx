import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth(); // Obtén el estado de autenticación del contexto de autenticación
  return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
