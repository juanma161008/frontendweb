// screens/login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; 
import logocorto from '../../assets/logocorto.png'; 
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setUsuario] = useState('');
    const [contrasena, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', { // Cambiado al endpoint /login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contrasena }), // Cuerpo con los campos email y contrasena
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Si la respuesta es exitosa, redirige al usuario
                navigate('/Inicio');
            } else {
                // Si las credenciales son incorrectas, muestra un error
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            setError('Hubo un problema con la conexión');
        }
    };

    return (
        <div>
            <header className="header">
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <div className="main-container">
                <div className="login-container">
                    <div className="login-card">
                        <h2>Inicio de sesión</h2>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setUsuario(e.target.value)} // Cambié "setUsuario" para claridad
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={contrasena}
                            onChange={(e) => setPassword(e.target.value)} // Cambié "setPassword" para claridad
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button className="button" onClick={handleLogin}>Iniciar sesión</button>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <img src={logocorto} alt="Logo Corto" className="footer-logo" />
                <p>2024 Derechos reservados</p>
            </footer>
        </div>
    );
}

export default Login;
