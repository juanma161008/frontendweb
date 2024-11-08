import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './transacciones.css'; 

export default function Transacciones() {
    const [transacciones, setTransacciones] = useState([]);
    const [nuevaTransaccion, setNuevaTransaccion] = useState({
        tipo_transaccion: '',
        monto: '',
        fecha: '',
    });
    const navigate = useNavigate(); 

    useEffect(() => {
        const obtenerTransacciones = async () => {
            try {
                const response = await fetch('http://localhost:3000/transacciones');
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
        obtenerTransacciones();
    }, []);

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
                body: JSON.stringify(nuevaTransaccion),
            });

            if (response.ok) {
                const nueva = await response.json();
                setTransacciones([...transacciones, nueva]);
                setNuevaTransaccion({ tipo_transaccion: '', monto: '', fecha: '' });
            } else {
                console.error('Error al agregar transacción');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const eliminarTransaccion = async (id_transaccion) => {
        try {
            const response = await fetch(`http://localhost:3000/transacciones/${id_transaccion}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setTransacciones(transacciones.filter((transaccion) => transaccion.id_transaccion !== id_transaccion));
            } else {
                console.error('Error al eliminar transacción');
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
                    type="text"
                    name="tipo_transaccion"
                    placeholder="Tipo (Ingreso/Egreso)"
                    value={nuevaTransaccion.tipo_transaccion}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="monto"
                    placeholder="Monto"
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {transacciones.length > 0 ? (
                        transacciones.map((transaccion) => (
                            <tr key={transaccion.id_transaccion}>
                                <td>{transaccion.id_transaccion}</td>
                                <td>{transaccion.tipo_transaccion}</td>
                                <td>{transaccion.monto}</td>
                                <td>{transaccion.fecha}</td>
                                <td>
                                    <button onClick={() => eliminarTransaccion(transaccion.id_transaccion)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No hay transacciones disponibles</td>
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
