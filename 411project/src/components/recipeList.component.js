import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/**
 * RecipeList Component
 *
 * this component is in charge of rendering out the grid of recipes. All changes to that section are done here
 * The recipe grid is re-rendered every time that the parent component(search.component.js) updates the state of the searchresults
 */
export default class recipeList extends Component {
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
                  <Card>
                    {/** Due to how the json response is formatted we need to do recipe.recipe */}
                    <Card.Img variant="top" src={recipe.recipe.image} />
                    <Card.Body>
                      <Card.Title>{recipe.recipe.label}</Card.Title>
                      <Card.Text>{recipe.recipe.source}</Card.Text>
                      <Button
                        href={recipe.recipe.url}
                        target="_blank"
                        variant="outline-dark"
                      >
                        Let's cook
                      </Button>
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
