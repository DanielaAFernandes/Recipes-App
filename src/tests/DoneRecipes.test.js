import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import DoneRecipes from '../pages/DoneRecipes';

const teste = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '2023-02-02T22:42:58.902Z',
    tags: [],
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '2023-02-02T13:49:43.074Z',
    tags: ['Cool'],
  },
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '2023-02-02T16:32:29.131Z',
    tags: [
      'Pasta',
      'Curry',
    ],
  },
];

describe('Tests for DoneRecipes.js', () => {
  let mockedStorage;
  beforeEach(async () => {
    // Mock clipboard copy
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    // Mocking local storage
    mockedStorage = {
      favoriteRecipes: JSON.stringify([{ id: '178319' }, { id: '52771' }]),
      doneRecipes: JSON.stringify(teste),
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    // Mocking fetch
    global.fetch = jest.fn(fetch);

    renderWithRouterAndProvider(<DoneRecipes />);
  });
  test('There is two tags, pasta and curry', async () => {
    jest.setTimeout(60000);
    const doneRecipesTitle = screen.getByText(/Done Recipes/);
    expect(doneRecipesTitle).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Arrabiata/)).toBeInTheDocument();
    });

    const tagPasta = screen.getByText(/Arrabiata/);
    const tagCurry = screen.getByText(/Curry/);

    expect(tagPasta).toBeInTheDocument();
    expect(tagCurry).toBeInTheDocument();

    const filterBtnMeal = screen.getByTestId('filter-by-meal-btn');
    expect(filterBtnMeal).toBeInTheDocument();

    await act(() => userEvent.click(filterBtnMeal));

    const filterBtnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterBtnDrink).toBeInTheDocument();

    await act(() => userEvent.click(filterBtnDrink));

    const filterBtnAll = screen.getByTestId('filter-by-all-btn');
    expect(filterBtnAll).toBeInTheDocument();

    await act(() => userEvent.click(filterBtnAll));

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    await act(() => userEvent.click(shareButton));

    const detailPage = screen.getByTestId('0-horizontal-image');
    expect(detailPage).toBeInTheDocument();

    await act(() => userEvent.click(detailPage));
  });
});
describe('Testa DoneRecipes com localStorage vazio', () => {
  let mockedStorage;
  beforeEach(async () => {
    // Mocking local storage
    mockedStorage = {
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    // Mocking fetch
    global.fetch = jest.fn(fetch);

    renderWithRouterAndProvider(<DoneRecipes />);
  });
  test('Se a Done recipes é renderizada e nnenhuma receita aparece', () => {
    const doneRecipesTitle = screen.getByText(/Done Recipes/);
    expect(doneRecipesTitle).toBeInTheDocument();
    expect(screen.queryByText(/Arrabiata/)).not.toBeInTheDocument();
  });
});
