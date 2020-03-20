import React, { Component } from "react";
import "./filter-toggles.css";
import PokedexApiService from "../../services/pokedex-service";
import Select from "react-select";

export default class FilterToggles extends Component {
  state = {
    types: [],
    weaknesses: [],
    hasError: false
  };

  componentDidMount() {
    let types = [];
    let weaknesses = [];
    PokedexApiService.getPokemon()
      .then(pokemon => {
        console.log(pokemon);
        pokemon.pokemon.map(poke => {
          types = [...types, ...poke.type];
          weaknesses = [...weaknesses, ...poke.weaknesses];
        });
        types = Array.from(new Set(types));
        weaknesses = Array.from(new Set(weaknesses));

        //format
        for (let i in types) {
          types[i] = { value: types[i], label: types[i] };
        }
        for (let i in weaknesses) {
          weaknesses[i] = { value: weaknesses[i], label: weaknesses[i] };
        }

        console.log(types);
        this.setState({ types: types, weaknesses: weaknesses });
      })
      .catch(err => {
        this.setState({ hasError: true });
        console.log(err);
      });
  }

  render() {
    return (
      !this.state.hasError && (
        <section className="filter-toggles">
          <label className="filter-label">Filters: </label>
          <Select
            defaultValue={null}
            placeholder="Type..."
            isMulti
            autosize={false}
            onChange={this.props.handleTypeFilter}
            className="type-filter"
            options={this.state.types}
          />

          <Select
            defaultValue={null}
            placeholder="Weaknesses..."
            onChange={this.props.handleWeaknessFilter}
            isMulti
            autosize={false}
            className="weakness-filter"
            options={this.state.weaknesses}
          />
        </section>
      )
    );
  }
}
