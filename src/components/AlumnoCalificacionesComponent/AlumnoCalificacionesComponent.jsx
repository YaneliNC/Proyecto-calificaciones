import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import './AlumnoCalificacionesComponent.css';
import { Link } from 'react-router-dom';

function AlumnoCalificacionesComponent(props) {
  const [calificaciones, setCalificaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/calificaciones");
        const jsonData = await response.json();
        setCalificaciones(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Agrupar calificaciones por usuario
  const groupCalificacionesByUsuario = (calificaciones) => {
    const groupedCalificaciones = {};
    calificaciones.forEach((calificacion) => {
      const userName = calificacion.userInfo?.name;
      if (!groupedCalificaciones[userName]) {
        groupedCalificaciones[userName] = [];
      }
      groupedCalificaciones[userName].push(calificacion);
    });
    return groupedCalificaciones;
  };

  const calificacionesPorUsuario = groupCalificacionesByUsuario(calificaciones);

 // Calcular el promedio de calificaciones
const calcularPromedio = (calificaciones) => {
  let suma = 0;
  calificaciones.forEach((calificacion) => {
    suma += calificacion.calificacion;
  });
  const promedio = suma / calificaciones.length;
  return promedio % 1 === 0 ? promedio.toFixed(0) : promedio.toFixed(1); 
};


  return (
    <div>
      <NavbarComponent />
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="App-c">
          <header className="App-header-c">
            <h1 className='title-c'>Calificaciones</h1>
          </header>
          <div className="table-container-c table-wrapper-c">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Ingles</th>
                  <th>Historia</th>
                  <th>Literatura V</th>
                  <th>Promedio</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(calificacionesPorUsuario).map(([userName, userCalificaciones]) => (
                  <tr key={userName}>
                    <td>{userName}</td>
                    <td className={userCalificaciones.find(calificacion => calificacion.matInfo?.name === 'Ingles')?.calificacion < 7 ? 'red' : ''}>{userCalificaciones.find(calificacion => calificacion.matInfo?.name === 'Ingles')?.calificacion || '-'}</td>
                    <td className={userCalificaciones.find(calificacion => calificacion.matInfo?.name === 'Historia')?.calificacion < 7 ? 'red' : ''}>{userCalificaciones.find(calificacion => calificacion.matInfo?.name === 'Historia')?.calificacion || '-'}</td>
                    <td className={userCalificaciones.find(calificacion => calificacion.matInfo?.name === 'Literatura V')?.calificacion < 7 ? 'red' : ''}>{userCalificaciones.find(calificacion => calificacion.matInfo?.name === 'Literatura V')?.calificacion || '-'}</td>
                    <td>{calcularPromedio(userCalificaciones)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlumnoCalificacionesComponent;
