import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './render/renderWithRouter';

const PROFILE_TOP_BTN = 'profile-top-btn';
const PROFILE_DONE_BTN = 'profile-done-btn';

const mockLocalStorage = [{
  id: '52977',
  type: 'meal',
  nationality: 'Turkish',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  doneDate: '17/03/2022',
  tags: ['Soup'],
},
{
  id: '52785',
  type: 'meal',
  nationality: 'Indian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Dal fry',
  image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
  doneDate: '04/02/2022',
  tags: ['Curry', 'Vegetarian'],
},
{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  doneDate: '15/04/2022',
  tags: [],
}];

const initialEntries = ['/done-recipes'];

describe('Testa a página Done Recipes', () => {
  beforeEach(() => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorage));
  });

  afterEach(() => window.localStorage.clear());

  it('Verifica rota até a página Done Recipes, renderização da página e elementos e click em filter by meal .', async () => {
    renderWithRouter(<App />, { initialEntries });
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

    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(PROFILE_TOP_BTN));
    expect(screen.getByTestId(PROFILE_DONE_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(PROFILE_DONE_BTN));

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /meals/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();

    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-Soup-horizontal-tag')).toBeInTheDocument();

    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
  });

  it('Checa a função click filter by drink.', async () => {
    renderWithRouter(<App />, { initialEntries });

    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
  });

  it('Checa a função click filter by all. .', async () => {
    renderWithRouter(<App />, { initialEntries });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
  });

  it('Verifica a função click do botão, que faz redirecionamento de página (history.push(path)).', async () => {
    renderWithRouter(<App />, { initialEntries });

    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('0-horizontal-image'));
  });
});
