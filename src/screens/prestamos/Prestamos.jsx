import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Prestamos.css';

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    descripcion: '',
    monto: '',
    plazo: ''
  });
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    const obtenerPrestamos = async () => {
      if (!usuario?.id_usuario) return;

      try {
        const response = await fetch('http://localhost:3000/prestamos', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          },
          body: JSON.stringify({ id_usuario: usuario.id_usuario }),
        });

        if (response.ok) {
          const data = await response.json();
          setPrestamos(data.data || []);
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

    if (!descripcion.trim()) {
      alert("Por favor ingrese una descripción para el préstamo");
      return;
    }
    
    if (!monto || isNaN(monto) || monto <= 0) {
      alert("Ingrese un monto válido (mayor a 0)");
      return;
    }
    
    if (!plazo || isNaN(plazo) || plazo <= 0) {
      alert("Ingrese un plazo válido en meses (mayor a 0)");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/prestamos/crear', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          id_usuario: usuario.id_usuario,
          descripcion: descripcion.trim(),
          monto: parseFloat(monto),
          plazo: parseInt(plazo),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear el préstamo');
      }

      setPrestamos(prev => [data.prestamo, ...prev]);
      setNuevoPrestamo({ descripcion: '', monto: '', plazo: '' });
      setMensajeExito("¡Préstamo solicitado con éxito!");
      setTimeout(() => setMensajeExito(''), 3000);

    } catch (error) {
      console.error("Error al solicitar préstamo:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="prestamos-container">
      <h2>Gestión de Préstamos</h2>

      {mensajeExito && (
        <div className="mensaje-exito">{mensajeExito}</div>
      )}

      <div className="form-container">
        <h3>Solicitar Nuevo Préstamo</h3>
        <input
          type="text"
          name="descripcion"
          placeholder="¿Para qué necesitas el préstamo?"
          value={nuevoPrestamo.descripcion}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="monto"
          placeholder="Monto ($)"
          min="1"
          step="0.01"
          value={nuevoPrestamo.monto}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="plazo"
          placeholder="Plazo (meses)"
          min="1"
          value={nuevoPrestamo.plazo}
          onChange={handleInputChange}
        />
        <button onClick={agregarPrestamo}>Solicitar Préstamo</button>
      </div>

      <div className="prestamos-list">
        <h3>Tus Préstamos</h3>
        
        {prestamos.length === 0 ? (
          <p>No tienes préstamos registrados</p>
        ) : (
          <table className="prestamos-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Plazo</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map(p => (
                <tr key={p.id_prestamo}>
                  <td>{p.descripcion}</td>
                  <td>${p.monto.toLocaleString()}</td>
                  <td>{p.plazo} meses</td>
                  <td>{p.estado}</td>
                  <td>{new Date(p.fecha_solicitud).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <button 
        className="back-button"
        onClick={() => navigate('/inicio')}
      >
        Volver al Inicio
      </button>
    </div>
  );
}