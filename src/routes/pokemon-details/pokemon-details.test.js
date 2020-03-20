import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import PokemonDetails from "./pokemon-details";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <PokemonDetails />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
