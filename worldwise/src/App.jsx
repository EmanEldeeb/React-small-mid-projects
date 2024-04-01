// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Loginpage from "./pages/Login/Loginpage";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to={"/home"}>home</NavLink>
          <NavLink to={"/login"}>login</NavLink>
        </nav>

        <Routes>
          <Route path="home" element={<Homepage></Homepage>}></Route>
          <Route path="login" element={<Loginpage></Loginpage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
