import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Tests for Favoritebutton.js', () => {
  let myHistory;
  let mockedStorage = {};

  beforeEach(async () => {
    mockedStorage = {
      favoriteRecipes: JSON.stringify([{ id: '178319' }, { id: '52771' }]),
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

    // Renderiza o componente e disponibiliza o history
    const { history } = renderWithRouterAndProvider(<App />);

    // Armazena o history na variável disponivel pro scopo de describe
    myHistory = history;
  });
  afterEach(() => {
    mockedStorage = {
      favoriteRecipes: JSON.stringify([{ id: '178319' }, { id: '52771' }]),
    };
    global.fetch.mockClear();
  });

  const FAVORITE_BTN = 'favorite-btn';

  test('Se quando o botão de favoritos é clickado, o localStorage é atualizado', async () => {
    // Vai pra página do teste
    await act(() => myHistory.push('/drinks/178319'));

    const favoriteButton = screen.getByTestId(FAVORITE_BTN);
    expect(favoriteButton.className).toBe('desfavoritar');

    userEvent.click(favoriteButton);

    await waitFor(() => {
      expect(favoriteButton.className).toBe('favoritar');
    });

    const favoritedButton = screen.getByTestId(FAVORITE_BTN);
    userEvent.click(favoritedButton);
  });
  test('Se quando o botão de favoritos é clickado, o localStorage é atualizado', async () => {
    // Vai pra página do teste
    await act(() => myHistory.push('/meals/52771'));

    const favoriteButton = screen.getByTestId(FAVORITE_BTN);
    expect(favoriteButton.className).toBe('favoritar');

    userEvent.click(favoriteButton);

    await waitFor(() => {
      expect(favoriteButton.className).toBe('desfavoritar');
    });

    const favoritedButton = screen.getByTestId(FAVORITE_BTN);
    userEvent.click(favoritedButton);
  });
});
