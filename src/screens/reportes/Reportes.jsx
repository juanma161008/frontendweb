import React, { useState, useEffect } from 'react';
import './reportes.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from "../../assets/logo.png";

export default function Reportes() {
    const [reportes, setReportes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerReportes = async () => {
            try {
                const response = await fetch('http://localhost:3000/reportes');
                if (response.ok) {
                    const data = await response.json();
                    console.log("Datos recibidos de la API:", data);
                    setReportes(data);
                } else {
                    console.error('Error al cargar reportes');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };
        obtenerReportes();
    }, []);

    const generarPDF = () => {
        const input = document.getElementById('reporte-pdf');

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; 
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Agrega el logo al PDF
            const logoWidth = 40; 
            const logoHeight = 20;
            pdf.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight);

            pdf.setFontSize(16);
            pdf.text("Estebanquito", 105, 40, null, null, 'center');
            pdf.setFontSize(12);
            pdf.text("Este es tu reporte financiero", 105, 50, null, null, 'center');

            let position = 60; 
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

            pdf.save("reporte_bancario.pdf");
        });
    };

    return (
        <div className="reportes-container">
            <h2>Reporte de Estado Financiero</h2>
            <div id="reporte-pdf" style={{ padding: '20px', backgroundColor: '#fff', color: '#000' }}>
                {reportes.length > 0 && (
                    <div>
                        <h3>Estimado(a) {reportes[0].nombre},</h3>
                        <p>
                            Nos complace presentarle su reporte financiero detallado, el cual proporciona una visión completa de sus
                            transacciones recientes y su situación actual en nuestra plataforma.
                        </p>
                        <h3>Resumen de Transacciones</h3>
                        <p>
                            Este informe incluye un desglose de sus transacciones en los últimos periodos, incluyendo el historial de ingresos y 
                            egresos en sus cuentas. A continuación, encontrará una tabla detallada de sus operaciones financieras.
                        </p>
                    </div>
                )}
                <table className="reportes-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Reporte</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Usuario</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Número de Cuenta</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tipo de Cuenta</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Histórico Ingreso</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Histórico Egresos</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Deudas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportes.length > 0 ? (
                            reportes.map((reporte) => (
                                <tr key={reporte.id_reporte}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.id_reporte}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.id_usuario}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.nombre}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.email}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.numero_cuenta}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.tipo}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.historico_ingresos}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.historico_egresos}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.deudas}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>No hay reportes disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button onClick={generarPDF} className="pdf-button">Generar PDF</button>
            <button className="back-button" onClick={() => navigate('/inicio')}>
                Volver al Inicio
            </button>
        </div>
    );
}
