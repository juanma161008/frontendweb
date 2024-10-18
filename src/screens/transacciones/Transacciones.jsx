import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './transacciones.css'; 

export default function Transacciones() {
    const [transacciones, setTransacciones] = useState([]);
    const [nuevaTransaccion, setNuevaTransaccion] = useState({
        tipo: '',
        monto: '',
        fecha: '',
    });
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        const transaccionesIniciales = [
            { id: 1, tipo: 'Ingreso', monto: 1000, fecha: '2024-10-01' },
            { id: 2, tipo: 'Egreso', monto: -500, fecha: '2024-10-05' },
            { id: 3, tipo: 'Ingreso', monto: 200, fecha: '2024-10-10' },
        ];
        setTransacciones(transaccionesIniciales);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaTransaccion({
            ...nuevaTransaccion,
            [name]: value,
        });
    };

    const agregarTransaccion = () => {
        const nueva = {
            id: transacciones.length + 1,
            ...nuevaTransaccion,
            monto: parseFloat(nuevaTransaccion.monto),
            fecha: nuevaTransaccion.fecha,
        };
        setTransacciones([...transacciones, nueva]);
        setNuevaTransaccion({ tipo: '', monto: '', fecha: '' });
    };

    const eliminarTransaccion = (id) => {
        const nuevasTransacciones = transacciones.filter(t => t.id !== id);
        setTransacciones(nuevasTransacciones);
    };

    return (
        <div className="transacciones-container">
            <h2>Transacciones</h2>
            <div className="form-container">
                <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo (Ingreso/Egreso)"
                    value={nuevaTransaccion.tipo}
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
                            <tr key={transaccion.id}>
                                <td>{transaccion.id}</td>
                                <td>{transaccion.tipo}</td>
                                <td>{transaccion.monto}</td>
                                <td>{transaccion.fecha}</td>
                                <td>
                                    <button onClick={() => eliminarTransaccion(transaccion.id)}>
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

            {/* Botón para volver al inicio */}
            <button className="volver-inicio" onClick={() => navigate('/')}>
                Volver al Inicio
            </button>
        </div>
    );
}
