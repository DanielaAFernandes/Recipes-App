import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import drinks from './mocks/drinks';
import meals from './mocks/meals';
import categoriesMeat from './mocks/categoriesMeat';
import categoriesDrinks from './mocks/categoriesDrinks';
import milkDrinks from './mocks/milkDrinks';

describe('Tests for Searchbar.js', () => {
  let myHistory;
  beforeEach(() => {
    global.fetch = (url) => Promise.resolve({
      json: () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinks); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(meals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(categoriesMeat); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(categoriesDrinks); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=milk') { return Promise.resolve(milkDrinks); }
      },
    });
    const { history } = renderWithRouterAndProvider(<App />);
    act(() => history.push('/drinks'));
    myHistory = history;

    const showSearch = screen.getByTestId('search-top-btn');
    userEvent.click(showSearch);
  });
  test('Deve haver uma barra de procura e 3 opções radio', () => {
    console.log(myHistory.location.pathname);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const ingredientInput = screen.getByTestId('ingredient-search-radio');
    expect(ingredientInput).toBeInTheDocument();

    const nameInput = screen.getByTestId('name-search-radio');
    expect(nameInput).toBeInTheDocument();

    const firstInput = screen.getByTestId('first-letter-search-radio');
    expect(firstInput).toBeInTheDocument();

    const execButton = screen.getByTestId('exec-search-btn');
    expect(execButton).toBeInTheDocument();
  });
  test('Deve haver os itens especificados se for procurado por drinks com leite', () => {
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const ingredientInput = screen.getByTestId('ingredient-search-radio');
    expect(ingredientInput).toBeInTheDocument();

    const execButton = screen.getByTestId('exec-search-btn');
    expect(execButton).toBeInTheDocument();

    userEvent.type(searchInput, 'milk');
    userEvent.click(ingredientInput);
    userEvent.click(execButton);
  });
});
