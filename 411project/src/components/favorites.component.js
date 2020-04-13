import React, { Component } from "react";
const axios = require("axios");

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    //Make network request to Mongo database to get the list of favorites
    console.log("hello");

    axios.get("/favorites").then(res => {
      this.setState({ favorites: res.data.favorites });
    });
  }
  render() {
    if (this.state.favorites !== null) {
      return (
        <div>
          <h1>Favorites List</h1>
          <ul>
            {this.state.favorites.map(recipe => {
              return <li ><a href={recipe.recipeURL} target="_blank">{recipe.recipeTitle}</a></li>;
            })}
          </ul>
        </div>
      );
    } else {
        return (<div></div>)
    }
  }
}
