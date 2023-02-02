import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe.only('Testes para RecipeInProgress.js', () => {
  beforeEach(async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    // await act(async () => history.push('/meals'));
    await act(async () => history.push('/meals/52771'));
    const startRecipe = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipe);
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
    userEvent.click(ingId.children[0]);
  });
});
