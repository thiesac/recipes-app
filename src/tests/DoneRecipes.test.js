import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes/DoneRecipes';
import Footer from '../components/Footer/Footer';

describe('testes componente Footer', () => {
  /*
  const mockDrink = {
    id: '1234',
    type: 'drink',
    nationality: 'brasil',
    category: 'abcd',
    alcoholicOrNot: 'alcoholic',
    name: 'nome',
    image: 'imagem',
    doneDate: 'data',
    tags: ['tag1'],
  };

  const mockFood = {
    id: '1234',
    type: 'meal',
    nationality: 'brasil',
    // category: 'abcd',
    // alcoholicOrNot: 'alcoholic',
    name: 'nome',
    image: 'imagem',
    doneDate: 'data',
    // tags: ['tag1'],
  };
*/
  // const allRecipes = [mockDrink, mockFood];

  test('Rota é alterada para /drinks quando o botão é clicado', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );

    // const

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
