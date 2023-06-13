import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // ............................................qual o correto?

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory(); // .............................................................é isso mesmo??? não podemos usar props.

  const checkFormValidity = (newEmail, newPassword) => {
    const minimumPasswordLength = 6;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setIsFormValid(isValidEmail && newPassword.length >= minimumPasswordLength);
  };

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
    if (isFormValid) {
      localStorage.setItem('user', email);
      history.push('/meals'); // ..............................................qual a rota????
    }
  };

  return (
    <form>
      <input
        type="email"
        value={ email }
        onChange={ handleEmailChange }
        data-testid="email-input"
      />
      <input
        type="password"
        value={ password }
        onChange={ handlePasswordChange }
        data-testid="password-input"
      />
      <button
        type="button"
        disabled={ !isFormValid }
        data-testid="login-submit-btn"
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
