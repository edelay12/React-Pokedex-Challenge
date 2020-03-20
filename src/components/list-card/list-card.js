import React from "react";
import { Link } from "react-router-dom";
import "./list-card.css";

export default function ListCard({ poke }) {
  return (
    <Link to={`/details/${poke.name}`}>
      <li className="Poke-card-li">
        <div className="Poke-header">
          <h3 className="Poke-name">{poke.name}</h3>
          <h3 className="Poke-num">{poke.num}</h3>
        </div>
        <img id="Poke-img" src={poke.img} />
        <div className="Poke-type">
          <h3 className="poke-type-title">Type</h3>
          <ul className="type-ul">
            {poke.type.map(type => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
        <div className="Poke-weakness">
          <h3 className="poke-weakness-title">Weaknesses</h3>
          <ul className="weakness-ul">
            {poke.weaknesses.map(weakness => (
              <li key={weakness}>{weakness}</li>
            ))}
          </ul>
        </div>
      </li>
    </Link>
  );
}
