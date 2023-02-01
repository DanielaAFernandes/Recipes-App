import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './render/renderWithRouter';

describe('Testa ', () => {
  it('Verifica .', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeDisabled();

    userEvent.type(inputEmail, 'teste@test.com');
    userEvent.type(inputPassword, '1234567');
    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: 'teste@test.com' });

    await waitFor(() => {
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('Beef-category-filter'));
      expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('11-recipe-card'));
    });
  });
});
