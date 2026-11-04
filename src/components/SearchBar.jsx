// SearchBar.jsx
// A "controlled" search box: the text shown always comes from App's state.
//
// Props (the values App passes in):
//   value    = the current search text (App's searchText state)
//   onChange = a function that receives the new text (App's setSearchText)
function SearchBar({ value, onChange }) {
  return (
    // Wrapper div. Keep "search-bar" so your Week 2 CSS still styles it.
    <div className="search-bar">
      {/* htmlFor must match the input's id. Clicking the label focuses the input,
          and screen readers announce it. (In HTML this attribute is "for",
          but React uses "htmlFor" because "for" is a reserved word in JavaScript.) */}
      <label htmlFor="menu-search">Search menu by name</label>

      {/* CONTROLLED INPUT:
          1) value={value}  -> React state decides what the box shows.
          2) onChange       -> every keystroke sends the new text back up to App,
                               App updates its state, then passes the new value down. */}
      <input
        id="menu-search"
        type="text"
        placeholder="e.g. shawarma"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // e.target.value = the full text currently typed in the box
      />
    </div>
  );
}

// "export default" lets App.jsx do: import SearchBar from "./components/SearchBar";
export default SearchBar;