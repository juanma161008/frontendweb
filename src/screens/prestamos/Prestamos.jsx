import React, { useState, useEffect } from 'react';
import './Prestamos.css'; 
import { useNavigate } from 'react-router-dom';

export default function Prestamos() {
    const [prestamos, setPrestamos] = useState([]);
    const [nuevoPrestamo, setNuevoPrestamo] = useState({
        descripcion: '',
        monto: '',
        fecha: '',
    });

    const navigate = useNavigate();

    // Cargar préstamos desde el backend
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

    // Agregar préstamo al backend
    const agregarPrestamo = async () => {
        try {
            const response = await fetch('http://localhost:3000/prestamos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoPrestamo),
            });

            if (response.ok) {
                const nuevo = await response.json(); // Recibir el préstamo creado desde el backend
                setPrestamos([...prestamos, nuevo]);
                setNuevoPrestamo({ descripcion: '', monto: '', fecha: '' });
            } else {
                console.error('Error al agregar préstamo');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    // Eliminar préstamo del backend
    const eliminarPrestamo = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/prestamos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPrestamos(prestamos.filter((prestamo) => prestamo.id_prestamo !== id));
            } else {
                console.error('Error al eliminar préstamo');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className="prestamos-container">
            <h2>Préstamos</h2>
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
                    type="date"
                    name="fecha"
                    placeholder="Fecha del préstamo"
                    value={nuevoPrestamo.fecha}
                    onChange={handleInputChange}
                />
                <button onClick={agregarPrestamo}>Agregar Préstamo</button>
            </div>
            <table className="prestamos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos.length > 0 ? (
                        prestamos.map((prestamo) => (
                            <tr key={prestamo.id_prestamo}>
                                <td>{prestamo.id_prestamo}</td>
                                <td>{prestamo.descripcion}</td>
                                <td>{prestamo.monto}</td>
                                <td>{prestamo.fecha_solicitud}</td>
                                <td>
                                    <button onClick={() => eliminarPrestamo(prestamo.id_prestamo)}>
                                        Eliminar
                                    </button>
                                </td>
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
