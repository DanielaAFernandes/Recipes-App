import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const getFromLocalStorage = () => {
    const localStorageAtual = localStorage.getItem('user');
    const localStorageParce = localStorageAtual
      ? JSON.parse(localStorageAtual)
      : { email: '' };
    setEmail(localStorageParce.email);
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  return (
    <div className="profile">
      <Header title="Profile" showSearch={ false } />
      <div>
        <h4 data-testid="profile-email">
          {email}
        </h4>
        <Link to="/done-recipes">
          <button
            className="buttons-profile"
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            className="buttons-profile"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes

          </button>
        </Link>
        <button
          type="button"
          className="buttons-profile"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
