import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import { mockMealsCategories, mockMealsData, mockOneMeal } from './mocks/mockMatheus/mockMealsOrganized';
import DefaultDrinksAPI from './mocks/DefaultDrinksAPI';
import mockOneDrink from './mocks/mockMatheus/mockOneDrink';

describe('Testes para o componente SearchBar', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const nameSearchRadio = 'name-search-radio';
  const execSearchBtn = 'exec-search-btn';
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se ao selecionar outro radio, o input é limpo', () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMealsData),
      });
    renderWithRouterAndContext(<App />, '/meals');
    const searchIconBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIconBtn);

    const searchInputText = screen.getByTestId(searchInput);
    userEvent.type(searchInputText, 'banana');

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);
    expect(searchInputText).toHaveTextContent('');
  });

  it('Verifica o alerta de "First Letter"', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMealsData),
      });
    renderWithRouterAndContext(<App />, '/meals');
    const searchIconBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIconBtn);

    const firstLetterSearchRadioInput = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterSearchRadioInput);

    const searchInputText = screen.getByTestId(searchInput);
    userEvent.type(searchInputText, 'Xa');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    alertSpy.mockRestore();
  });

  it('Verifica o alerta de "Ingredient"', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMealsData),
      });
    renderWithRouterAndContext(<App />, '/meals');
    const searchIconBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIconBtn);

    const ingredientSearchRadioInput = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientSearchRadioInput);

    const searchInputText = screen.getByTestId(searchInput);
    userEvent.type(searchInputText, 'HashimaHato');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    alertSpy.mockRestore();
  });

  it('Verifica o alerta de "Name"', async () => {
    const alertSpy = jest.spyOn(window, 'alert');
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMealsCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMealsData),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({
          meals: null,
        }),
      });

    renderWithRouterAndContext(<App />, '/meals');
    const searchIconBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIconBtn);

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const searchInputText = screen.getByTestId(searchInput);
    userEvent.type(searchInputText, 'pirao');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(alertSpy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });

    alertSpy.mockRestore();
    global.fetch.mockRestore();
  });

  it('Verifica a renderização quando é a rota /meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockOneMeal),
    });

    const { history } = renderWithRouterAndContext(<App />, '/meals');
    const searchIconBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIconBtn);

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const searchInputText = screen.getByTestId(searchInput);
    userEvent.type(searchInputText, 'Burek');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=burek');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53060');
    });

    global.fetch.mockRestore();
  });

  it('Verifica a renderização quando é a rota /drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockOneDrink),
    });

    const { history } = renderWithRouterAndContext(<App />, '/drinks');
    const searchIconBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIconBtn);

    const nameSearchRadioInput = screen.getByTestId(nameSearchRadio);
    userEvent.click(nameSearchRadioInput);

    const searchInputText = screen.getByTestId(searchInput);
    userEvent.type(searchInputText, 'Aquamarine');

    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=aquamarine');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });

    global.fetch.mockRestore();
  });

  it('Verifica se, ao pesquisar um alimento, caso encontre mais de 12 resultados, são exibidos somente os 12 cards de comida', async () => {
    global.fetch = jest.fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockMealsData),
      });
    renderWithRouterAndContext(<App />, '/meals');
    const searchIconBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIconBtn);
    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.queryByTestId('13-recipe-card')).not.toBeInTheDocument();
    });
  });

  it('Verifica se, ao pesquisar um alimento, caso encontre mais de 12 resultados, são exibidos somente os 12 cards de comida', async () => {
    global.fetch = jest.fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(DefaultDrinksAPI),
      });
    renderWithRouterAndContext(<App />, '/drinks');
    const searchIconBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIconBtn);
    const btnSearchExec = screen.getByTestId(execSearchBtn);
    userEvent.click(btnSearchExec);

    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.queryByTestId('13-recipe-card')).not.toBeInTheDocument();
    });
  });
});
