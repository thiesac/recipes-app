import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header/Header';

describe('Header', () => {
  const searchButtonTest = 'search-top-btn';
  it('deve exibir o título corretamente com base na rota atual', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
  });

  it('deve exibir o ícone de perfil', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('deve exibir o ícone de busca nas páginas /meals e /drinks', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(searchButtonTest)).toBeInTheDocument();
  });

  it('deve ocultar o ícone de busca em outras páginas', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId(searchButtonTest)).toBeNull();
  });

  it('deve exibir o input de busca ao clicar no ícone de busca', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(searchButtonTest);
    fireEvent.click(searchButton);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('deve ocultar o input de busca ao clicar novamente no ícone de busca', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.getByTestId(searchButtonTest);
    fireEvent.click(searchButton);
    fireEvent.click(searchButton);

    expect(screen.queryByTestId('search-input')).toBeNull();
  });

  /*   it('deve exibir o título "Done Recipes" na página /done-recipes', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitleTest)).toHaveTextContent('Done Recipes');
  }); */

  /*   it('deve exibir o título "Favorite Recipes" na página /favorite-recipes', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitleTest)).toHaveTextContent('Favorite Recipes');
  }); */
});
