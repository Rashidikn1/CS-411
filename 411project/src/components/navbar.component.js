import React, { Component } from "react";
import { Link } from "react-router-dom";
/**
 * Navbar Component
 *
 * This component is in charge of rendering the Navbar
 */
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-dark bg-success navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Recipe Finder
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Recipes
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/search" className="nav-link">
                Search Recipe
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
