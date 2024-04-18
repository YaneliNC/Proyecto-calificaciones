import React, { useState } from "react";
import "./RegistroUsuarioComponent.css"; // Reutiliza el mismo archivo de estilos CSS

function RegistroUsuarioComponent() {
    // Estados para los datos del formulario
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");

    // Función para manejar el envío del formulario
    const registrarUsuario = () => {
        if (password.length < 6) {
            // Contraseña no cumple con el requisito mínimo
            const synth = window.speechSynthesis;
            const text = "Tu contraseña debe tener al menos 6 caracteres. Por favor, corrígelo.";
            const utterThis = new SpeechSynthesisUtterance(text);
            utterThis.lang = "es-ES";
            synth.speak(utterThis);
            return; // Detener el proceso de registro
        }

        const objetoParaBackend = {
            name: name,
            email: email,
            password: password,
            age: age,
        };

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objetoParaBackend),
        };

        fetch("http://localhost:3000/newusuario", settings)
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
        <div className="wrapper-registro">
            <div className="container main-registro">
                <div className="row-registro">
                    <div className="col-md-6-registro">
                        <div className="image-container-registro">
                            <img src="public/img/logoyc.jpg" alt="Logo" />
                        </div>
                    </div>
                    <div className="col-md-6-registro right-registro">
                        <form>
                            <div className="input-box-registro">
                                <header className="header-registro">REGISTRO</header>
                                <div className="input-field-registro">
                                    <input
                                        type="text"
                                        className="input-registro"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="name">Nombre</label>
                                </div>
                                <div className="input-field-registro">
                                    <input
                                        type="text"
                                        className="input-registro"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field-registro">
                                    <input
                                        type="password"
                                        className="input-registro"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                                <div className="input-field-registro">
                                    <input
                                        type="number"
                                        className="input-registro"
                                        name="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        min={15}
                                        max={90}
                                        required
                                    />
                                    <label htmlFor="age">Edad</label>
                                </div>
                                <div className="input-field-registro">
                                    <button className="submit-registro" onClick={registrarUsuario}>
                                        Registrar
                                    </button>
                                </div>
                                <div className="signin-registro register-link">
                                    <span>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroUsuarioComponent;
