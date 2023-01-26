import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LinkProvider from '../../context/linkContext/LinkProvider';

const renderWithRouterAndProvider = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <LinkProvider>
        <Router history={ history }>{ component }</Router>
      </LinkProvider>,
    ),
    history,
  });
};

export default renderWithRouterAndProvider;
