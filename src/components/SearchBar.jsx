// value = current text, onChange = function that receives the new text
function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="menu-search">Search menu by name</label>
      {/* controlled input: shown text always equals the value prop */}
      <input
        id="menu-search"
        type="text"
        placeholder="e.g. shawarma"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;