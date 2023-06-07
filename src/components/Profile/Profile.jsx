import React from 'react';
import Header from '../Header/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user')); // Obtém os dados do usuário do localStorage
  const email = user ? user.email : ''; // Obtém o e-mail do usuário ou uma string vazia se não estiver disponível

  return (
    <div>
      <Header />
      <p>Profile</p>
      {/* Conteúdo da página */}
      <div>
        <h1 data-testid="profile-email">{email}</h1>
        {' '}
        {/* Exibe o e-mail */}
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
