import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';

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
          exact
          render={ (props) => <RecipeDetails { ...props } type="drink" /> }
        />
        <Route
          path="/meals/:id"
          exact
          render={ (props) => <RecipeDetails { ...props } type="meal" /> }
        />
        <Route
          path="/meals"
          exact
          render={ (props) => <Recipes { ...props } type="meal" /> }
        />
        <Route
          path="/drinks"
          exact
          render={ (props) => <Recipes { ...props } type="drink" /> }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } type="meal" /> }
        />

        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } type="drink" /> }
        />

        <Route path="/profile" render={ (props) => <Profile { ...props } /> } />
        <Route path="/done-recipes" render={ (props) => <DoneRecipes { ...props } /> } />
        <Route
          path="/favorite-recipes"
          render={ (props) => <FavoriteRecipes { ...props } /> }
        />

      </div>
    </div>
  );
}

export default App;
