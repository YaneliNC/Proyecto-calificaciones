import React, { useState, useEffect } from "react";
import "./EditarUsuarioComponent.css";

function EditarUsuarioComponent({ usuario }) {
  const usuarioId = usuario._id; // Obtener el ID del usuario de la prop usuario

  // Estados para los campos del formulario
  const [name, setName] = useState(usuario.name || "");
  const [email, setEmail] = useState(usuario.email || "");
  const [password, setPassword] = useState(usuario.password || "");
  const [age, setAge] = useState(usuario.age || "");

  useEffect(() => {
    // No es necesario hacer una solicitud para obtener los datos del usuario
    // ya que los datos están disponibles en la prop usuario
  }, []);

  // Función para manejar la edición del usuario
  const editarUsuario = () => {
    const objetoParaBackend = {
      name,
      email,
      password,
      age,
    };

    // Opciones de configuración para la solicitud PUT
    const settings = {
      method: "PUT", // Método HTTP
      headers: {
        "Content-Type": "application/json", // Tipo de contenido que estás enviando
      },
      body: JSON.stringify(objetoParaBackend), // Convertir el objeto JavaScript a formato JSON
    };

    // Realizar la solicitud utilizando fetch
    fetch(`http://localhost:3000/editarusuarios/${usuarioId}`, settings)
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
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          <div className="col-md-6 right">
            <form>
              <div className="input-box">
                <header className="header">ACTUALIZAR</header>
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Nombre</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    className="input"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                <div className="input-field">
                  <input
                    type="number"
                    className="input"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min={15}
                    max={90}
                    required
                  />
                  <label htmlFor="age">Edad</label>
                </div>
                <div className="input-field">
                  <button className="submit" onClick={editarUsuario}>
                    Guardar
                  </button>
                  {/* No necesitas un botón de cancelar aquí */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarUsuarioComponent;
