import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <div id="rotas">
        <Route path="/" exact render={ (props) => <Login { ...props } /> } />
        <Route
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } type="drink" /> }
        />
        <Route
          path="/meals/:id"
          render={ (props) => <RecipeDetails { ...props } type="meal" /> }
        />
        <Route path="/meals" render={ (props) => <Recipes { ...props } type="meal" /> } />
        <Route
          path="/drinks"
          render={ (props) => <Recipes { ...props } type="drink" /> }
        />
        <Route path="/profile" render={ (props) => <Login { ...props } /> } />
        <Route path="/done-recipes" render={ (props) => <Login { ...props } /> } />
        <Route path="/favorite-recipes" render={ (props) => <Login { ...props } /> } />

      </div>
    </div>
  );
}

export default App;
