import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import './ListadoCalificacionesComponent.css';
import { Link } from 'react-router-dom';
import EditarCalificacionesComponent from '../EditarCalificacionesComponent/EditarCalificacionesComponent';
import RegistroCalificacionesComponent from '../RegistroCalificacionesComponent/RegistroCalificacionesComponent'; 
import EliminarCalificacionesComponent from '../EliminarCalificacionesComponent/EliminarCalificacionesComponent';

function ListadoCalificacionesComponent(props) {
  const [calificaciones, setCalificaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [calificacionIdSeleccionada, setCalificacionIdSeleccionada] = useState(null);
  const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false); 
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Obtiene las calificaciones y las materias desde el backend
      const [calificacionesResponse, materiasResponse] = await Promise.all([
        fetch("http://localhost:3000/calificaciones"),
        fetch("http://localhost:3000/materias")
      ]);
      
      const [calificacionesData, materiasData] = await Promise.all([
        calificacionesResponse.json(),
        materiasResponse.json()
      ]);

      // Actualiza el estado con las calificaciones y las materias
      setCalificaciones(calificacionesData);
      setMaterias(materiasData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

  const handleEditar = (calificacionId) => {
    const califSeleccionada = calificaciones.find(calificacion => calificacion.ca_id == calificacionId);
    setCalificacionSeleccionada(califSeleccionada);
    setMostrarEdicion(true);
  };
  const handleAgregar = () => {
    setMostrarModalAgregar(true);
  };
  
  const handleEliminar = (calificacionId) => {
    setCalificacionIdSeleccionada(calificacionId);
    setMostrarModalEliminar(true);
  };
  
  
  const confirmarEliminarCalificacion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/eliminarcalificacion/${calificacionIdSeleccionada}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Calificacion eliminada exitosamente.");
          setCalificaciones(calificaciones.filter(calificacion => calificacion._id !== calificacionIdSeleccionada));
          setMostrarModalEliminar(false); 
        } else {
          throw new Error("Error en la solicitud.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };
  
  const closeModal = () => {
      setMostrarEdicion(false);
      setMostrarModalEliminar(false); 
      setMostrarModalAgregar(false); 
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
          <div className="button-container-a">
          <button className="submit-ma" onClick={handleAgregar}>Agregar</button>
        </div>
          <div className="table-container-c table-wrapper-c">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Materia</th>
                  <th>Calificación</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {calificaciones.map((calificacion) => (
  <tr key={calificacion._id}>
    <td>{calificacion.ca_id}</td>
    <td>{calificacion.userInfo?.name}</td>
    <td>{calificacion.matInfo?.name}</td>
    <td>{calificacion.calificacion}</td>
    <td><button className="edit-button-c" onClick={() => handleEditar(calificacion.ca_id)}>Editar</button></td>
    <td><button className="delete-button-c" onClick={() => handleEliminar(calificacion.ca_id)}>Eliminar</button></td>
  </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>
      )}
      {mostrarEdicion && (
        <div className="modal-overlay-c">
          <div className="modal-c">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                 
                  <EditarCalificacionesComponent calif={calificacionSeleccionada} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
  
      
      {mostrarModalEliminar && (
        <div className="modal-overlay">
          <div className="modal-c">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold">
                    ¿Estás seguro de que quieres eliminar esta calificación?
                  </h3>
                </div>
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="delete-button"
                    type="button"
                    onClick={confirmarEliminarCalificacion}
                  >
                    Eliminar
                  </button>
                  <button
                    className="submit-e"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
  
      {mostrarModalAgregar && (
        <div className="modal-overlay">
          <div className="modal-c">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
               <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
              
                  <RegistroCalificacionesComponent closeModal={closeModal} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
    </div>
  );
      }
  
  export default ListadoCalificacionesComponent;
  