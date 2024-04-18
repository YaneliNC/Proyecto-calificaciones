import React, { useState, useEffect } from "react";
import "./EditarCalificacionesComponent.css";

function EditarCalificacionesComponent({ calif }) {
  const [materiaName, setMateriaName] = useState(calif.matInfo ? calif.matInfo.name : "");
  const [calificacionValue, setCalificacionValue] = useState(calif.calificacion || "");
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    // Aquí puedes realizar una solicitud al servidor para obtener la lista de materias
    // Por ejemplo:
    fetch("http://localhost:3000/materias")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener las materias.");
      })
      .then((data) => {
        setMaterias(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const editarCalificacion = () => {
    const materiaSeleccionada = materias.find((materia) => materia.name === materiaName);
    const objetoParaBackend = {
      materiaId: materiaSeleccionada._id,
      calificacion: calificacionValue,
    };

    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objetoParaBackend),
    };

    fetch(`http://localhost:3000/editarcalificacion/${calif.ca_id}`, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la solicitud.");
      })
      .then((data) => {
        console.log("Respuesta:", data);
        // Aquí podrías actualizar el estado o hacer alguna otra acción
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="wrapper-calificaciones">
      <div className="container main-calificaciones">
        <div className="row-calificaciones">
          <div className="col-md-6 right-calificaciones">
            <form>
              <div className="input-box-calificaciones">
                <header className="header-calificaciones">ACTUALIZAR CALIFICACIÓN</header>
                <div className="input-field-calificaciones">
                  <select
                    className="input-calificaciones"
                    value={materiaName}
                    onChange={(e) => setMateriaName(e.target.value)}
                    required
                  >
                    {materias.map((materia) => (
                      <option key={materia._id} value={materia.name}>
                        {materia.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="materiaName">Nombre de la materia</label>
                </div>
                <div className="input-field-calificaciones">
                  <input
                    type="number"
                    className="input-calificaciones"
                    name="calificacion"
                    value={calificacionValue}
                    onChange={(e) => setCalificacionValue(e.target.value)}
                    min={0}
                    max={10}
                    step={0.1}
                    required
                  />
                  <label htmlFor="calificacion">Calificación</label>
                </div>
                <div className="input-field">
                  <button className="submit-calificaciones" onClick={editarCalificacion}>
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

export default EditarCalificacionesComponent;
