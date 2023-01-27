import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa os componentes da tela de login', () => {
  const testIdMail = 'email-input';
  const testIdPass = 'password-input';
  const testIdBtn = 'login-submit-btn';
  test('Se os elementos corretos aparecem na tela', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(testIdMail);
    const inputPassword = screen.getByTestId(testIdPass);
    const btnRedirect = screen.getByTestId(testIdBtn);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnRedirect).toBeInTheDocument();
  });

  test('Se o botão é habilitado quando há um email e uma senha corretos', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(testIdMail);
    const inputPassword = screen.getByTestId(testIdPass);
    const btnRedirect = screen.getByTestId(testIdBtn);
    const emailCorrect = 'mail@mail.com';
    const passCorrect = '1234567';
    const emailWrong = 'email';
    const passwordWrong = '123';

    expect(btnRedirect).toBeDisabled();

    userEvent.type(inputEmail, emailWrong);
    userEvent.type(inputPassword, passwordWrong);

    expect(btnRedirect).toBeDisabled();

    userEvent.type(inputEmail, emailCorrect);
    userEvent.type(inputPassword, passCorrect);
    expect(btnRedirect).not.toBeDisabled();
  });
  test('Se redireciona para a página principal de receitas', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(testIdMail);
    const inputPassword = screen.getByTestId(testIdPass);
    const btnRedirect = screen.getByTestId(testIdBtn);
    const emailCorrect = 'mail@mail.com';
    const passCorrect = '1234567';

    userEvent.type(inputEmail, emailCorrect);
    userEvent.type(inputPassword, passCorrect);

    userEvent.click(btnRedirect);
    expect(history.location.pathname).toBe('/meals');
  });
});
