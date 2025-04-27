import { render, screen, fireEvent } from '@testing-library/react';
import Prestamos from './Prestamos';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('Pantalla de Prestamos', () => {
  beforeAll(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renderiza campos de formulario', () => {
    render(
      <BrowserRouter>
        <Prestamos />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Descripción del préstamo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Monto del préstamo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Plazo del préstamo (en meses)')).toBeInTheDocument();
  });

  it('muestra alerta si el formulario se envía vacío', () => {
    render(
      <BrowserRouter>
        <Prestamos />
      </BrowserRouter>
    );

    const boton = screen.getByRole('button', { name: /Solicitar Préstamo/i });
    fireEvent.click(boton);

    expect(window.alert).toHaveBeenCalled();
  });
});
