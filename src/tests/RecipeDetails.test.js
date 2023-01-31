import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndProvider from './render/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
// import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';

describe.only('Testes para RecipeDetails.js', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouterAndProvider(<App />);
    await act(() => history.push('/meals'));
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  //   test('se o elemento foto é renderizado na tela', async () => {
  //     const photoId = await screen.findByTestId('recipe-photo');
  //     expect(photoId).toBeInTheDocument();
  //   });

  //   test('se o elemento título é renderizado na tela', async () => {
  //     const titleId = await screen.findByTestId('recipe-title');
  //     expect(titleId).toBeInTheDocument();
  //   });

  //   test('se o elemento categoria é renderizado na tela', async () => {
  //     const categoryId = await screen.findByTestId('recipe-category');
  //     expect(categoryId).toBeInTheDocument();
  //   });

  //   test('se o elemento ingredientes é renderizado na tela', async () => {
  //     const ingId = await screen.findByTestId(`${index}-ingredient-name-and-measure`);
  //     expect(ingId).toBeInTheDocument();
  //   });

  test('se o elemento vídeo é renderizado na tela', async () => {
    const videoId = screen.getByTestId('video');
    expect(videoId).toBeInTheDocument();
  });
});
