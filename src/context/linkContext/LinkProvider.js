import { useMemo } from 'react';
import PropTypes from 'prop-types';
import LinkContext from './LinkContext';

function LinkProvider({ children }) {
  const [links, setLinks] = useState();
  const [searchAPIResponse, setSearchAPIReponse] = useState();

  const values = useMemo(() => ({
    links,
    setLinks,
    searchAPIResponse,
    setSearchAPIReponse,
  }), [links, searchAPIResponse]);
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
