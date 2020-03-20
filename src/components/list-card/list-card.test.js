import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import ListCard from "./list-card";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const testPoke = {
    id: 1,
    num: "001",
    name: "Bulbasaur",
    img: "http://www.serebii.net/pokemongo/pokemon/001.png",
    type: ["Grass", "Poison"],
    height: "0.71 m",
    weight: "6.9 kg",
    candy: "Bulbasaur Candy",
    candy_count: 25,
    egg: "2 km",
    spawn_chance: 0.69,
    avg_spawns: 69,
    spawn_time: "20:00",
    multipliers: [1.58],
    weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
    next_evolution: [
      {
        num: "002",
        name: "Ivysaur"
      },
      {
        num: "003",
        name: "Venusaur"
      }
    ]
  };

  ReactDOM.render(
    <BrowserRouter>
      <ListCard poke={testPoke} />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
