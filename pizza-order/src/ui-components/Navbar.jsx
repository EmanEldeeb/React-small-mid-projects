import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    setSearch("");
    navigate(`/order/${search}`);
  }
  return (
    <header>
      <Link to={"/"}>pizza co.</Link>
      <Link to={"/menu"}>menu</Link>
      <Link to={"/cart"}>cart</Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </header>
  );
}

export default Navbar;
