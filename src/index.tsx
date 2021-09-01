import React from "react";
import { render } from "react-dom";
import AutocompleteInput from "./autocomplete-input";
import "./index.css";

render(
    <AutocompleteInput onRowSelect={() => {}}></AutocompleteInput>,
    document.getElementById("root")
);
