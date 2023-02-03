import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

const START_RECIPE_BUTTON = 'start-recipe-btn';

describe('Testes para RecipeDetails.js', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    await act(async () => history.push('/meals'));
    const recipeId = await screen.findByTestId(`${0}-recipe-card`);
    await act(() => userEvent.click(recipeId));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('se o elemento foto é renderizado na tela', async () => {
    const photoId = await screen.findByTestId('recipe-photo');
    expect(photoId).toBeInTheDocument();
  });

  test('se o elemento título é renderizado na tela', async () => {
    const titleId = await screen.findByTestId('recipe-title');
    expect(titleId).toBeInTheDocument();
  });

  test('se o elemento categoria é renderizado na tela', async () => {
    const categoryId = await screen.findByTestId('recipe-category');
    expect(categoryId).toBeInTheDocument();
  });

  test('se o elemento categoria é renderizado na tela', async () => {
    const categoryId = await screen.findByTestId('recipe-category');
    expect(categoryId).toBeInTheDocument();
  });

  test('Se é possível clickar em start recipe', async () => {
    const startRecipe = screen.getByTestId(START_RECIPE_BUTTON);
    await act(() => userEvent.click(startRecipe));
  });

  test('se o elemento ingredientes é renderizado na tela', async () => {
    const ingId = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingId).toBeInTheDocument();
  });

  test('se o elemento instruções é renderizado na tela', async () => {
    const instructionsId = await screen.findByTestId('instructions');
    expect(instructionsId).toBeInTheDocument();
  });

  test('se o elemento ingredientes é renderizado na tela', async () => {
    const ingId = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingId).toBeInTheDocument();
  });

  test('Se é possível clickar em start recipe', async () => {
    const startRecipe = screen.getByTestId(START_RECIPE_BUTTON);
    await act(() => userEvent.click(startRecipe));
  });

  test('se o elemento vídeo é renderizado na tela', async () => {
    const videoId = await screen.findByTestId('video');
    expect(videoId).toBeInTheDocument();
  });
});

const mealMockInProgressAllChecked = {
  drinks: {},
  meals: {
    52771: [
      '1/2 teaspoonitalian seasoning',
      '1/2 teaspoonred chile flakes',
      '1 tin chopped tomatoes',
      '3 clovesgarlic',
      '1/4 cupolive oil',
      '1 poundpenne rigate',
      'spinklingParmigiano-Reggiano',
      '6 leavesbasil',
    ],
  },
};

describe('Testes para RecipeDetails.js quando existe uma receita incompleta', () => {
  let mockedStorage;
  beforeEach(async () => {
    // Mock localStorage
    mockedStorage = {
      inProgressRecipes: JSON.stringify(mealMockInProgressAllChecked),
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    await act(async () => history.push('/meals/52771'));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Se o botão mudou para continue recipe', () => {
    const startRecipe = screen.getByTestId(START_RECIPE_BUTTON);
    expect(startRecipe).toHaveTextContent('Continue Recipe');
  });
});

describe('Testes para RecipeDetails.js quando existe uma receita finalizada', () => {
  let mockedStorage;
  beforeEach(async () => {
    // Mock localStorage
    mockedStorage = {
      doneRecipes: JSON.stringify([{ id: '52771' }]),
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    await act(async () => history.push('/meals/52771'));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Se quando a receita está completa some o botão', () => {
    expect(screen.queryByTestId(START_RECIPE_BUTTON)).toBeInTheDocument();
  });
});
