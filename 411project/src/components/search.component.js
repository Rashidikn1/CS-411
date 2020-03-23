import React, { Component } from 'react';

export default class SearchIngredient extends Component{
  constructor(props){
    super(props);
    //We need to bind "this" keyword in order for things to work correctly
    this.onUpdateSearchItem = this.onUpdateSearchItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state ={
      searchItem: ''
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
      </div>
    )
  }
}
