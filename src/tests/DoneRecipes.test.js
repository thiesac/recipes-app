import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes/DoneRecipes';
import renderWithRouter from '../helpers/renderWithRouter';

describe('DoneRecipes', () => {
  const mockDrink = 'Mock Drink';
  const nameTest = '0-horizontal-name';
  const mockDate = '2023-06-15';
  const alcoholMock = 'Non-Alcoholic';
  const secondNameMock = '1-horizontal-name';
  const shareBtn = '0-horizontal-share-btn';
  const doneDate2 = '2023-06-16';

  jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
  }));

  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  test('renderiza o título da página', () => {
    renderWithRouter(<DoneRecipes />);
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });

  test('renderiza os cards corretamente', () => {
    const mockDoneRecipes = [
      {
        id: '1',
        type: 'drink',
        name: mockDrink,
        image: 'drink.jpg',
        doneDate: mockDate,
        alcoholicOrNot: alcoholMock,
      },
      {
        id: '2',
        type: 'meal',
        name: 'Mock Meal',
        image: 'meal.jpg',
        doneDate: doneDate2,
        nationality: 'Italian',
        category: 'Pasta',
        tags: ['tag1', 'tag2'],
      },
    ];
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockDoneRecipes));

    renderWithRouter(<DoneRecipes />);

    expect(screen.getByTestId(nameTest)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId(shareBtn)).toBeInTheDocument();
    expect(screen.getByTestId(secondNameMock)).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
  });

  test('copia para a área de transferencia/botão de compartilhar', async () => {
    renderWithRouter(<DoneRecipes />);
    const mockDetailsLink = '/drinks/1';
    const mockDoneRecipes = [
      {
        id: '1',
        type: 'drink',
        name: mockDrink,
        image: 'drink.jpg',
        doneDate: mockDate,
        alcoholicOrNot: alcoholMock,
      },
    ];
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockDoneRecipes));

    navigator.clipboard.writeText = jest.fn().mockResolvedValue();

    fireEvent.click(screen.getByTestId(shareBtn));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockDetailsLink);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  test('botões de filtro', () => {
    const mockDoneRecipes = [
      {
        id: '1',
        type: 'drink',
        name: mockDrink,
        image: 'drink.jpg',
        doneDate: mockDate,
        alcoholicOrNot: alcoholMock,
      },
      {
        id: '2',
        type: 'meal',
        name: 'Mock Meal',
        image: 'meal.jpg',
        doneDate: doneDate2,
        nationality: 'Italian',
        category: 'Pasta',
        tags: ['tag1', 'tag2'],
      },
    ];
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockDoneRecipes));

    renderWithRouter(<DoneRecipes />);

    expect(screen.getByTestId(nameTest)).toBeInTheDocument();
    expect(screen.getByTestId(secondNameMock)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-meal-btn'));

    expect(screen.getByTestId(nameTest)).toBeInTheDocument();
    expect(screen.queryByTestId(secondNameMock)).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-drink-btn'));

    expect(screen.getByTestId(nameTest)).toBeInTheDocument();
    expect(screen.queryByTestId(secondNameMock)).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-all-btn'));

    expect(screen.getByTestId(secondNameMock)).toBeInTheDocument();
    expect(screen.getByTestId(nameTest)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(shareBtn));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test('botões de filtro22', () => {
    const mockDoneRecipes = [
      {
        id: '1',
        type: 'drink',
        name: mockDrink,
        image: 'drink.jpg',
        doneDate: mockDate,
        alcoholicOrNot: alcoholMock,
      },
      {
        id: '2',
        type: 'meal',
        name: 'Mock Meal',
        image: 'meal.jpg',
        doneDate: doneDate2,
        nationality: 'Italian',
        category: 'Pasta',
        tags: ['tag1', 'tag2'],
      },
    ];
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockDoneRecipes));

    renderWithRouter(<DoneRecipes />);

    fireEvent.click(screen.getByTestId('filter-by-meal-btn'));

    fireEvent.click(screen.getByTestId(shareBtn));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test('sei la', () => {
    renderWithRouter(<DoneRecipes />);

    const textElement = screen.getByText('Nenhuma receita feita');
    expect(textElement).toBeInTheDocument();
  });
});
