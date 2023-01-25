import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

function Searchbar(props) {
  const [currentlySelected, setCurrentlySelected] = useState('');
  const [textSearch, setTextSearch] = useState('');
  // Context dos links ainda deve ser implementado
  const { setSearchAPIReponse } = useContext(linksContext);
  const { fetchData } = useFetch();

  const redirectTo = (route) => {
    const { history } = props;
    history.push(route);
  };

  const triggerSearch = async () => {
    const { type } = props;
    // Se a rota for drink, o nome do site é cocktail, senão é meal
    let siteName;
    if (!type || type === 'drink') {
      siteName = 'cocktail';
    } else {
      siteName = type;
    }

    // Se o radio selecionado for ingrediente ('i'), então o link é filter, senão é search
    const decideFilterOrSearch = currentlySelected === 'i' ? 'filter' : 'search';

    // Componente  recebe na rota se é meal or cocktail por meio da chave type
    const URL = `https://www.the${siteName}db.com/api/json/v1/1/${decideFilterOrSearch}.php?${currentlySelected}=${textSearch}`;

    const arrayOfLinks = await fetchData(URL);

    if (arrayOfLinks.length === 1) {
      const linkUnico = arrayOfLinks[0];
      // Ex de rota: /drinks/1234
      const rota = `/${type}/${linkUnico[idDrink]}`;
      redirectTo(rota);
    }

    setSearchAPIReponse(arrayOfLinks);
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
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Searchbar;
