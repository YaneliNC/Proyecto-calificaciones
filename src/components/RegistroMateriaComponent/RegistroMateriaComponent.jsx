import React, { useState } from "react";
import "./RegistroMateriaComponent.css"; // Reutiliza el mismo archivo de estilos CSS

function RegistroMateriaComponent() {
    // Estados para los datos del formulario
    const [name, getName] = useState("");

    // Función para manejar el envío del formulario
    const registrarMateria = () => {
        const objetoParaBackend = {
            name: name,
        };

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objetoParaBackend),
        };

        fetch("http://localhost:3000/newmaterias", settings)
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
        <div className="wrapper-materia">
            <div className="container main-materia">
                <div className="row-materia">
                    <div className="col-md-6-materia right-materia">
                        <form>
                        <div className="input-box-materia">
                            <header className="header-materia">Registrar Materia</header>
                                <div className="input-field-materia">
                                    <input
                                        type="text"
                                        className="input-materia"
                                        name="name"
                                        value={name}
                                        onChange={(e) => getName(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="name">Nombre</label>
                                </div>
                               
                                <div className="input-field-materia">
                                    <button className="submit-materia" onClick={registrarMateria}>
                                        Registrar
                                    </button>
                                </div>
                                <div className="input-field-materia">
                                <button className="submit-materia">
                                        <a href="/materias">Cancelar</a>
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

export default RegistroMateriaComponent;
