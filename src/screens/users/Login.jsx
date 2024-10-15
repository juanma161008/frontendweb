// screens/login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; 
import logocorto from '../../assets/logocorto.png'; 
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

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
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button" onClick={() => navigate('/Inicio')}>Iniciar sesión</button>
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

