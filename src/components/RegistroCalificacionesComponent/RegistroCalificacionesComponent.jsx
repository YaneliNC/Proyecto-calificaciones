import React, { useState, useEffect } from "react";
import "./RegistroCalificacionesComponent.css";

function RegistroCalificacionesComponent() {
    // Estados para los datos del formulario
    const [userId, setUserId] = useState("");
    const [materiaId, setMateriaId] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [materias, setMaterias] = useState([]);

    // Función para cargar usuarios y materias
    useEffect(() => {
        fetch("http://localhost:3000/Usuarios")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error al obtener los usuarios.");
            })
            .then((data) => {
                setUsuarios(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

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

    // Función para manejar el envío del formulario
    const registrarCalificacion = () => {
        const objetoParaBackend = {
            userId: userId,
            materiaId: materiaId,
            calificacion: calificacion
        };

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objetoParaBackend),
        };

        fetch("http://localhost:3000/newcalificacion", settings)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error en la solicitud.");
            })
            .then((data) => {
                console.log("Respuesta:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="wrapper-c">
            <div className="container main-c">
                <div className="row-c">
                    <div className="col-md-6-c right-c">
                        <form>
                        <div className="input-box-c">
                            <header className="header-c">Registrar Calificación</header>
                                <div className="input-field-c">
                                    <select
                                        className="input-c"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar Usuario</option>
                                        {usuarios.map((usuario) => (
                                            <option key={usuario._id} value={usuario._id}>
                                                {usuario.name}
                                            </option>
                                        ))}
                                    </select>
                                    
                                </div>
                                <div className="input-field-c">
                                    <select
                                        className="input-c"
                                        value={materiaId}
                                        onChange={(e) => setMateriaId(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar Materia</option>
                                        {materias.map((materia) => (
                                            <option key={materia._id} value={materia._id}>
                                                {materia.name}
                                            </option>
                                        ))}
                                    </select>
                                    
                                </div>
                                <div className="input-field-c">
                                    <input
                                        type="number"
                                        className="input-c"
                                        name="calificacion"
                                        value={calificacion}
                                        onChange={(e) => setCalificacion(e.target.value)}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        required
                                    />
                                    <label htmlFor="calificacion">Calificación</label>
                                </div>
                                <div className="input-field-c">
                                    <button className="submit-ca" onClick={registrarCalificacion}>
                                        Registrar
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

export default RegistroCalificacionesComponent;
