import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import LinkContext from '../context/linkContext/LinkContext';
import useFetch from '../hooks/useFetch';

function Searchbar(props) {
  const [currentlySelected, setCurrentlySelected] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const { getItem } = useFetch();
  const { setSearchAPIResponse,
    setHasStartedSearchingOrFiltering } = useContext(LinkContext);

  const redirectTo = (route) => {
    const { history } = props;
    history.push(route);
  };

  const triggerSearch = async () => {
    // Se o radio selecionado for ingrediente ('i'), então o link é filter, senão é search
    const decideFilterOrSearch = currentlySelected === 'i' ? 'filter' : 'search';

    // Componente  recebe na rota se é meal or cocktail por meio da chave type
    const endpoint = `${decideFilterOrSearch}.php?${currentlySelected}=${textSearch}`;

    const arrayOfLinks = getItem(endpoint, null, props);

    if (arrayOfLinks.length === 1) {
      const linkUnico = arrayOfLinks[0];
      // Ex de rota: /drinks/1234
      const rota = `/${type}/${linkUnico[idDrink]}`;
      redirectTo(rota);
    }

    setSearchAPIResponse(arrayOfLinks);
    setHasStartedSearchingOrFiltering(true);
  };

  return (
    <div>
      <label htmlFor="search-input">
        Search
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setTextSearch(e.target.value) }
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          name="category"
          value="i"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          onChange={ (e) => setCurrentlySelected(e.target.value) }
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          name="category"
          value="s"
          data-testid="name-search-radio"
          id="name-search-radio"
          onChange={ (e) => setCurrentlySelected(e.target.value) }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          type="radio"
          name="category"
          value="f"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          onChange={ (e) => setCurrentlySelected(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ triggerSearch }
      >
        Search
      </button>
    </div>
  );
}

Searchbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Searchbar;
