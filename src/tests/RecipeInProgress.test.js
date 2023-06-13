import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress/MealInProgress';

const FINISH_RECIPE_BTN_TEST_ID = 'finish-recipe-btn';
const INGREDIENT_STEP_TEST_ID = 'ingredient-step';
const LINE_THROUGH_STYLE = 'text-decoration: line-through solid rgb(0, 0, 0)';

beforeEach(() => {
  // Configuração do mock da API
  // ...
});

describe('RecipeInProgress', () => {
  // ...

  test('verifica a presença de todos os botões', () => {
    render(<RecipeInProgress />);

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TEST_ID);
    expect(finishRecipeBtn).toBeInTheDocument();
  });

  test('marca/desmarca os ingredientes corretamente', () => {
    render(<RecipeInProgress />);
    const ingredientCheckbox = screen.getByTestId(INGREDIENT_STEP_TEST_ID).querySelector('input');
    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox).toBeChecked();

    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox).not.toBeChecked();
  });

  test('verifica se ocorre a mudança de estilo ao clicar no checkbox', () => {
    render(<RecipeInProgress />);

    const ingredientCheckbox = screen.getByTestId(INGREDIENT_STEP_TEST_ID).querySelector('input');
    const ingredientLabel = screen.getByTestId(INGREDIENT_STEP_TEST_ID).querySelector('label');

    expect(ingredientLabel).not.toHaveStyle(LINE_THROUGH_STYLE);

    userEvent.click(ingredientCheckbox);

    expect(ingredientLabel).toHaveStyle(LINE_THROUGH_STYLE);

    userEvent.click(ingredientCheckbox);

    expect(ingredientLabel).not.toHaveStyle(LINE_THROUGH_STYLE);
  });

  test('verifica se o botão "Finalizar Receita" está inativo até que todos os checkboxes estejam marcados', () => {
    render(<RecipeInProgress />);

    const finishRecipeBtn = screen.getByTestId(FINISH_RECIPE_BTN_TEST_ID);
    expect(finishRecipeBtn).toBeDisabled();

    const ingredientCheckboxes = screen.getAllByTestId(INGREDIENT_STEP_TEST_ID).map((checkbox) => checkbox.querySelector('input'));
    ingredientCheckboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    expect(finishRecipeBtn).not.toBeDisabled();
  });

  test('salva a receita e redireciona para a página de receitas feitas', () => {
    const { history } = renderWithRouter(<RecipeInProgress />);

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
