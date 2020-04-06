import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "./api";

/**
 * RecipeModal Component
 *
 * This is essentially a wrapper component for the bootstrap modal component.
 * I used this wrapper in order to dynamically change the modal for every recipe
 *
 * Recipe information is passed via props from the parent component
 * onComponentUpdate checks if the modal has changed its props (recipe) and calls the Nutritionix API to recalculate nutrients
 */
export default class recipeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: null,
      total_carbs: 0,
      total_cal: 0,
      total_protein: 0,
      total_fat: 0
    };
  }
  
  /**
   * Called everytime the component updates (states, props, etc)
   * @param {*} prevProps the props of the component before it updated
   */
  componentDidUpdate(prevProps) {
    //Checking to see if the props (recipe) has changed
    if (this.props.recipe !== prevProps.recipe) {
      const queryArray = this.props.recipe.recipe.ingredientLines.map(i => i); //creating an array of the ingredient lines from the recipe JSON

      const queryString = queryArray.join(", "); //combining the array into a comma-seperated string
      //console.log(queryString);

      const data = {
        query: queryString //string for request to OUR server
      };

      axios.post(`/nutrition`, data).then(res => {
        //We only enter here once we receive a response (hence .then() )

        //calculate the nutrient totals
        const carbs = res.data.foods
          .map(i => parseFloat(i.nf_total_carbohydrate))
          .reduce((a, b) => a + b, 0);

        const protein = res.data.foods
          .map(i => parseFloat(i.nf_protein))
          .reduce((a, b) => a + b, 0);

        const fat = res.data.foods
          .map(i => parseFloat(i.nf_total_fat))
          .reduce((a, b) => a + b, 0);

        const calories = res.data.foods
          .map(i => parseFloat(i.nf_calories))
          .reduce((a, b) => a + b, 0);
        //set the state of our search results to the response from our server
        this.setState({
          foods: res.data.foods,
          total_carbs: carbs,
          total_cal: calories,
          total_protein: protein,
          total_fat: fat
        });
      });
    }
  }

  render() {
    const recipe = this.props.recipe; //I'm not sure this is necessary but it makes it easier to access
    if (this.props.show) {
      return (
        <Modal
          show={this.props.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={this.props.onClose} //callback function for when we close the modal
        >
          <Modal.Header closeButton>
            <Modal.Title>{recipe.recipe.label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <h4>Ingredients</h4>
                </Col>
                <Col>
                  <h4>Nutritional Info</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ul>
                    {this.props.recipe.recipe.ingredientLines.map(
                      ingredient => {
                        return <li>{ingredient}</li>;
                      }
                    )}
                  </ul>
                </Col>
                <Col>
                  <h6>Estimated Macronutrients</h6>
                  <ul>
                    <li>Calories: {this.state.total_cal}</li>
                    <li>Carbohydrates: {this.state.total_carbs}</li>
                    <li>Protein: {this.state.total_protein}</li>
                    <li>Fat: {this.state.total_fat}</li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      );
    } else {
      return null;
    }
  }
}
