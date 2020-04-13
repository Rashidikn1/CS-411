import React, { Component, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import RecipeModal from "./recipeModal.component";
const axios = require("axios");
/**
 * @class recipeList
 *
 * this component is in charge of rendering out the grid of recipes. All changes to that section are done here
 * The recipe grid is re-rendered every time that the parent component(search.component.js) updates the state of the searchresults
 */

export default class recipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedPost: null
    };
    this.onOpenRecipeModal = this.onOpenRecipeModal.bind(this);
    this.handleCloseRecipeModal = this.handleCloseRecipeModal.bind(this);
  }
  /**
   * Called when 'more info' button is pressed on the recipe Card
   * Sets modal show to true via state change
   *
   * @param {*} recipe a pointer to the recipe JSON object
   */

  onOpenRecipeModal(recipe) {
    console.log(recipe);
    this.setState({
      selectedPost: recipe,
      open: true
    });
  }
  /**
   * Called when the modal is closed
   *
   * sets state of open to false
   */
  handleCloseRecipeModal() {
    this.setState({
      open: false
    });
  }

  onFavoriteClick(recipe) {
    console.log("pressed favorite");
    const ingredientsArr = recipe.recipe.ingredientLines.map(i => i);
    const data = {
      username: "test",
      recipeTitle: recipe.recipe.label,
      recipeURL: recipe.recipe.url,
      ingredients: ingredientsArr
    };
    axios
      .post("/users/addfavorite", data)
      .then(() => {
        console.log("Successfully added");
      })
      .catch(err => console.log(err.json));
  }
  render() {
    {
      /** Conditional rendering will only render the list if it has more than 0 results */
    }
    if (this.props.searchresults.length != 0) {
      return (
        <div>
          <div className="row">
            {/** This maps out all the recipes in the searchresults list. index is the index of the recipe but its unused */}
            {this.props.searchresults.map((recipe, index) => {
              return (
                //this div is in charge of a single card. It NEEDS to have a unique key for accurate re rendering of the grid
                <div
                  className="w-25 px-2 py-2 mx-auto "
                  key={recipe.recipe.uri}
                >
                  <Card recipe={recipe.recipe}>
                    {/** Due to how the json response is formatted we need to do recipe.recipe */}
                    <Card.Img variant="top" src={recipe.recipe.image} />
                    <Card.Body>
                      <Card.Title>{recipe.recipe.label}</Card.Title>
                      <Card.Text>{recipe.recipe.source}</Card.Text>
                      <div className="mb-1 text-center h-100">
                        <ButtonGroup size="sm">
                          <Button
                            href={recipe.recipe.url}
                            target="_blank"
                            variant="outline-dark"
                          >
                            Website
                          </Button>
                          <Button
                            onClick={this.onOpenRecipeModal.bind(
                              recipe.recipe,
                              recipe
                            )}
                            target="_blank"
                            variant="outline-dark"
                          >
                            More info
                          </Button>
                          <Button
                            onClick={this.onFavoriteClick.bind(
                              recipe.recipe,
                              recipe
                            )}
                            variant="outline-warning"
                          >
                            Favorite
                          </Button>
                        </ButtonGroup>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
          <div>
            <Button
              variant="btn btn-success"
              block={true}
              onClick={this.props.loadmorefunc}
            >
              Load More Results
            </Button>
          </div>
          <div>
            {/* Technically speaking, every component in React has to have a place to "render".
                From what I understand so far, that means that to dynamically render something, we have to "render"
                it and then hide it if unnecessary. I know there has to be a better way to do it but thats what I got so far
                For the Modal specifically, we "render" it but set its show value to false. onClick, we call a function that sets
                show to true which triggers everything to show in the Modal.
            */}
            <RecipeModal
              show={this.state.open}
              onClose={this.handleCloseRecipeModal}
              recipe={this.state.selectedPost}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <p>Please Search for something!</p>
      </div>
    );
  }
}
