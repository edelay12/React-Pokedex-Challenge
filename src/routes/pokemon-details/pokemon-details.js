import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PokedexApiService from "../../services/pokedex-service";
import "./pokemon-details.css";

class PokemonDetails extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: { weaknesses: [], type: [] }
    };
  }
  static defaultProps = {
    match: { params: {} }
  };

  handleClick = pokemon => {
    this.props.history.push(`/details/${pokemon}`);
    PokedexApiService.getPokemon()
      .then(response => {
        let pokeToDisplay = response.pokemon.filter(foundPokemon => {
          return foundPokemon.name == pokemon;
        })[0];
        this.setState({ pokemon: pokeToDisplay });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const { pokemon } = this.props.match.params;
    PokedexApiService.getPokemon()
      .then(response => {
        let pokeToDisplay = response.pokemon.filter(foundPokemon => {
          return foundPokemon.name == pokemon;
        })[0];
        this.setState({ pokemon: pokeToDisplay });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { pokemon } = this.state;
    return (
      <section className="pokemon-details">
        <button
          className="back-button-list"
          onClick={() => this.props.history.push("/")}
        >
          Back to list
        </button>
        <div className="details-poke-header">
          <h1 className="details-poke-name">{pokemon.name}</h1>
          <h3 className="details-poke-num">{"#" + pokemon.num}</h3>
        </div>
        <img src={pokemon.img} alt="pokemon" className="details-poke-img" />
        <div className="details-container">
          <div className="details-poke-type">
            <ul className="details-type-ul">
              <h3 className="details-type-title">Type:</h3>
              {pokemon.type && pokemon.type.map(type => <li>{type}</li>)}
            </ul>
          </div>
          <div className="details-poke-weakness">
            <ul className="details-weakness-ul">
              <h3 className="details-weaknesses-title">Weaknesses:</h3>
              {pokemon.weaknesses &&
                pokemon.weaknesses.map(weakness => <li>{weakness}</li>)}
            </ul>
          </div>
          <div className="details-height-weight">
            <h3 className="details-height">Specs:</h3>
            <span className="details-height">
              {"Height: " + pokemon.height}
            </span>
            <span className="details-weight">
              {"Weight: " + pokemon.weight}
            </span>
          </div>
          {pokemon.prev_evolution && (
            <div className="prev-container">
              <h3 className="details-prev-label">Previouse evolution:</h3>
              {pokemon.prev_evolution.map(evolution => (
                <span
                  className="details-prev"
                  onClick={() => this.handleClick(evolution.name)}
                >
                  {evolution.name}
                </span>
              ))}
            </div>
          )}
          {pokemon.next_evolution && (
            <div className="next-container">
              <h3 className="details-next-label">Next evolution(s): </h3>
              {pokemon.next_evolution.map(evolution => (
                <span
                  className="details-next"
                  onClick={() => this.handleClick(evolution.name)}
                >
                  {evolution.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default withRouter(PokemonDetails);
