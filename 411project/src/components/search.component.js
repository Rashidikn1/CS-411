import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card'

export default class SearchIngredient extends Component{
  constructor(props){
    super(props);
    //We need to bind "this" keyword in order for things to work correctly
    this.onUpdateSearchItem = this.onUpdateSearchItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state ={
      searchItem: '',
      searchResults: []
    }
  }

  onUpdateSearchItem(e) {
    this.setState({
      searchItem: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state.searchItem);

    const search = {
      searchItem: this.state.searchItem
    }

    axios.post('http://localhost:5000/search', search)
      .then(res => {
        console.log(res);
        this.setState({ searchResults: res.data.hits});
        console.log(this.state.searchResults)
      });
  }

  render() {
    return (
      <div>
        <h3> Search by Ingredient </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <label> Search: </label>
          <input type="text"
            required
            className="form-control"
            value={this.state.searchItem}
            onChange={this.onUpdateSearchItem}
            />
          </div>
        </form>

          
        <div className = "row">
            {this.state.searchResults.map((recipe,index) => {
              return (
                <div className ="px-2 py-2 mx-auto">
                <Card style ={{width: '18rem'}}>
                  <Card.Img variant="top" src={recipe.recipe.image}/>
                  <Card.Body>
                  <Card.Title>{recipe.recipe.label}</Card.Title>
                  <Card.Text>Test</Card.Text>
                  </Card.Body>
                </Card>
                </div>

              )})}
        </div>


      </div>
    )
  }
}
