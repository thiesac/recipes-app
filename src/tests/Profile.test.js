// src/test/Profile.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
/* import Header from '../components/Header/Header'; */
import { clearLocalStorage } from '../helpers/LocalStorage';

jest.mock('../helpers/LocalStorage', () => ({
  clearLocalStorage: jest.fn(), // Mock da função clearLocalStorage para verificar se foi chamada
}));

describe('Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' })); // Configuração do localStorage antes de cada teste
  });

  afterEach(() => {
    localStorage.clear(); // Limpeza do localStorage após cada teste
  });

  /*   test('renders user email from local storage', () => {
    render(<Profile />); // Renderização do componente Profile
    const userEmail = screen.getByTestId('profile-email'); // Obtém o elemento com o atributo data-testid="profile-email"
    expect(userEmail.textContent).toBe('test@example.com'); // Verifica se o texto exibido é o e-mail esperado
  }); */

  test('navigates to /done-recipes when "Done Recipes" button is clicked', () => {
    const history = createMemoryHistory(); // Cria uma instância de history em memória
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const doneRecipesButton = screen.getByTestId('profile-done-btn'); // Obtém o botão com o atributo data-testid="profile-done-btn"
    fireEvent.click(doneRecipesButton); // Dispara um evento de clique no botão

    expect(history.location.pathname).toBe('/done-recipes'); // Verifica se a rota foi alterada para "/done-recipes"
  });

  test('navigates to /favorite-recipes when "Favorite Recipes" button is clicked', () => {
    const history = createMemoryHistory(); // Cria uma instância de history em memória
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn'); // Obtém o botão com o atributo data-testid="profile-favorite-btn"
    fireEvent.click(favoriteRecipesButton); // Dispara um evento de clique no botão

    expect(history.location.pathname).toBe('/favorite-recipes'); // Verifica se a rota foi alterada para "/favorite-recipes"
  });

  test('clears local storage and navigates to / when "Logout" button is clicked', () => {
    const history = createMemoryHistory(); // Cria uma instância de history em memória
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const logoutButton = screen.getByTestId('profile-logout-btn'); // Obtém o botão com o atributo data-testid="profile-logout-btn"
    fireEvent.click(logoutButton); // Dispara um evento de clique no botão

    expect(clearLocalStorage).toHaveBeenCalled(); // Verifica se a função clearLocalStorage foi chamada
    expect(history.location.pathname).toBe('/'); // Verifica se a rota foi alterada para "/"
  });

  test('renders empty email when user is not available', () => {
    localStorage.removeItem('user'); // Remove o item 'user' do localStorage para simular a ausência de usuário
    render(<Profile />);
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail.textContent).toBe(''); // Verifica se o e-mail exibido é uma string vazia
  });
});
