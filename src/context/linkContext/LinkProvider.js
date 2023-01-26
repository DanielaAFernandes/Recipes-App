import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LinkContext from './LinkContext';

function LinkProvider({ children }) {
  const [searchAPIResponse, setSearchAPIResponse] = useState([]);
  const [hasStartedSearchingOrFiltering, setHasStartedSearchingOrFiltering] = useState();
  const [isSearchBarToogled, setIsSearchBarToogle] = useState(true);

  const values = useMemo(() => ({
    searchAPIResponse,
    setSearchAPIResponse,
    hasStartedSearchingOrFiltering,
    setHasStartedSearchingOrFiltering,
    isSearchBarToogled,
    setIsSearchBarToogle,

  }), [hasStartedSearchingOrFiltering, searchAPIResponse, isSearchBarToogled]);

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
