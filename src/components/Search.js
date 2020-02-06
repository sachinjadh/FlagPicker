import React, { Fragment } from "react";

const Search = (props) => {
    const { handleOnChange, handleOnSelected,suggestions,showSuggestions,userInput,id } = props;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (suggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {suggestions.map((suggestion,index) => {
              return (
                <li
                  class="suggestions"
                  id={id}
                  key={suggestion}
                  onClick={handleOnSelected}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } 
    }

    return (
      <Fragment>
        <input
          type="text"
          id={id}
          onChange={handleOnChange}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }

export default Search;