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

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    expect(submitButton.disabled).toBe(false);
  });

  test('verifica se ao clicar no botão, vai para a rota correta', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const submitButton = screen.getByTestId(submitButtonTestId);

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    // expect..???????????????????????????????
    expect(history.location.pathname).toBe('/meals'); // ...................................................qual a rota???
  });
});
