import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import ginDrinks from '../../cypress/mocks/ginDrinks';

describe('Tests for Searchbar.js', () => {
  let myHistory;
  beforeEach(async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    await act(() => history.push('/drinks'));
    myHistory = history;
    const showSearch = screen.getByTestId('search-top-btn');
    userEvent.click(showSearch);
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  const SEARCH_INPUT = 'search-input';
  const INGREDIENTE_SEARCH_RADIO = 'ingredient-search-radio';
  const NAME_SEARCH_RADIO = 'name-search-radio';
  const EXEC_SEARCH_BUTTON = 'exec-search-btn';

  test('Deve haver uma barra de procura e 3 opções radio', () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const ingredientInput = screen.getByTestId(INGREDIENTE_SEARCH_RADIO);
    expect(ingredientInput).toBeInTheDocument();

    const nameInput = screen.getByTestId(NAME_SEARCH_RADIO);
    expect(nameInput).toBeInTheDocument();

    const firstInput = screen.getByTestId('first-letter-search-radio');
    expect(firstInput).toBeInTheDocument();

    const execButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    expect(execButton).toBeInTheDocument();
  });
  test('Deve haver os itens especificados se for procurado por por drink com gin', async () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const ingredientInput = screen.getByTestId(NAME_SEARCH_RADIO);
    expect(ingredientInput).toBeInTheDocument();

    const execButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    expect(execButton).toBeInTheDocument();

    userEvent.type(searchInput, 'gin');
    userEvent.click(ingredientInput);
    userEvent.click(execButton);

    await waitForElementToBeRemoved(screen.getByText(/GG/));

    for (let index = 0; index < 12; index += 1) {
      const link = screen.getByText(ginDrinks.drinks[index].strDrink);
      expect(link).toBeInTheDocument();
    }
  });
  test('Se o filtro por ingrediente está funcionando', () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const ingredientInput = screen.getByTestId(INGREDIENTE_SEARCH_RADIO);
    expect(ingredientInput).toBeInTheDocument();

    const execButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    expect(execButton).toBeInTheDocument();

    userEvent.type(searchInput, 'Light rum');
    userEvent.click(ingredientInput);
    userEvent.click(execButton);
  });

  test('Se quando tem um unico link na página de bebidas, é redirecionado', () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const ingredientInput = screen.getByTestId(NAME_SEARCH_RADIO);
    expect(ingredientInput).toBeInTheDocument();

    const execButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    expect(execButton).toBeInTheDocument();

    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(ingredientInput);
    userEvent.click(execButton);
  });

  test('Se quando tem um unico link na página de carnes, é redirecionado', async () => {
    await act(() => myHistory.push('/meals'));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const ingredientInput = screen.getByTestId(NAME_SEARCH_RADIO);
    expect(ingredientInput).toBeInTheDocument();

    const execButton = screen.getByTestId(EXEC_SEARCH_BUTTON);
    expect(execButton).toBeInTheDocument();

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(ingredientInput);
    userEvent.click(execButton);
    expect(screen.getByText(/Kumpir/)).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByText(/Kumpir/));
    expect(myHistory.location.pathname).toBe('/meals/52771');
  });
  test('If alert is shown when more than one letters are inputed in first letter', () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation();

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    const ingredientInput = screen.getByTestId('first-letter-search-radio');
    const execButton = screen.getByTestId(EXEC_SEARCH_BUTTON);

    userEvent.type(searchInput, 'Ar');
    userEvent.click(ingredientInput);
    userEvent.click(execButton);

    expect(alertMock).toHaveBeenCalled();
  });
  test('If alert is shown when there is no return', async () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation();

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    const ingredientInput = screen.getByTestId('name-search-radio');
    const execButton = screen.getByTestId(EXEC_SEARCH_BUTTON);

    userEvent.type(searchInput, 'xablau');
    userEvent.click(ingredientInput);
    await act(() => {
      userEvent.click(execButton);
    });

    expect(alertMock).toHaveBeenCalled();
  });
  test('Se é possível clickar em cada categoria', async () => {
    const categoriesHolderDiv = screen.getByTestId('categories-holder');
    const categoriesButtons = categoriesHolderDiv.children;

    // Categories always have 6 buttons
    const buttonAll = categoriesButtons[0];
    const category1 = categoriesButtons[1];
    const category2 = categoriesButtons[2];
    const category3 = categoriesButtons[3];
    const category4 = categoriesButtons[4];
    const category5 = categoriesButtons[5];

    await act(() => userEvent.click(buttonAll));
    await act(() => userEvent.click(category1));
    await act(() => userEvent.click(category2));
    await act(() => userEvent.click(category3));
    await act(() => userEvent.click(category4));
    await act(() => userEvent.click(category5));

    // Test if toogling works
    await act(() => userEvent.click(category5));
  });
});
