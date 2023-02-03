import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import AppProvider from '../context/linkContext/LinkProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndProvider from './render/renderWithRouter';

const PAGE_TITLE = 'page-title';
const PROFILE = 'profile-top-btn';
const FILTER_MEALS = 'filter-by-meal-btn';
const FILTER_DRINKS = 'filter-by-drink-btn';
const FILTER_ALL = 'filter-by-all-btn';

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

describe('Testes para a página de FavoritesRecipes', () => {
  beforeEach(() => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
  });

  afterEach(() => window.localStorage.clear());

  it('Verifica a rota da página e seus componentes fixos', () => {
    renderWithRouterAndProvider(
      <AppProvider>
        <FavoriteRecipes />
      </AppProvider>,
    );

    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const profile = screen.getByTestId(PROFILE);
    const filterMeals = screen.getByTestId(FILTER_MEALS);
    const filterDrinks = screen.getByTestId(FILTER_DRINKS);
    const filterAll = screen.getByTestId(FILTER_ALL);

    expect(pageTitle).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(filterMeals).toBeInTheDocument();
    expect(filterDrinks).toBeInTheDocument();
    expect(filterAll).toBeInTheDocument();

    userEvent.click(profile);
    userEvent.click(filterMeals);
    userEvent.click(filterDrinks);
    userEvent.click(filterAll);
  });
  it('Verifica a função click do botão, que faz redirecionamento de página (history.push(path)).', async () => {
    renderWithRouterAndProvider(
      <AppProvider>
        <FavoriteRecipes />
      </AppProvider>,
    );

    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('0-horizontal-image'));
  });
  it('Verifica o botão de desfavoritar', () => {
    renderWithRouterAndProvider(
      <AppProvider>
        <FavoriteRecipes />
      </AppProvider>,
    );

    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
  });
});

describe('Testes para a página de FavoritesRecipes quando o localStorage está vazio', () => {
  it('Verifica a rota da página e seus componentes fixos', () => {
    renderWithRouterAndProvider(
      <AppProvider>
        <FavoriteRecipes />
      </AppProvider>,
    );

    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const profile = screen.getByTestId(PROFILE);
    const filterMeals = screen.getByTestId(FILTER_MEALS);
    const filterDrinks = screen.getByTestId(FILTER_DRINKS);
    const filterAll = screen.getByTestId(FILTER_ALL);

    expect(pageTitle).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(filterMeals).toBeInTheDocument();
    expect(filterDrinks).toBeInTheDocument();
    expect(filterAll).toBeInTheDocument();

    userEvent.click(profile);
    userEvent.click(filterMeals);
    userEvent.click(filterDrinks);
    userEvent.click(filterAll);
  });
});
