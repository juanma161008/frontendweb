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
            const response = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contrasena }),
            });

            const data = await response.json();

            if (response.ok) {
                // ✅ Guardar directamente los datos del usuario desde la respuesta
                localStorage.setItem('usuario', JSON.stringify(data.user));
                navigate('/Inicio');
            } else {
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error(error);
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
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={contrasena}
                            onChange={(e) => setPassword(e.target.value)}
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
