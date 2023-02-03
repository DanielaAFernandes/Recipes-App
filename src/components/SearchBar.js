import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import LinkContext from '../context/linkContext/LinkContext';
import useFetch from '../hooks/useFetch';

function SearchBar(props) {
  const [currentlySelected, setCurrentlySelected] = useState('i');
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

    if (currentlySelected === 'f' && textSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    // Componente  recebe na rota se é meal or cocktail por meio da chave type
    const endpoint = `${decideFilterOrSearch}.php?${currentlySelected}=${textSearch}`;

    const arrayOfLinks = await getItem(endpoint, setSearchAPIResponse, props);
    const key = Object.keys(arrayOfLinks)[0];

    if (!arrayOfLinks[key]) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (arrayOfLinks[key].length === 1) {
      const { type } = props;
      const linkUnico = arrayOfLinks[key];
      const idKey = type === 'drink' ? 'idDrink' : 'idMeal';
      // Ex de rota: /drinks/1234
      const rota = `/${type}s/${linkUnico[0][idKey]}`;
      redirectTo(rota);
      return;
    }

    setHasStartedSearchingOrFiltering(true);
  };

  return (
    <div>
      <label className="label-search" htmlFor="search-input">
        Search:
        <input
          className="input-search"
          type="text"
          data-testid="search-input"
          onChange={ (e) => setTextSearch(e.target.value) }
        />
      </label>
      <label className="name-search-radio" htmlFor="ingredient-search-radio">
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
      <label className="name-search-radio" htmlFor="name-search-radio">
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
      <label className="name-search-radio" htmlFor="first-letter-search-radio">
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
        className="exec-search-btn"
        type="button"
        data-testid="exec-search-btn"
        onClick={ triggerSearch }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
export default SearchBar;
