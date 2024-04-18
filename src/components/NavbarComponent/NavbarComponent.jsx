// NavbarComponent.js
import React, { useState } from 'react';
import styled from 'styled-components';
import BurguerButton from './BurguerButton';
import { IoHomeOutline, IoPeopleOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useAuth } from "../../AuthContext"; 
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoSchoolSharp } from "react-icons/io5";
import './NavbarComponent.css'; 


function NavbarComponent() {
  const { isLoggedIn, name, logout } = useAuth(); // Obtiene el estado de autenticación y el nombre de usuario del contexto
  
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);

  };
  console.log("isLoggedIn:", isLoggedIn); // Verifica el estado de autenticación
  console.log("name:", name); // Verifica el nombre de usuario
  return (
    <>
      <nav>
        <h2>
          <span> AcademYC</span>
        </h2>
        <div className={`links ${clicked ? 'active' : ''}`}>
          <a onClick={handleClick} href="/" > 
            <span className="icon-wrapper">
              <IoHomeOutline className="icon" />
            </span>
            Home
          </a>
          <a onClick={handleClick} href="/usuarios">
            <span className="icon-wrapper">
              <IoPeopleOutline className="icon" />
            </span>
            Alumnos
          </a>
          <a onClick={handleClick} href="/materias"> {/* Nueva ruta /materias */}
            <span className="icon-wrapper">
              <IoDocumentTextOutline className="icon" />
            </span>
            Materias
          </a>
          <a onClick={handleClick} href="/calificaciones"> {/* Nueva ruta /calificaciones */}
            <span className="icon-wrapper">
              <IoSchoolSharp  className="icon" />
            </span>
            Calificaciones
          </a>
          {isLoggedIn ? ( // Verifica si el usuario está autenticado
            <a onClick={logout} href="/"> {/* Agrega la función de cerrar sesión */}
              <span className="icon-wrapper">
                <IoPersonCircleOutline className="icon" />
              </span>
              Sesión iniciada 
            </a>
          ) : (
            <a onClick={handleClick} href="/login">
              <span className="icon-wrapper">
                <IoPersonCircleOutline className="icon" />
              </span>
              Login
            </a>
          )}
        </div>
        <div className="burguer">
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <div className={`bgDiv initial ${clicked ? 'active' : ''}`}></div>
      </nav>
    </>
  );
}

export default NavbarComponent;
