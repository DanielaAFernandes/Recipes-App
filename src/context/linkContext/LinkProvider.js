import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LinkContext from './LinkContext';

function LinkProvider({ children }) {
  const [searchAPIResponse, setSearchAPIReponse] = useState([]);
  const [hasStartedSearchingOrFiltering, setHasStartedSearchingOrFiltering] = useState();

  const values = useMemo(() => ({
    searchAPIResponse,
    setSearchAPIReponse,
    hasStartedSearchingOrFiltering,
    setHasStartedSearchingOrFiltering,

  }), [hasStartedSearchingOrFiltering, searchAPIResponse]);

  return (
    <LinkContext.Provider value={ values }>
      { children }
    </LinkContext.Provider>
  );
}

LinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LinkProvider;
