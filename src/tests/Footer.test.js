import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Tests for Searchbar.js', () => {
  let myHistory;
  beforeEach(async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    myHistory = history;
    await act(() => history.push('/drinks'));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Se a aplicação é redirecionada para /drinks quando o botão é clickado', async () => {
    const redirectButton = screen.getByTestId('drinks-bottom-btn');
    expect(redirectButton).toBeInTheDocument();

    await act(() => userEvent.click(redirectButton));

    expect(myHistory.location.pathname).toBe('/drinks');
  });
  test('Se a aplicação é redirecionada para /meals quando o botão é clickado', async () => {
    const redirectButton = screen.getByTestId('meals-bottom-btn');
    expect(redirectButton).toBeInTheDocument();

    await act(() => userEvent.click(redirectButton));

    expect(myHistory.location.pathname).toBe('/meals');
  });
});
