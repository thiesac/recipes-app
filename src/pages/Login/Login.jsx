/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory();
  const checkFormValidity = (newEmail, newPassword) => {
    const minimumPasswordLength = 6;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setIsFormValid(isValidEmail && newPassword.length > minimumPasswordLength);
  };

  useEffect(() => {
    const minimumPasswordLength = 6;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsFormValid(isValidEmail && password.length > minimumPasswordLength);
  }, [email, password]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    checkFormValidity(email, password);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    checkFormValidity(email, password);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div
      className="login-container d-flex flex-column align-items-center justify-content-center"
    >
      <h2 className="yellow-title">Recipes</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="white-label">Email address</Form.Label>
          <Form.Control
            type="email"
            value={ email }
            onChange={ handleEmailChange }
            data-testid="email-input"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="white-label">Password</Form.Label>
          <Form.Control
            type="password"
            value={ password }
            onChange={ handlePasswordChange }
            data-testid="password-input"
            placeholder="Password"
          />
          <Form.Text className="white-label">
            Password must be at least 7 characters in length
          </Form.Text>
        </Form.Group>

        <Button
          variant="warning"
          type="button"
          disabled={ !isFormValid }
          data-testid="login-submit-btn"
          onClick={ handleClick }
        >
          Enter
        </Button>
      </Form>
    </div>
  );
}

export default Login;
