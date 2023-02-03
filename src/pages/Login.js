import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bulma/css/bulma.css';
import '../App.css';

function Login() {
  const history = useHistory();

  const [disabledButton, setDisabledButton] = useState(true);
  const [login, setLogin] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const passLeng = 6;
    const validEmail = /\S+@\S+\.\S+/;
    if (
      login.password.length > passLeng
      && validEmail.test(login.email) === true
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [login]);

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));

    history.push('/meals');
  };

  return (
    <div className="meals">
      <div className="login-container">
        <h1 className="title-login">App de Receitas</h1>
        <label htmlFor="emailInput">
          <input
            className="input"
            type="text"
            placeholder="email"
            data-testid="email-input"
            value={ login.email }
            onChange={ handleChange }
            name="email"
          />
        </label>
        <label htmlFor="passwordInput">
          <input
            className="input"
            type="text"
            placeholder="password"
            data-testid="password-input"
            name="password"
            value={ login.password }
            onChange={ handleChange }
          />
        </label>
        <button
          className="login-button button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabledButton }
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
