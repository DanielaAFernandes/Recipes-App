import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const ONE_FOOD = '/meals/52771/in-progress';
const ONE_DRINK = '/drinks/178319/in-progress';

describe('Teste da tela de receitas em progresso', () => {
  it('Se os elementos aparecem na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push(ONE_FOOD);
    });
    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Spicy Arrabiata Penne');
    expect(screen.getByRole('button', { name: /compartilhar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /vegetarian/i })).toBeInTheDocument();
    expect(screen.getByText(/1 pound penne rigate/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/1 pound penne rigate/i));
  });
  it('Testar o botão favoritar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push(ONE_FOOD);
    });
    const buttonFavorite = screen.getByTestId('favorite-btn');
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    await act(async () => {
      history.push(ONE_DRINK);
    });
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
  });
  it('Testar o botão finalizar', async () => {
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
  });
  it('Testar o botão favoritar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouter(<App />);
    localStorage.removeItem('favoriteRecipes');
    await act(async () => {
      history.push(ONE_DRINK);
    });
    const buttonFavorite = screen.getByTestId('favorite-btn');
    userEvent.click(buttonFavorite);
    userEvent.click(buttonFavorite);
  });
});
