import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Tests for Profile.js', () => {
  let myHistory;
  let mockedStorage;
  beforeEach(async () => {
    // Mocking local storage
    mockedStorage = {
      user: JSON.stringify({ email: 'coolemailrighthere@gmail.com' }),
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockedStorage[key]),
        setItem: jest.fn((key, value) => {
          mockedStorage[key] = value;
        }),
        clear: jest.fn(() => { mockedStorage = {}; }),
      },
    });
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    await act(() => history.push('/profile'));
    myHistory = history;
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Button test', async () => {
    const logoutBTN = screen.getByTestId('profile-logout-btn');
    expect(logoutBTN).toBeInTheDocument();
    userEvent.click(logoutBTN);
    await waitFor(() => expect(myHistory.location.pathname).toBe('/'));
  });
});
describe('Tests for Profile.js quando o localStorage está vazio', () => {
  let myHistory;
  beforeEach(async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    await act(() => history.push('/profile'));
    myHistory = history;
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Button test', async () => {
    const logoutBTN = screen.getByTestId('profile-logout-btn');
    expect(logoutBTN).toBeInTheDocument();
    userEvent.click(logoutBTN);
    await waitFor(() => expect(myHistory.location.pathname).toBe('/'));
  });
});
