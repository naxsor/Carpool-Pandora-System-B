import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ onPlaceSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ["geocode"] }
    );

    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      onPlaceSelect(selectedPlace);
    });
  }, [onPlaceSelect]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <input
      ref={autocompleteRef}
      type="text"
      value={searchValue}
      onChange={handleSearchChange}
      placeholder="Search location..."
    />
  );
};

export default SearchBar;
