import React from "react";
import classnames from "classnames";
import lodash from "lodash";

type Props = {
    onRowSelect: (value: string) => void
};

const AutocompleteInput = ({ onRowSelect }: Props) => {
    return (
        <div className="autocomplete-control" role="search">
            <input className="autocomplete-input" />
            <div className="autocomplete-list" role="listbox"></div>
        </div>
    );
};

export default AutocompleteInput;
