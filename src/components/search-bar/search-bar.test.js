import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import SearchBar from "./search-bar";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
