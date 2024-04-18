import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import './ListadoMateriaComponent.css';
import { Link } from 'react-router-dom';
import EditarMateriaComponent from '../EditarMateriaComponent/EditarMateriaComponent';
import RegistroMateriaComponent from '../RegistroMateriaComponent/RegistroMateriaComponent'; // Importa el componente de registro de materia

function ListadoMateriaComponent(props) {
  const [materia, setMateria] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [materiaIdSeleccionado, setMateriaIdSeleccionado] = useState(null);
  const [materiaSeleccionado, setMateriaSeleccionado] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false); // Nuevo estado para controlar la visibilidad del modal de agregar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/materias");
        const jsonData = await response.json();
        setMateria(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleEditar = (materiaId) => {
    const materiaSeleccionada = materia.find(materia => materia._id === materiaId);
    setMateriaSeleccionado(materiaSeleccionada);
    setMostrarEdicion(true);
  };
  
  const handleEliminar = (materiaId) => {
    setMateriaIdSeleccionado(materiaId); // Almacenar el ID del materia a eliminar
    setMostrarModalEliminar(true); // Mostrar el modal de confirmación
  };

  const handleAgregar = () => {
    setMostrarModalAgregar(true); // Mostrar el modal de agregar al hacer clic en Agregar
  };

  const confirmarEliminarmateria = async () => {
    try {
      const response = await fetch(`http://localhost:3000/eliminarmaterias/${materiaIdSeleccionado}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("materia eliminado exitosamente.");
        setMateria(materia.filter(materia => materia._id !== materiaIdSeleccionado));
        setMostrarModalEliminar(false); // Cerrar el modal después de eliminar
      } else {
        throw new Error("Error en la solicitud.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setMostrarEdicion(false);
    setMostrarModalEliminar(false); // Cerrar el modal de confirmación
    setMostrarModalAgregar(false); // Cerrar el modal de agregar
  };

  return (
    <div>
    <NavbarComponent />
    {isLoading ? (
      <p>Cargando datos...</p>
    ) : (
      <div className="App-m">
        <header className="App-header-m">
          <h1 className='title-m'>Materias</h1>
        </header>
        <div className="button-container-a">
          <button className="submit-ma" onClick={handleAgregar}>Agregar</button> {/* Cambiado de Link a button */}
        </div>
        <div className="table-container-m table-wrapper-m">
          <table className="table-m">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {materia.map((materia) => (
                <tr key={materia._id}>
                  <td>{materia._id}</td>
                  <td>{materia.name}</td>
                  <td><button className="edit-button-m" onClick={() => handleEditar(materia._id)}>Editar</button></td>
                  <td><button className="delete-button-m" onClick={() => handleEliminar(materia._id)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
    {mostrarEdicion && (
      <div className="modal-overlay-m">
        <div className="modal-m">
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
                {/* Aquí puedes incluir el componente de edición */}
                <EditarMateriaComponent materia={materiaSeleccionado} />
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    )}

    {/* Modal de confirmación para eliminar */}
    {mostrarModalEliminar && (
      <div className="modal-overlay">
        <div className="modal-e">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">
                  ¿Estás seguro de que quieres eliminar este materia?
                </h3>
              </div>
              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="delete-button"
                  type="button"
                  onClick={confirmarEliminarmateria}
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

    {/* Modal para agregar */}
    {mostrarModalAgregar && (
      <div className="modal-overlay">
        <div className="modal-a">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">
                  Agregar Nueva Materia
                </h3>
              </div>
              <div className="relative p-6 flex-auto">
                {/* Aquí puedes incluir el componente de registro de materia */}
                <RegistroMateriaComponent closeModal={closeModal} />
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

export default ListadoMateriaComponent;
