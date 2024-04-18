import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importa Navigate para redireccionar
import { AuthProvider, useAuth } from './AuthContext'; // Importa el proveedor de autenticación y el hook useAuth
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import RegistroUsuarioComponent from './components/RegistroUsuarioComponent/RegistroUsuarioComponent';
import ListadoUsuarioComponent from './components/ListadoUsuarioComponent/ListadoUsuarioComponent';
import EliminarUsuarioComponent from './components/EliminarUsuarioComponent/EliminarUsuarioComponent';
import ListadoMateriaComponent from './components/ListadoMateriaComponent/ListadoMateriaComponent';
import RegistroMateriaComponent from './components/RegistroMateriaComponent/RegistroMateriaComponent';
import ListadoCalificacionesComponent from './components/ListadoCalificacionesComponent/ListadoCalificacionesComponent';
import RegistroCalificacionesComponent from './components/RegistroCalificacionesComponent/RegistroCalificacionesComponent';
import AlumnoCalificacionesComponent from './components/AlumnoCalificacionesComponent/AlumnoCalificacionesComponent';
import Home from './components/Home/Home';


// Componente de ruta protegida
const PrivateRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth(); // Obtén el estado de autenticación del contexto de autenticación
  return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/login" replace />;
  
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Agrega la vista principal (Home) */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/registro" element={<RegistroUsuarioComponent />} />
          <Route path="/usuarios" element={<ListadoUsuarioComponent />} /> {/* Lista de usuarios */}
          
          <Route path="/materias" element={<ListadoMateriaComponent />} />
          <Route path="/agregar" element={<RegistroMateriaComponent />} />
          
          <Route path="/newcalificaciones" element={<RegistroCalificacionesComponent />} />
          <Route path="/calificaciones" element={<ListadoCalificacionesComponent />} />
          <Route path="/alumnocalificaciones" element={<AlumnoCalificacionesComponent />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

