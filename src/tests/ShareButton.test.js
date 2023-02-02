import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Tests for shareButton.js', () => {
  let myHistory;

  beforeEach(async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
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

    await waitFor(() => {
      expect(screen.queryByText(/Link copied!/)).not.toBeInTheDocument();
    });
  });
});
