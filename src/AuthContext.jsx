// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Creamos un componente proveedor para envolver la aplicación y proporcionar el contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setname] = useState('');

  const login = (name) => {
    // Almacena el nombre de usuario y establece el estado de inicio de sesión en verdadero
    setname(name);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Limpia el nombre de usuario y establece el estado de inicio de sesión en falso
    setname('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Creamos un hook personalizado para usar el contexto de autenticación en componentes
export const useAuth = () => useContext(AuthContext);
