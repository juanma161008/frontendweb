import React, { useState, useEffect } from 'react';
import './reportes.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
            const imgWidth = 190; // Ancho de la imagen en mm
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.setFontSize(16);
            pdf.text("Estebanquito", 105, 20, null, null, 'center'); centro
            pdf.setFontSize(12);
            pdf.text("Este es tu reporte financiero", 105, 30, null, null, 'center'); 

            let position = 40; 
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

            pdf.save("reporte_bancario.pdf");
        });
    };

    return (
        <div className="reportes-container">
            <h2>Reporte de Estado Financiero</h2>
            <div id="reporte-pdf" style={{ padding: '20px', backgroundColor: '#fff', color: '#000' }}>
                <h3>Resumen de Transacciones</h3>
                <table className="reportes-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Reporte</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Usuario</th>
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
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.historico_ingresos}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.historico_egresos}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{reporte.deudas}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No hay reportes disponibles</td>
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
