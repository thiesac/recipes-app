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

  it('deve renderizar o título', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Meals');
  });

  it('deve navegar para a página de perfil ao clicar no ícone de perfil', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    const profileIcon = screen.getByAltText('Profile');
    userEvent.click(profileIcon);

    expect(screen.getByTestId('page-title')).toHaveTextContent('Profile');
  });
});
