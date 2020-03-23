import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import RecipesList from "./components/recipeList.component";
import SearchIngredient from "./components/search.component";
import Table from 'react-bootstrap/Table'

function App() {
  return (
    <Router>
      <div className="container">
      {/*Comments are dumb in JSX, Navbar adds the navigation bar */}
        <Navbar />
        <br/>
        <Route path="/search" exact component ={SearchIngredient}/>
      </div>
    </Router>
  );
}

export default App;
