import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import drinks from './mocks/drinks';
import meals from './mocks/meals';
import categories from './mocks/categories';
import milkDrinks from './mocks/milkDrinks';

describe('Tests for Searchbar.js', () => {
  let myHistory;
  beforeEach(() => {
    global.fetch = (url) => Promise.resolve({
      json: () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinks); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(meals); }

        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(categories); }

        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=milk') { return Promise.resolve(milkDrinks); }
      },
    });
    const { history } = renderWithRouterAndProvider(<App />);
    act(() => history.push('/meals'));
    myHistory = history;
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
});
