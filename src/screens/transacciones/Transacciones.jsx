import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './transacciones.css';

export default function Transacciones() {
    const [transacciones, setTransacciones] = useState([]);
    const [nuevaTransaccion, setNuevaTransaccion] = useState({ monto: '', fecha: '' });
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        const obtenerTransacciones = async () => {
            try {
                const response = await fetch('http://localhost:3000/transacciones/usuario', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_usuario: usuario.id_usuario }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setTransacciones(data);
                } else {
                    console.error('Error al cargar transacciones');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        if (usuario) {
            obtenerTransacciones();
        }
    }, [usuario]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaTransaccion({
            ...nuevaTransaccion,
            [name]: value,
        });
    };

    const agregarTransaccion = async () => {
        try {
            const response = await fetch('http://localhost:3000/transacciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...nuevaTransaccion,
                    id_usuario: usuario.id_usuario,
                }),
            });

            if (response.ok) {
                const nueva = await response.json();
                setTransacciones([...transacciones, nueva]);
                setNuevaTransaccion({ monto: '', fecha: '' });
            } else {
                console.error('Error al agregar transacción');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className="transacciones-container">
            <h2>Transacciones</h2>
            <div className="form-container">
                <input
                    type="number"
                    name="monto"
                    placeholder="Monto (positivo para depósito, negativo para retiro)"
                    value={nuevaTransaccion.monto}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="fecha"
                    placeholder="Fecha"
                    value={nuevaTransaccion.fecha}
                    onChange={handleInputChange}
                />
                <button onClick={agregarTransaccion}>Agregar Transacción</button>
            </div>
            <table className="transacciones-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {transacciones.length > 0 ? (
                        transacciones.map((transaccion) => (
                            <tr key={transaccion.id_transaccion}>
                                <td>{transaccion.id_transaccion}</td>
                                <td>{transaccion.tipo_transaccion}</td>
                                <td>{transaccion.monto}</td>
                                <td>{new Date(transaccion.fecha).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No hay transacciones disponibles</td>
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
