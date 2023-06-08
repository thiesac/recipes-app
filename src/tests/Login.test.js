// src/tests/Login.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Login from '../pages/Login/Login';

describe('Login', () => {
  const emailInputTestId = 'email-input';
  const passwordInputTestId = 'password-input';
  const submitButtonTestId = 'login-submit-btn';
  const emailTestExample = 'test@example.com';

  test('should render email input, password input, and submit button', () => {
    render(<Login />);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('should enable submit button when email and password are valid', () => {
    render(<Login />);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    userEvent.type(emailInput, emailTestExample);
    userEvent.type(passwordInput, 'password123');

    expect(submitButton.disabled).toBe(false);
  });

  test('verifica se ao clicar no botão, vai para a rota correta', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    userEvent.type(emailInput, emailTestExample);
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    // expect..???????????????????????????????
    expect(history.location.pathname).toBe('/meals'); // ...................................................qual a rota???
  });

  test('Se o email é salvo no local storage', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    userEvent.type(emailInput, emailTestExample);
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    const savedUser = JSON.parse(localStorage.getItem('user'));

    expect(savedUser).toEqual({ email: emailTestExample });
  });

  test('isFormValid is updated correctly when email and password are valid', () => {
    render(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    // Verifica se o botão de login está desabilitado inicialmente
    const loginButton = screen.getByTestId('login-submit-btn');
    expect(loginButton).toBeDisabled();

    // Insere um email válido
    userEvent.type(emailInput, 'example@example.com');

    // Verifica se o botão de login continua desabilitado, pois a senha ainda não foi inserida
    expect(loginButton).toBeDisabled();

    // Insere uma senha invalida
    userEvent.type(passwordInput, '123');

    // Verifica se o botão de login está desabilitado com a senha inválida
    expect(loginButton).toBeDisabled();

    // Insere uma senha válida
    userEvent.type(passwordInput, '1234567');

    // Verifica se o botão de login está habilitado com o email e senha válidos
    expect(loginButton).toBeEnabled();
  });
});
