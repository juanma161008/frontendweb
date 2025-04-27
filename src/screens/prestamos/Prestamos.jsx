import React, { useState, useEffect } from 'react';
import './Prestamos.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    descripcion: '',
    monto: '',
    plazo: '',
  });
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    const obtenerPrestamos = async () => {
      if (!usuario?.id_usuario) return;

      try {
        // Usamos axios para hacer la petición GET
        const response = await axios.post('http://localhost:3000/prestamos', {
          id_usuario: usuario.id_usuario,
        });

        if (response.status === 200) {
          setPrestamos(response.data);
        } else {
          console.error('Error al cargar préstamos');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    obtenerPrestamos();
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPrestamo(prev => ({ ...prev, [name]: value }));
  };

  const agregarPrestamo = async () => {
    const { descripcion, monto, plazo } = nuevoPrestamo;

    if (!descripcion.trim() || isNaN(monto) || isNaN(plazo) || monto <= 0 || plazo <= 0) {
      alert("Verifica los campos. Todos deben estar completos y válidos.");
      return;
    }

    try {
      // Usamos axios para hacer la petición POST
      const response = await axios.post('http://localhost:3000/prestamos/crear', {
        id_usuario: usuario.id_usuario,
        descripcion: descripcion.trim(),
        monto: parseFloat(monto),
        plazo: parseInt(plazo),
      });

      if (response.status === 200) {
        const nuevo = response.data;
        setPrestamos(prev => [...prev, nuevo]); // ✅ Agrega sin sobrescribir
        setNuevoPrestamo({ descripcion: '', monto: '', plazo: '' });
        setMensajeExito("¡Préstamo solicitado con éxito!");
        setTimeout(() => setMensajeExito(''), 3000);
      } else {
        const errorData = await response.data;
        throw new Error(errorData.message || 'Error al crear el préstamo');
      }

    } catch (error) {
      console.error("Error al solicitar préstamo:", error);
      alert(`Error: ${error.message}`);
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
            <th>Fecha de Solicitud</th>
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
                <td>{new Date(p.fecha_solicitud).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No hay préstamos disponibles</td>
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
