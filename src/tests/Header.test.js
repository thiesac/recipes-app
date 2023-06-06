// src/tests/Header.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header/Header';

describe('Header', () => {
  it('deve renderizar o ícone de perfil', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );

    const profileIcon = screen.getByAltText('Profile');
    expect(profileIcon).toBeInTheDocument();
  });

  it('deve renderizar o ícone de pesquisa na página de refeições', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchIcon = screen.getByAltText('icon-pesquisa');
    expect(searchIcon).toBeInTheDocument();
  });

  it('deve renderizar o ícone de pesquisa na página de bebidas', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchIcon = screen.getByAltText('icon-pesquisa');
    expect(searchIcon).toBeInTheDocument();
  });

  it('deve renderizar o título "Meals" na página de refeições', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Meals');
  });

  it('deve renderizar o título "Drinks" na página de bebidas', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Drinks');
  });

  it('deve renderizar o título "Profile" na página de perfil', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Profile');
  });

  it('deve renderizar o título "Done Recipes" na página de receitas concluídas', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Done Recipes');
  });

  it('deve renderizar o título "Favorite Recipes" na página de receitas favoritas', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Favorite Recipes');
  });

  it('deve navegar para a página de perfil ao clicar no ícone de perfil', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );

    const profileIcon = screen.getByAltText('Profile');
    userEvent.click(profileIcon);

    expect(screen.getByTestId('page-title')).toHaveTextContent('Profile');
  });

  it('deve navegar para a página de receitas concluídas ao clicar no título "Done Recipes"', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );

    const doneRecipesTitle = screen.getByTestId('page-title');
    userEvent.click(doneRecipesTitle);

    expect(screen.getByTestId('page-title')).toHaveTextContent('Done Recipes');
  });

  it('deve navegar para a página de receitas favoritas ao clicar no título "Favorite Recipes"', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );

    const favoriteRecipesTitle = screen.getByTestId('page-title');
    userEvent.click(favoriteRecipesTitle);

    expect(screen.getByTestId('page-title')).toHaveTextContent('Favorite Recipes');
  });
});
