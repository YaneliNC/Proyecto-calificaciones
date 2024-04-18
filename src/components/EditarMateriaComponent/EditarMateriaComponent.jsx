import React, { useState, useEffect } from "react";
import "./EditarMateriaComponent.css";

function EditarMateriaComponent({ materia }) {
  const materiaId = materia._id; // Obtener el ID del materia de la prop materia

  // Estados para los campos del formulario
  const [name, setName] = useState(materia.name || "");
  useEffect(() => {
   
  }, []);


  const editarmateria = () => {
    const objetoParaBackend = {
      name,
    };

    // Opciones de configuración para la solicitud PUT
    const settings = {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(objetoParaBackend), 
    };

    // Realizar la solicitud utilizando fetch
    fetch(`http://localhost:3000/editarmaterias/${materiaId}`, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la solicitud.");
      })
      .then((data) => {
        console.log("Respuesta:", data);
        // Puedes añadir aquí lógica adicional después de la edición exitosa
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="wrapper-materia">
      <div className="container main-materia">
        <div className="row-calificaciones">
          <div className="col-md-6-materia right-materia">
            <form>
              <div className="input-box-materia">
                <header className="header-materia">ACTUALIZAR</header>
                <div className="input-field-materia">
                  <input
                    type="text"
                    className="input-materia"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Nombre</label>
                </div> 
                <div className="input-field-materia">
                  <button className="submit-ca" onClick={editarmateria}>
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarMateriaComponent;
