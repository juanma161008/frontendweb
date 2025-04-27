import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Reportes from './Reportes';
import { vi } from 'vitest';

// Mock de jspdf
vi.mock('jspdf', () => {
  class MockJSPDF {
    constructor() {
      this.internal = { pageSize: { height: 297 } };
    }
    addImage = vi.fn();
    setFontSize = vi.fn();
    text = vi.fn();
    save = vi.fn();
  }
  return { default: MockJSPDF };
});

// Mock de html2canvas
vi.mock('html2canvas', () => ({
  default: vi.fn(() => Promise.resolve({
    toDataURL: () => 'data:image/png;base64,fakeImageData'
  }))
}));

describe('Pantalla de Reportes', () => {
  beforeEach(() => {
    // Mock de localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => JSON.stringify({ id_usuario: 1 })),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });

    // Mock de fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id_reporte: 1,
              id_usuario: 1,
              nombre: 'Juan Perez',
              email: 'juan@example.com',
              numero_cuenta: '1234567890',
              tipo: 'Corriente',
              historico_ingresos: 10000,
              historico_egresos: 5000,
              deudas: 2000
            }
          ])
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza el título del reporte', async () => {
    render(
      <BrowserRouter>
        <Reportes />
      </BrowserRouter>
    );

    expect(await screen.findByText('Reporte de Estado Financiero')).toBeInTheDocument();
  });

  it('muestra datos del reporte si fetch es exitoso', async () => {
    render(
      <BrowserRouter>
        <Reportes />
      </BrowserRouter>
    );

    expect(await screen.findByText('Juan Perez')).toBeInTheDocument();
    expect(screen.getByText('juan@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });

  it('genera el PDF al hacer clic en el botón', async () => {
    const { container } = render(
      <BrowserRouter>
        <Reportes />
      </BrowserRouter>
    );

    const botonPDF = await screen.findByRole('button', { name: /Generar PDF/i });
    fireEvent.click(botonPDF);

    await waitFor(() => {
      expect(container.querySelector('#reporte-pdf')).toBeTruthy();
    });
  });

  it('navega al inicio cuando se presiona el botón Volver', async () => {
    render(
      <BrowserRouter>
        <Reportes />
      </BrowserRouter>
    );

    const botonVolver = await screen.findByRole('button', { name: /Volver al Inicio/i });
    expect(botonVolver).toBeInTheDocument();
  });
});
