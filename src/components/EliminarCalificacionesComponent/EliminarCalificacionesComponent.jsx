  import React from "react";
  import "./EliminarCalificacionesComponent.css";

  function EliminarCalificacionesComponent({ calificacionesId, handleEliminar }) {
      // Función para manejar la eliminación del Calificacion
      const eliminarCalificacion = () => {
        // Opciones de configuración para la solicitud DELETE
        const settings = {
          method: "DELETE", // Método HTTP
        };
    
        // Realizar la solicitud utilizando fetch
        fetch(`http://localhost:3000/eliminarcalificacion/${calificacionesId}`, settings)
          .then((response) => {
            if (response.ok) {
              console.log("Calificacion eliminado exitosamente.");
              // Puedes añadir aquí lógica adicional después de la eliminación exitosa
              handleEliminar(calificacionesId); // Llamar a la función handleEliminar con el ID del Calificacion
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
          <button  onClick={eliminarCalificacion}>Eliminar Calificacion</button>
        </div>
      );
    }
    


  export default EliminarCalificacionesComponent
