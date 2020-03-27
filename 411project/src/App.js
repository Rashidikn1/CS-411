import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import SearchIngredient from "./components/search.component";

function App() {
  return (
    <Router>
      <div>
        {/*Comments are dumb in JSX, Navbar adds the navigation bar */}
        <Navbar />
        <br />
        <div className="container">
          {/* I believe this is where we add routes to the different parts of the website */}
          <Route path="/search" exact component={SearchIngredient} />
        </div>
      </div>
    </Router>
  );
}

export default App;
