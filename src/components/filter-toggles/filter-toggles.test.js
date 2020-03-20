import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import FilterToggles from "./filter-toggles";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
      <FilterToggles />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});