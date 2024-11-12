import React, { useState, useEffect } from 'react';
import './Prestamos.css'; 
import { useNavigate } from 'react-router-dom';

export default function Prestamos() {
    const [prestamos, setPrestamos] = useState([]);
    const [nuevoPrestamo, setNuevoPrestamo] = useState({
        descripcion: '',
        monto: '',
        plazo: '',
        estado: '',
    });
    const [mensajeExito, setMensajeExito] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPrestamos = async () => {
            try {
                const response = await fetch('http://localhost:3000/prestamos');
                if (response.ok) {
                    const data = await response.json();
                    setPrestamos(data);
                } else {
                    console.error('Error al cargar préstamos');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };
        obtenerPrestamos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoPrestamo({
            ...nuevoPrestamo,
            [name]: value,
        });
    };

    const agregarPrestamo = async () => {
        if (!nuevoPrestamo.descripcion || !nuevoPrestamo.monto || !nuevoPrestamo.plazo) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        
        try {
            const response = await fetch('http://localhost:3000/prestamos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoPrestamo),
            });

            if (response.ok) {
                const nuevo = await response.json();
                setPrestamos([...prestamos, nuevo]); 
                setNuevoPrestamo({ descripcion: '', monto: '', plazo: '', estado: '' });     
                setMensajeExito("Préstamo solicitado exitosamente!");
                setTimeout(() => setMensajeExito(''), 3000);
            } else {
                console.error('Error al solicitar préstamo');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
    
    return (
        <div className="prestamos-container">
            <h2>Préstamos</h2>
            
            {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
            
            <div className="form-container">
                <input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción del préstamo"
                    value={nuevoPrestamo.descripcion}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="monto"
                    placeholder="Monto del préstamo"
                    value={nuevoPrestamo.monto}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="plazo"
                    placeholder="Plazo del préstamo (en meses)"
                    value={nuevoPrestamo.plazo}
                    onChange={handleInputChange}
                />
                <button onClick={agregarPrestamo}>Solicitar Préstamo</button>
            </div>

            <table className="prestamos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th>Plazo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos.length > 0 ? (
                        prestamos.map((prestamo) => (
                            <tr key={prestamo.id_prestamo}>
                                <td>{prestamo.id_prestamo}</td>
                                <td>{prestamo.descripcion}</td>
                                <td>{prestamo.monto}</td>
                                <td>{prestamo.plazo}</td>
                                <td>{prestamo.estado}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No hay préstamos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            <button className="volver-inicio" onClick={() => navigate('/inicio')}>
                Volver al Inicio
            </button>
        </div>
    );
}
