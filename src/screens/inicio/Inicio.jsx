import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logocorto from '../../assets/logocorto.png';
import './Inicio.css';

export default function Inicio() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [scrollTopVisible, setScrollTopVisible] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3000/usuarios'); // Cambia la ruta si es necesario
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };
        fetchUsuarios();
    }, []);

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
                        <li><button onClick={() => navigate('/transacciones')}>Transacciones</button></li>
                        <li><button onClick={() => navigate('/prestamos')}>Préstamos</button></li>
                        <li><button onClick={() => navigate('/reportes')}>Reportes</button></li>
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
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                            <tr key={usuario.numero_cuenta}>
                                <td>{usuario.numero_cuenta}</td>
                                <td>{usuario.tipo}</td>
                                <td>{usuario.saldo}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>No hay datos disponibles</td>
                        </tr>
                    )}
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
