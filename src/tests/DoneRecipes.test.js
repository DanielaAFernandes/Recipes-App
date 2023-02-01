import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const ONE_DRINK = '/drinks/178319/in-progress';

describe('Teste da tela de recipes terminados', () => {
  it('Testar se os elementos aparecem na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push(ONE_DRINK);
    });
    userEvent.click(screen.getByText(/2 oz hpnotiq/i));
    userEvent.click(screen.getByText(/1 oz pineapple juice/i));
    userEvent.click(screen.getByText(/1 oz banana liqueur/i));
    expect(screen.getByRole('button', { name: /finalizar/i })).toBeEnabled();
    userEvent.click(screen.getByRole('button', { name: /finalizar/i }));
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
