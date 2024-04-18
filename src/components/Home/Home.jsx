import React from 'react';
import { IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp } from 'react-icons/io5'; // Importa los iconos de React Icons
import './Home.css';
import { Link } from 'react-router-dom';
function Home() {
  
  return (
    <div className="home-page">
      {/* Espacio para el navbar */}
      <div className="navbar-space"></div>

      {/* Sección de Misión y Mapa */}
      <div className="mission-mp-section">
        {/* Misión */}
        <div className="card mission-section">
          <h2 style={{ color: '#672f9a' }}>Misión</h2>
          <div className="mission-content">
            <p>
              Ser una universidad que forme personas mediante el desarrollo de conocimientos y habilidades técnicas para potenciar su crecimiento y contribuir así, al progreso de toda la región sureste del país.
            </p>
          </div>
        </div>

        {/* Imagen del Mapa */}
        <div className="map-image">
          <img src="public/img/mapa.jpg" alt="Mapa de la escuela" />
        </div>
      </div>

      {/* Espacio entre secciones */}
      <div className="section-space"></div>

      
{/* Redes Sociales */}
<div className="card social-media-section ">
          <h2 style={{ color: '#672f9a' }}>Consultar mis calificaciones</h2>
          <p>AcademYC</p>
          <Link to="/alumnocalificaciones">
          <button className="consult-button" style={{ backgroundColor: '#d6bcf6' }}>Consultar</button>
        </Link>
        </div>
        
        
      {/* Sección de Valores */}
      <div className="values-vision-section">
        {/* Valores */}
        <div className="card values-section up">
          <h2 style={{ color: '#672f9a' }}>Valores</h2>
          <div className="values-content">
            <ul>
              <li>*Innovación</li>
              <li>*Autonomía</li>
              <li>*Empatía</li>
              <li>*Transparencia</li>
              <li>*Respeto</li>
            </ul>
          </div>
          
        </div>


        
      </div>
      <div className="values-vision-section">
       

        {/* Visión */}
        <div className="card vision-section mov">
          <h2 style={{ color: '#672f9a' }}>Visión</h2>
          <div className="vision-content">
            <p>
              Aspiramos a ser reconocidos como líderes en la formación académica, asegurando el respaldo y reconocimiento de las habilidades de nuestros estudiantes mediante certificaciones confiables.
            </p>
          </div>
        </div>

        
      </div>

      {/* Espacio entre secciones */}
      <div className="section-space"></div>

      {/* Imagen del salón y descripción */}
      <div className="schedule-section">
        <div className="schedule-description card">
        <h2 style={{ color: '#672f9a' }}>AcademYC</h2>
          <p>
          <IoLogoFacebook className="icon" />
            <IoLogoInstagram className="icon" />
            <IoLogoWhatsapp className="icon" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
