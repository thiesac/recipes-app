import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import DefaultMealsAPI from './mocks/DefaultMealsAPI';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import DefaultDrinksAPI from './mocks/DefaultDrinksAPI';
import BtnCategoryMealsAPI from './mocks/BtnCategoryMealsAPI';
import BtnCategoryDrinks from './mocks/BtnCategoryDrinks';
import MealByCategory from './mocks/MealsByCategory';
import DrinksByCategory from './mocks/DrinksByCategory';

const mockMeal = DefaultMealsAPI;
const mockMealBtn = BtnCategoryMealsAPI;
const mockDrink = DefaultDrinksAPI;
const mockDrinkBtn = BtnCategoryDrinks;
const mockMealCategory = MealByCategory;
const mockDrinkCategory = DrinksByCategory;

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockImplementation((url) => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve({
        json: () => Promise.resolve(mockMeal),
      });
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({
        json: () => Promise.resolve(mockMealBtn),
      });
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve({
        json: () => Promise.resolve(mockDrink),
      });
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({
        json: () => Promise.resolve(mockDrinkBtn),
      });
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
      return Promise.resolve({
        json: () => Promise.resolve(mockMealCategory),
      });
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink') {
      return Promise.resolve({
        json: () => Promise.resolve(mockDrinkCategory),
      });
    }
    // throw new Error('url não encontrada');
  });
});

afterEach(jest.restoreAllMocks);

describe('Drinks', () => {
  test('should render component Header', () => {
    renderWithRouterAndContext(<App />, '/drinks');
    screen.getByRole('heading', { name: /drinks/i });
  });

  test('should render 12 drink cards', async () => {
    renderWithRouterAndContext(<App />, '/drinks');
    await waitFor(() => {
      screen.getByRole('img', { name: /gg/i });
      screen.getByRole('img', { name: /747/i });
    });
  });

  test('should render 12 drinks based on the clicked category', async () => {
    renderWithRouterAndContext(<App />, '/drinks');
    await waitFor(() => {
      const category1Btn = screen.getByRole('button', { name: /ordinary drink/i });
      expect(category1Btn).toBeInTheDocument();
    });
    // act(() => userEvent.click(screen.getByRole('button', { name: /ordinary drink/i })));
    // await waitFor(() => screen.getByRole('img', { name: /corba/i }));
  });
});
