import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import { mockOneDrink } from './mocks/DrinkMockSearchBar';

describe('Testa o componente <SearchBar />', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    window.alert = jest.fn();
    const searchForButton = screen.getByRole('img', {
      name: /icone de busca/i,
    });
    userEvent.click(searchForButton);
  });

  const nameBtnText = 'name-search-radio';
  const searchBtnText = 'exec-search-btn';
  const searchInputText = 'search-input';
  it('Testa a limpeza do input de pesquisa após trocar de categoria', () => {
    const searchInput = screen.getByTestId(searchInputText);
    const ingredientsBtn = screen.getByText(/ingredientes/i);

    userEvent.type(searchInput, 'burek');
    expect(searchInput).toHaveValue('burek');

    userEvent.click(ingredientsBtn);
    expect(searchInput).toHaveValue('');
  });

  it('Testa se o alerta de erro é acionado quando em "first letter" é digitado mais de uma letra no input', () => {
    const alertMock = jest.spyOn(window, 'alert');
    const searchInput = screen.getByTestId(searchInputText);
    const firstLetterBtn = screen.getByText(/primeira burek/i);

    userEvent.click(firstLetterBtn);
    userEvent.type(searchInput, 'alertaMax');
    expect(alertMock).toBeCalled();
  });

  it('Testa a busca por meal', async () => {
    const searchInput = screen.getByTestId(searchInputText);
    const nameBtn = screen.getByTestId(nameBtnText);
    const searchBtn = screen.getByTestId(searchBtnText);
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'Burek');
    userEvent.click(searchBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument()); // a espera é realizada até que o botão de pesquisa não esteja mais presente na tela, indicando que o usuário foi redirecionado para a página da receita desejada.
  });

  it('Testa a busca por drink', async () => {
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    const showSearchBtn = screen.getByRole('img', {
      name: /icone de busca/i,
    });
    userEvent.click(showSearchBtn);
    const searchInput = screen.getByTestId(searchInputText);
    const nameBtn = screen.getByTestId(nameBtnText);
    const searchBtn = screen.getByTestId(searchBtnText);
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'Ace');
    userEvent.click(searchBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument()); // a espera é realizada até que o botão de pesquisa não esteja mais presente na tela, indicando que o usuário foi redirecionado para a página da receita desejada.
  });

  it('Testa a busca por first letter', async () => {
    const searchInput = screen.getByTestId(searchInputText);
    const nameBtn = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(searchBtnText);
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'a');
    userEvent.click(searchBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  it('Testa a busca por ingrediente', async () => {
    const searchInput = screen.getByTestId(searchInputText);
    const nameBtn = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(searchBtnText);
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'grenadine');
    userEvent.click(searchBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  it('Testa a emissão do alerta quando não encontra receita', async () => {
    const searchInput = screen.getByTestId(searchInputText);
    const nameBtn = screen.getByTestId(nameBtnText);
    const searchBtn = screen.getByTestId(searchBtnText);
    const alertSpy = jest.spyOn(window, 'alert');

    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'ChuckNorris');
    userEvent.click(searchBtn);

    await waitFor(() => expect(alertSpy).toBeCalled());
  });
});

describe('Testa o componente <SearchBar />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockOneDrink,
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const searchImgBtn = screen.getByRole('img', {
      name: /icone de busca/i,
    });
    userEvent.click(searchImgBtn);
  });

  it('Testa se o fetch é chamado uma única vez', () => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
