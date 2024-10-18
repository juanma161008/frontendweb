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

    useEffect(() => {
        const prestamosIniciales = [
            { id: 1, descripcion: 'Préstamo Personal', monto: 5000, fecha: '2024-09-15' },
            { id: 2, descripcion: 'Préstamo Hipotecario', monto: 20000, fecha: '2024-09-25' },
        ];
        setPrestamos(prestamosIniciales);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoPrestamo({
            ...nuevoPrestamo,
            [name]: value,
        });
    };

    const agregarPrestamo = () => {
        const nuevo = {
            id: prestamos.length + 1,
            ...nuevoPrestamo,
            monto: parseFloat(nuevoPrestamo.monto),
            fecha: nuevoPrestamo.fecha,
        };
        setPrestamos([...prestamos, nuevo]);
        setNuevoPrestamo({ descripcion: '', monto: '', fecha: '' });
    };

    const eliminarPrestamo = (id) => {
        const nuevosPrestamos = prestamos.filter(p => p.id !== id);
        setPrestamos(nuevosPrestamos);
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
                            <tr key={prestamo.id}>
                                <td>{prestamo.id}</td>
                                <td>{prestamo.descripcion}</td>
                                <td>{prestamo.monto}</td>
                                <td>{prestamo.fecha}</td>
                                <td>
                                    <button onClick={() => eliminarPrestamo(prestamo.id)}>
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
            <button className="back-button" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
    );
}
