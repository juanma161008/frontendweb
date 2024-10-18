import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logocorto from '../../assets/logocorto.png'; 
import './Inicio.css'; 

export default function Inicio() {
    const navigate = useNavigate();
    const [scrollTopVisible, setScrollTopVisible] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    const toggleScrollTopButton = () => {
        setScrollTopVisible(window.scrollY > 300);
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.body.offsetHeight;
        setShowFooter(scrollPosition >= documentHeight);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleScrollTopButton);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', toggleScrollTopButton);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="inicio-container">
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <ul className="menu">
                        <li>
                            <button onClick={() => navigate('/transacciones')}>Transacciones</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/prestamos')}>Préstamos</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/reportes')}>Reportes</button>
                        </li>
                    </ul>
                </div>
            </header>
            {scrollTopVisible && (
                <button className="scroll-top" onClick={scrollToTop}>↑</button>
            )}
            <h2>Cuentas</h2>
            <table className="account-table">
                <thead>
                    <tr>
                        <th>Número de Cuenta</th>
                        <th>Tipo de Cuenta</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3" style={{ textAlign: 'center' }}>No hay datos disponibles</td>
                    </tr>
                </tbody>
            </table>
            {showFooter && (
                <footer className="footer">
                    <img src={logocorto} alt="Logo Corto" className="footer-logo" />
                    <p>2024 Derechos reservados</p>
                </footer>
            )}
        </div>
    );
}
