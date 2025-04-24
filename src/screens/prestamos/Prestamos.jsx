import React, { useState, useEffect } from 'react';
import './Prestamos.css';
import { useNavigate } from 'react-router-dom';

export default function Prestamos() {
    const [prestamos, setPrestamos] = useState([]);
    const [nuevoPrestamo, setNuevoPrestamo] = useState({
        descripcion: '',
        monto: '',
        plazo: '',
    });
    const [mensajeExito, setMensajeExito] = useState('');
    const navigate = useNavigate();

    // Recupera el usuario autenticado (guardado en el login)
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Al montar, carga sólo los préstamos de este usuario
    useEffect(() => {
        const obtenerPrestamos = async () => {
            if (!usuario?.id_usuario) return;

            try {
                const response = await fetch('http://localhost:3000/prestamos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_usuario: usuario.id_usuario }),
                });

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
    }, [usuario]);

    // Maneja cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoPrestamo(prev => ({ ...prev, [name]: value }));
    };

    // Solicita un nuevo préstamo
    const agregarPrestamo = async () => {
        const { descripcion, monto, plazo } = nuevoPrestamo;
        if (!descripcion || !monto || !plazo) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/prestamos/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_usuario: usuario.id_usuario,
                    descripcion,
                    monto,
                    plazo,
                }),
            });

            if (response.ok) {
                const creado = await response.json();
                setPrestamos(prev => [...prev, creado]);
                setNuevoPrestamo({ descripcion: '', monto: '', plazo: '' });
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
                        prestamos.map(p => (
                            <tr key={p.id_prestamo}>
                                <td>{p.id_prestamo}</td>
                                <td>{p.descripcion}</td>
                                <td>{p.monto}</td>
                                <td>{p.plazo}</td>
                                <td>{p.estado}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                No hay préstamos disponibles
                            </td>
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
