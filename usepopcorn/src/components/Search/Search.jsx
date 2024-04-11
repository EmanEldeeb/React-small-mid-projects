import { useEffect, useRef } from "react";

function Search({ query, setQuery, handleCloseMovieDetails }) {
  const searchInputRef = useRef(null);
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);
  useEffect(() => {
    function focusHandler(e) {
      if (
        e.key === "Enter" &&
        document.activeElement !== searchInputRef.current
      ) {
        searchInputRef.current.focus();
        setQuery("");
        handleCloseMovieDetails();
      }
    }
    document.addEventListener("keydown", focusHandler);
    return () => document.removeEventListener("keydown", focusHandler);
  }, [setQuery]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInputRef}
    />
  );
}

export default Search;
