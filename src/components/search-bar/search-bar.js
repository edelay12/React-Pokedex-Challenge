import React, { Component } from "react";
import "./search-bar.css";

export default class SearchBar extends Component {
  render() {
    return (
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a pokemon..."
        onChange={e => this.props.handleSearch(e.target.value)}
      />
    );
  }
}
