import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import './ListadoUsuarioComponent.css';
import { Link } from 'react-router-dom';
import EditarUsuarioComponent from '../EditarUsuarioComponent/EditarUsuarioComponent';

function ListadoUsuarioComponent(props) {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [usuarioIdSeleccionado, setUsuarioIdSeleccionado] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false); // Nuevo estado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/usuarios");
        const jsonData = await response.json();
        setUsuarios(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditar = (usuarioId) => {
    const usuarioSeleccionado = usuarios.find(usuario => usuario._id === usuarioId);
    setUsuarioSeleccionado(usuarioSeleccionado);
    setMostrarEdicion(true);
  };

  const handleEliminar = (usuarioId) => {
    setUsuarioIdSeleccionado(usuarioId); // Almacenar el ID del usuario a eliminar
    setMostrarModalEliminar(true); // Mostrar el modal de confirmación
  };

  const confirmarEliminarUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/eliminarusuarios/${usuarioIdSeleccionado}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Usuario eliminado exitosamente.");
        setUsuarios(usuarios.filter(usuario => usuario._id !== usuarioIdSeleccionado));
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
  };

  return (
    <div>
      <NavbarComponent />
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="App">
          <header className="App-header">
            <h1 className='title'>Alumnos</h1>
          </header>
          
          <div className="table-container table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Contraseña</th>
                  <th>Edad</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario._id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>******</td>
                    <td>{usuario.age}</td>
                    <td><button className="edit-button" onClick={() => handleEditar(usuario._id)}>Editar</button></td>
                    <td><button className="delete-button" onClick={() => handleEliminar(usuario._id)}>Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {mostrarEdicion && (
        <div className="modal-overlay">
          <div className="modal">
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
                  <EditarUsuarioComponent usuario={usuarioSeleccionado} />
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
                    ¿Estás seguro de que quieres eliminar este usuario?
                  </h3>
                </div>
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="delete-button"
                    type="button"
                    onClick={confirmarEliminarUsuario}
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
    </div>
  );
}

export default ListadoUsuarioComponent;
