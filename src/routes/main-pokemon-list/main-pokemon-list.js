import React from "react";
import ListCard from "../../components/list-card/list-card";
import "./main-pokemon-list.css";

export default function PokemonList({ pokemon }) {
  return (
    <ul className="Pokemon-list-ul">
      {pokemon.length === 0 ? (
        <li>
          <span className="not-found-span">No Pokemon found...</span>
        </li>
      ) : (
        pokemon.map(pokemon => <ListCard key={pokemon.name} poke={pokemon} />)
      )}
    </ul>
  );
}
