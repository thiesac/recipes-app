import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Header/Header';

function Profile() {
  const history = useHistory(); // constante necessária para
  const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage
  const email = user ? user.email : ''; // Obtém o e-mail do usuário ou uma string vazia se não estiver disponível

  return (
    <div>
      <Header />
      <p>Profile</p>
      {/* Conteúdo da página */}
      <div>
        {/* Exibe o e-mail */}
        <h1 data-testid="profile-email">{email}</h1>
        {' '}
        <button
          // muda a tela para /receitas-feitas
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
