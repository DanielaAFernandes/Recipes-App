import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

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

const FINISH_RECIPE_DATATESTID = 'finish-recipe-btn';
describe('Testes quando o localStorage está vazio', () => {
  let mockedStorage;

  beforeEach(async () => {
    // Mock localStorage
    mockedStorage = {
      inProgressRecipes: null,
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    // Clipboard copy mock
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    // Fetch mock
    global.fetch = jest.fn(fetch);

    const { history } = renderWithRouterAndProvider(<App />);
    await act(async () => history.push('/meals/52771/in-progress'));
  });
  afterEach(() => {
    jest.clearAllMocks();
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

  test('se o elemento instruções é renderizado na tela', async () => {
    const instructionsId = await screen.findByTestId('instructions');
    expect(instructionsId).toBeInTheDocument();
  });

  test('se o botão de compartilhar é renderizado na tela', async () => {
    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
  });

  test('se o botão de favoritar é renderizado na tela', async () => {
    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
  });

  test('se o elemento ingredientes é renderizado na tela', async () => {
    const ingId = await screen.findByTestId(`${0}-ingredient-step`);
    expect(ingId).toBeInTheDocument();
    await act(() => userEvent.click(ingId.children[0]));
    await act(() => userEvent.click(ingId.children[0]));

    const finishBtn = screen.getByTestId(FINISH_RECIPE_DATATESTID);
    expect(finishBtn).toBeDisabled();
  });
});

describe('Testes quando a receita já está completa', () => {
  let mockedStorage;

  beforeEach(async () => {
    // Mock localStorage
    mockedStorage = {
      inProgressRecipes: mealMockInProgressAllChecked,
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    // Fetch mock
    global.fetch = jest.fn(fetch);

    const { history } = renderWithRouterAndProvider(<App />);
    await act(async () => history.push('/meals/52771/in-progress'));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Se o botão finalizado está disponível na tela', () => {
    const finishBtn = screen.getByTestId(FINISH_RECIPE_DATATESTID);
    const checkboxes = screen.getAllByRole('checkbox');

    checkboxes.forEach((checkbox) => {
      if (checkbox.disabled === false) userEvent.click(checkbox);
    });
    expect(finishBtn).not.toBeDisabled();

    userEvent.click(finishBtn);
  });
});

describe('Testes quando o localStorage está vazio em drinks', () => {
  let mockedStorage;

  beforeEach(async () => {
    // Mock localStorage
    mockedStorage = {
      inProgressRecipes: null,
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    // Clipboard copy mock
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    // Fetch mock
    global.fetch = jest.fn(fetch);

    const { history } = renderWithRouterAndProvider(<App />);
    await act(async () => history.push('/drinks/178319/in-progress'));
  });
  afterEach(() => {
    jest.clearAllMocks();
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

  test('se o elemento instruções é renderizado na tela', async () => {
    const instructionsId = await screen.findByTestId('instructions');
    expect(instructionsId).toBeInTheDocument();
  });

  test('se o botão de compartilhar é renderizado na tela', async () => {
    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
  });

  test('se o botão de favoritar é renderizado na tela', async () => {
    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
  });

  test('se o elemento ingredientes é renderizado na tela', async () => {
    const ingId = await screen.findByTestId(`${0}-ingredient-step`);
    expect(ingId).toBeInTheDocument();
    await act(() => userEvent.click(ingId.children[0]));
    await act(() => userEvent.click(ingId.children[0]));

    const finishBtn = screen.getByTestId(FINISH_RECIPE_DATATESTID);
    expect(finishBtn).toBeDisabled();
  });
});

describe('Testes quando a receita já está completa', () => {
  let mockedStorage;

  beforeEach(async () => {
    // Mock localStorage
    mockedStorage = {
      inProgressRecipes: mealMockInProgressAllChecked,
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
      },
    });

    // Fetch mock
    global.fetch = jest.fn(fetch);

    const { history } = renderWithRouterAndProvider(<App />);
    await act(async () => history.push('/drinks/178319/in-progress'));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Se o botão finalizado está disponível na tela', () => {
    const finishBtn = screen.getByTestId(FINISH_RECIPE_DATATESTID);
    const checkboxes = screen.getAllByRole('checkbox');

    checkboxes.forEach((checkbox) => {
      if (checkbox.disabled === false) userEvent.click(checkbox);
    });
    expect(finishBtn).not.toBeDisabled();

    userEvent.click(finishBtn);
  });
});
