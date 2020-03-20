import React, { Component } from "react";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import PokedexApiService from "./services/pokedex-service";
import PokemonList from "./routes/main-pokemon-list/main-pokemon-list";
import PokemonDetails from "./routes/pokemon-details/pokemon-details";
import "./App.css";
import SearchBar from "./components/search-bar/search-bar";
import FilterToggles from "./components/filter-toggles/filter-toggles";

class App extends Component {
  constructor() {
    super();
    this.pokemon = [];
    this.state = { hasError: false, pokemon: [] };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  handleTypeFilter = types => {
    if (this.props.location !== "/") {
      this.props.history.push("/");
    }

    let valuesToCheck = [];
    if (types) {
      console.log(types);
      for (let i in types) {
        valuesToCheck.push(types[i].value);
      }
      let results = this.pokemon.filter(pokemon => {
        return valuesToCheck.every(v => pokemon.type.includes(v));
      });
      this.setState({ pokemon: results });
    } else this.setState({ pokemon: this.pokemon });
  };

  handleWeaknessFilter = weaknesses => {
    if (this.props.location !== "/") {
      this.props.history.push("/");
    }

    console.log(weaknesses);
    let valuesToCheck = [];
    if (weaknesses) {
      for (let i in weaknesses) {
        valuesToCheck.push(weaknesses[i].value);
      }
      console.log(valuesToCheck);

      let results = this.pokemon.filter(pokemon => {
        //let check =  (arr, target) => target.every(v => arr.includes(v)
        return valuesToCheck.every(v => pokemon.weaknesses.includes(v));
      });
      console.log(results);
      this.setState({ pokemon: results });
    } else this.setState({ pokemon: this.pokemon });
  };

  handleSearch = e => {
    if (this.props.location !== "/") {
      this.props.history.push("/");
    }

    if (!e == "" || null) {
      let searchTerm = e;
      let results = this.pokemon.filter(pokemon => {
        return pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase());
      });
      this.setState({ pokemon: results });
    } else this.setState({ pokemon: this.pokemon });
  };

  componentDidMount() {
    PokedexApiService.getPokemon()
      .then(pokemon => {
        this.setState({ pokemon: pokemon.pokemon });
        this.pokemon = pokemon.pokemon;
      })
      .catch(err => {
        this.setState({ hasError: true });
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to={`/`}>
            <span className="App-logo">Pokedex</span>
          </Link>
        </header>

        <section className="App-search">
          <SearchBar handleSearch={this.handleSearch} />
          <FilterToggles
            handleTypeFilter={this.handleTypeFilter}
            handleWeaknessFilter={this.handleWeaknessFilter}
          />
        </section>

        <main role="main" className="App-main">
          {this.state.hasError && (
            <span className="error">Sorry, there was an error</span>
          )}

          <Switch>
            <Route
              exact
              path={"/"}
              render={props => <PokemonList pokemon={this.state.pokemon} />}
            />
            <Route
              exact
              path={"/details/:pokemon"}
              render={props => <PokemonDetails pokemon={this.state.pokemon} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
