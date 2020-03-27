import React, { Component } from "react";
import axios from "./api";

import RecipeList from "./recipeList.component";

/**
 * Search Component
 *
 * This component creates the search page.
 *
 * note: the grid of recipes is rendered here but is defined in recipeList.component.js
 */
export default class SearchIngredient extends Component {
  constructor(props) {
    super(props);
    //We need to bind "this" keyword in order for things to work correctly
    //"this" in javascript tends to go haywire when we pass functions along as parameters
    this.onUpdateSearchItem = this.onUpdateSearchItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);

    this.state = {
      //The item we're searching for
      searchItem: "",
      //an array of the search results
      searchResults: [],
      //the current index for search results. needed for loading more results
      currentIndex: 0,
      //the max number of results that we want to display on a page
      numResults: 20
    };
  }

  //updates the state of the component when we type into the search bar
  // "e" is the search bar
  //called automatically
  onUpdateSearchItem(e) {
    this.setState({
      searchItem: e.target.value
    });
  }
  //sends out request to OUR server when search form is submitted (e.g. you click enter)
  onSubmit(e) {
    //prevents the default action from hapenning (not super sure if this is necessary)
    e.preventDefault();

    //set current index to 0 so that every new search doesnt start at the index of the previous search
    this.setState({ currentIndex: 0 });

    //variables to send out to our server to later send out via the Edamam API
    const search = {
      searchItem: this.state.searchItem,
      startIndex: 0,
      numResults: this.state.numResults
    };

    //note: this is a request going to our node server, not the Edamam server
    // ".then" allows asynchronous running of the method and is only called when we get a response
    axios.post(`/search`, search).then(res => {
      //console.log(res);

      //set the state of our search results to the response from our server
      this.setState({ searchResults: res.data.hits });
      //console.log(this.state.searchResults);
    });
  }

  //method is called when we press the load more button
  onLoadMore(e) {
    e.preventDefault();
    console.log("Loading More Results");

    const newIndex = this.state.currentIndex + this.state.numResults + 1;

    //setState is an asynchronous method, so in order to correctly change the currentIndex, we have to use a callback function
    this.setState({ currentIndex: newIndex }, () => {
      const search = {
        searchItem: this.state.searchItem,
        startIndex: this.state.currentIndex,
        numResults: this.state.numResults
      };

      axios.post("/search", search).then(res => {
        //console.log(res);
        this.setState({ searchResults: res.data.hits });
        //console.log(this.state.searchResults);
      });
    });
  }

  //We render out the search bar and the recipe grid seperately
  //note: we update the value of the search bar dynamically every time we add a letter
  render() {
    return (
      <div>
        <h3> Search by Ingredient </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Search: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.searchItem}
              onChange={this.onUpdateSearchItem}
            />
          </div>
        </form>
        {/** we pass  searchresults and loadmorefunc as parameters so that the RecipeList Component can
          access them and be updated by them  */}
        <RecipeList
          searchresults={this.state.searchResults}
          loadmorefunc={this.onLoadMore}
        ></RecipeList>
      </div>
    );
  }
}
