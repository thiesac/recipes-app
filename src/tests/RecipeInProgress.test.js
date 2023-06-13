import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress/MealInProgress';

describe('RecipeInProgress', () => {
  beforeEach(() => {
    // Configuração comum antes de cada teste
    // ...
  });

  test('renderiza o título da receita corretamente', () => {
    render(<RecipeInProgress />);
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Spicy Arrabiata Penne');
  });

  test('verifica a presença de todos os botões', () => {
    render(<RecipeInProgress />);

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
  });

  test('marca/desmarca os ingredientes corretamente', () => {
    render(<RecipeInProgress />);
    const ingredientCheckbox = screen.getByTestId('ingredient-step').querySelector('input');
    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox).toBeChecked();

    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox).not.toBeChecked();
  });

  test('verifica se ocorre a mudança de estilo ao clicar no checkbox', () => {
    render(<RecipeInProgress />);

    const ingredientCheckbox = screen.getByTestId('ingredient-step').querySelector('input');
    const ingredientLabel = screen.getByTestId('ingredient-step').querySelector('label');

    expect(ingredientLabel).not.toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');

    userEvent.click(ingredientCheckbox);

    expect(ingredientLabel).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');

    userEvent.click(ingredientCheckbox);

    expect(ingredientLabel).not.toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
  });

  test('verifica se o botão "Finalizar Receita" está inativo até que todos os checkboxes estejam marcados', () => {
    render(<RecipeInProgress />);

    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeDisabled();

    const ingredientCheckboxes = screen.getAllByTestId('ingredient-step').map((checkbox) => checkbox.querySelector('input'));
    ingredientCheckboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    expect(finishRecipeBtn).not.toBeDisabled();
  });

  test('salva a receita e redireciona para a página de receitas feitas', () => {
    const { history } = renderWithRouter(<RecipeInProgress />);

    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishRecipeBtn);

    // Verifique se a receita foi salva corretamente no localStorage
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(doneRecipes).toHaveLength(1);
    expect(doneRecipes[0].name).toBe('Spicy Arrabiata Penne');

    // Verifique se o redirecionamento ocorreu corretamente
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
