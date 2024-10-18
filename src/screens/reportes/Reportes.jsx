import React from 'react';
import './reportes.css';
import { useNavigate } from 'react-router-dom';

export default function Reportes() {
    const navigate = useNavigate();

    return (
        <div className="reportes-container">
            <h2>Reportes</h2>
            <p>Aquí puedes ver los reportes generados.</p>
            
            {/* Botón para volver al inicio */}
            <button className="back-button" onClick={() => navigate('/inicio')}>
                Volver al Inicio
            </button>
        </div>
    );
}
