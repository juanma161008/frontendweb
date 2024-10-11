// screens/main/Main.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logocorto from '../../assets/logocorto.png'; 
import banner from '../../assets/banner.png'; 
import happyday from '../../assets/happyday.png'; 
import banner2 from '../../assets/banner2.png'; 
import './Main.css';

export default function Main() {
    const navigate = useNavigate();
    const [scrollTopVisible, setScrollTopVisible] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    const toggleScrollTopButton = () => {
        if (window.scrollY > 300) {
            setScrollTopVisible(true);
        } else {
            setScrollTopVisible(false);
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.body.offsetHeight;

        if (scrollPosition >= documentHeight) {
            setShowFooter(true);
        } else {
            setShowFooter(false);
        }
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
        <div className="main-container">
            <header className="header">
                <img src={logo} alt="Logo" className="logo" />
                <nav className="navbar">
                    <input type="text" className="search-bar" placeholder="Buscar..." />
                    <button className="button" onClick={() => navigate('/Login')}>Iniciar sesión</button>
                </nav>
            </header>
            <div className="content">
                <div className="banner-container">
                    <img src={banner} alt="Banner" className="banner" />
                </div>
                <div className="info-container">
                    <div className="left-column">
                        <img src={happyday} alt="Happy Day" className="happyday" />
                    </div>
                    <div className="right-column">
                        <p>En el Día Mundial del Banco, en Estebanquito celebramos nuestra misión de ser un pilar en el crecimiento y desarrollo de nuestra comunidad. Nuestro compromiso es ofrecerte soluciones financieras que se adapten a tus necesidades, promoviendo la inclusión y la sostenibilidad.</p>
                        <p>Agradecemos a nuestros clientes, colaboradores y socios por su confianza y apoyo constante. Juntos, seguimos construyendo un futuro más próspero para todos. ¡Feliz Día Mundial del Banco!</p>
                        <p>— Banco Estebanquito</p>
                    </div>
                </div>
                <div className="banner-container">
                    <img src={banner2} alt="Banner 2" className="banner2" />
                </div>
                <div style={{ height: '1500px' }}></div> 
            </div>
            {scrollTopVisible && (
                <button className="scroll-top" onClick={scrollToTop}>↑</button>
            )}
            {showFooter && (
                <footer className="footer">
                    <img src={logocorto} alt="Logo Corto" className="footer-logo" />
                    <p> 2024 Derechos reservados</p>
                </footer>
            )}
        </div>
    );
}