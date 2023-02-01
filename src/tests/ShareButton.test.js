import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Tests for shareButton.js', () => {
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

    // execCommand fetch
    window.document.execCommand = () => {};

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

  const SHARE_BTN = 'share-btn';

  test('Se quando o botão de favoritos é clickado, o localStorage é atualizado', async () => {
    // Vai pra página do teste
    await act(() => myHistory.push('/drinks/178319'));

    const shareButton = screen.getByTestId(SHARE_BTN);

    userEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText(/Link copied!/)).toBeInTheDocument();
    });
  });
  test('Se quando o botão de favoritos é clickado, o localStorage é atualizado', async () => {
    // Vai pra página do teste
    await act(() => myHistory.push('/meals/52771'));

    const shareButton = screen.getByTestId(SHARE_BTN);

    userEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText(/Link copied!/)).toBeInTheDocument();
    });
  });
});
