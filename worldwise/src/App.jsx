// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Loginpage from "./pages/Login/Loginpage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Pricing from "./pages/Pricing/Pricing";
import Product from "./pages/Product/Product";
import AppLayout from "./pages/AppLayout/AppLayout";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage></Homepage>}></Route>
          <Route path="/" element={<Homepage></Homepage>}></Route>
          <Route path="home" element={<Homepage></Homepage>}></Route>
          <Route path="app" element={<AppLayout></AppLayout>}></Route>
          <Route path="login" element={<Loginpage></Loginpage>}></Route>
          <Route path="pricing" element={<Pricing></Pricing>}></Route>
          <Route path="Product" element={<Product></Product>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
