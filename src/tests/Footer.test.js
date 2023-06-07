import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

describe('testes componente Footer', () => {
  test('Rota é alterada para /drinks quando o botão é clicado', () => {
    const mockHistory = jest.fn();
    jest.mock('react-router-dom', () => ({
      useHistory: () => ({ push: mockHistory }),
    }));

    render(
      <Router>
        <Footer />
      </Router>,
    );

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksBtn);

    expect(mockHistory).toHaveBeenCalledWith('/drinks');
  });

  test('Rota é alterada para /meals quando o botão é clicado', () => {
    const mockHistory = jest.fn();
    jest.mock('react-router-dom', () => ({
      useHistory: () => ({ push: mockHistory }),
    }));

    render(
      <Router>
        <Footer />
      </Router>,
    );

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    fireEvent.click(mealsBtn);

    expect(mockHistory).toHaveBeenCalledWith('/meals');
  });
});
