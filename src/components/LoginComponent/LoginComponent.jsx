import React, { useState } from 'react';
import './LoginComponent.css';
import { useAuth } from "../../AuthContext.jsx";
import { useNavigate } from 'react-router-dom'; 

function LoginComponent() {
    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setname] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const userData = await response.json(); // Suponiendo que el servidor devuelve los datos del usuario
                setname(userData.name); // Establecer el nombre de usuario
                login(name); 
                navigate('/alumnocalificaciones', { replace: true }); 
                window.alert('¡Inicio de sesión exitoso! Bienvenido, ' + name); // Mostrar alerta
            } else {
                const errorData = await response.json();
                if (response.status === 401) {
                    setError('Usuario incorrecto'); // Establecer mensaje de error personalizado
                } else {
                    setError(errorData.error);
                }
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error interno del servidor');
        }
    };

    return (
        <div className="wrapper-login">
            <div className="container main-login">
                <div className="row-login">
                    <div className="col-md-6-login">
                        <div className="image-container-login">
                            <img src="public/img/logoyc.jpg" alt="Logo" />
                        </div>
                    </div>
                    <div className="col-md-6-login right">
                        <form onSubmit={handleSubmit}>
                            <div className="input-box-login">
                                <header className="header-login">INICIAR SESIÓN</header>
                                <div className="input-field-login">
                                    <input type="email" className="input-login" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="off" />
                                    <label htmlFor="email">Correo</label>
                                </div>
                                <div className="input-field-login">
                                    <input type="password" className="input-login" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                                <div className="input-field-login">
                                    <input type="submit" className="submit-login" value="Login" />
                                </div>
                                {error && <div className="error-message">{error}</div>}
                                <div className="signin-login register-link-login">
                                    <span>¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
