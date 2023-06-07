// src/tests/Header.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
/* import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min'; */
import Header from '../components/Header/Header';

describe('Header', () => {
  const searchButtonTest = 'search-top-btn';
  const pageTitleTest = 'page-title';
  it('deve exibir o título corretamente com base na rota atual', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitleTest)).toHaveTextContent('Meals');
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

  it('deve definir corretamente o título como "Drinks" quando a página for "/drinks"', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitleTest)).toHaveTextContent('Drinks');
  });

  it('deve definir corretamente o título como "Profile" quando a página for "/profile"', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitleTest)).toHaveTextContent('Profile');
  });

  it('deve definir corretamente o título como "Done Recipes" quando a página for "/done-recipes"', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitleTest)).toHaveTextContent('Done Recipes');
  });

  it('deve definir corretamente o título como "Favorite Recipes" quando a página for "/favorite-recipes"', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(pageTitleTest)).toHaveTextContent('Favorite Recipes');
  });
});
