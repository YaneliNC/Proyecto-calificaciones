import React from "react";
import "./EliminarMateriaComponent.css";

function EliminarMateriaComponent({ materiaId, handleEliminar }) {
    // Función para manejar la eliminación del materia
    const eliminarMateria = () => {
      // Opciones de configuración para la solicitud DELETE
      const settings = {
        method: "DELETE", // Método HTTP
      };
  
      // Realizar la solicitud utilizando fetch
      fetch(`http://localhost:3000/eliminarmaterias/${materiaId}`, settings)
        .then((response) => {
          if (response.ok) {
            console.log("materia eliminada exitosamente.");
            // Puedes añadir aquí lógica adicional después de la eliminación exitosa
            handleEliminar(materiaId); // Llamar a la función handleEliminar con el ID del materia
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
        <button  onClick={eliminarmateria}>Eliminar materia</button>
      </div>
    );
  }
  


export default EliminarMateriaComponent
