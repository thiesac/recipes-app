import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../App';
// import RecipeInProgress from '../pages/RecipeInProgress/RecipeInProgress';
import DrinksById from './mocks/DrinksById';
import MealsById from './mocks/MealsById';

const FINISH_RECIPE_BTN_TEST_ID = 'finish-recipe-btn';
const INGREDIENT_STEP_TEST_ID = 'ingredient-step';
const LINE_THROUGH_STYLE = 'text-decoration: line-through solid rgb(0, 0, 0)';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockImplementation((url) => {
    if (url.includes('https://www.themealdb.com/api/json/v1/1/lookup.php?i=')) {
      return Promise.resolve({
        json: () => Promise.resolve(MealsById),
      });
    }
    if (url.includes('www.thecocktaildb.com/api/json/v1/1/lookup.php?i=')) {
      return Promise.resolve({
        json: () => Promise.resolve(DrinksById),
      });
    }
    throw new Error('url não encontrada');
  });
});

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

describe('RecipeInProgress - Meals', () => {
  test('verifica a presença de todos os botões', () => {
    renderWithRouterAndContext(<App />, '/meals/52771/in-progress');

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TEST_ID);
    expect(finishRecipeBtn).toBeInTheDocument();
  });

  test('marca/desmarca os ingredientes corretamente', () => {
    renderWithRouterAndContext(<App />, '/meals/52771/in-progress');
    const ingredientCheckbox = screen.getByTestId(INGREDIENT_STEP_TEST_ID).querySelector('input');
    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox).toBeChecked();

    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox).not.toBeChecked();
  });

  test('verifica se ocorre a mudança de estilo ao clicar no checkbox', () => {
    renderWithRouterAndContext(<App />, '/meals/52771/in-progress');
    const ingredientCheckbox = screen.getByTestId(INGREDIENT_STEP_TEST_ID).querySelector('input');
    const ingredientLabel = screen.getByTestId(INGREDIENT_STEP_TEST_ID).querySelector('label');

    expect(ingredientLabel).not.toHaveStyle(LINE_THROUGH_STYLE);

    userEvent.click(ingredientCheckbox);

    expect(ingredientLabel).toHaveStyle(LINE_THROUGH_STYLE);

    userEvent.click(ingredientCheckbox);

    expect(ingredientLabel).not.toHaveStyle(LINE_THROUGH_STYLE);
  });

  test('verifica se o botão "Finalizar Receita" está inativo até que todos os checkboxes estejam marcados', () => {
    renderWithRouterAndContext(<App />, '/meals/52771/in-progress');
    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TEST_ID);
    expect(finishRecipeBtn).toBeDisabled();

    const ingredientCheckboxes = screen.getAllByTestId(INGREDIENT_STEP_TEST_ID).map((checkbox) => checkbox.querySelector('input'));
    ingredientCheckboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    expect(finishRecipeBtn).not.toBeDisabled();
  });

  test('salva a receita e redireciona para a página de receitas feitas', () => {
    renderWithRouterAndContext(<App />, '/meals/52771/in-progress');
    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TEST_ID);
    userEvent.click(finishRecipeBtn);

    // Verifique se a receita foi salva corretamente no localStorage
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(doneRecipes).toHaveLength(1);
    expect(doneRecipes[0].name).toBe('Spicy Arrabiata Penne');

    // Verifique se o redirecionamento ocorreu corretamente
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
