import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Tests for Profile.js', () => {
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
  test('Button test', () => {
    const logoutBTN = screen.getByTestId('profile-logout-btn');
    expect(logoutBTN).toBeInTheDocument();
    userEvent.click(logoutBTN);
    // expect(localStorage).clear();
    expect(myHistory.location.pathname).toBe('/');
  });
});
