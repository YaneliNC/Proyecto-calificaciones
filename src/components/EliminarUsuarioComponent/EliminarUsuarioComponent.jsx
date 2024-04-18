import React from "react";
import "./EliminarUsuarioComponent.css";

function EliminarUsuarioComponent({ usuarioId, handleEliminar }) {
    // Función para manejar la eliminación del usuario
    const eliminarUsuario = () => {
      // Opciones de configuración para la solicitud DELETE
      const settings = {
        method: "DELETE", // Método HTTP
      };
  
      // Realizar la solicitud utilizando fetch
      fetch(`http://localhost:3000/eliminarusuarios/${usuarioId}`, settings)
        .then((response) => {
          if (response.ok) {
            console.log("Usuario eliminado exitosamente.");
            // Puedes añadir aquí lógica adicional después de la eliminación exitosa
            handleEliminar(usuarioId); // Llamar a la función handleEliminar con el ID del usuario
          } else {
            throw new Error("Error en la solicitud.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
    return (
      <div>
        <button  onClick={eliminarUsuario}>Eliminar Usuario</button>
      </div>
    );
  }
  


export default EliminarUsuarioComponent
