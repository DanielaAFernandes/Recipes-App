import { render } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LinkProvider from '../../context/linkContext/LinkProvider';

const renderWithRouterAndProvider = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <LinkProvider>
        <BrowserRouter>
          <Router history={ history }>{ component }</Router>
        </BrowserRouter>
      </LinkProvider>,
    ),
    history,
  });
};

export default renderWithRouterAndProvider;
