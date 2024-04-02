// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Loginpage from "./pages/Login/Loginpage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Pricing from "./pages/Pricing/Pricing";
import Product from "./pages/Product/Product";
import AppLayout from "./pages/AppLayout/AppLayout";
import Cities from "./components/cities/Cities";
import Countries from "./components/countries/Countries";
import { useEffect, useState } from "react";
import CityDetails from "./components/CityDetails/CityDetails";
import Form from "./components/Form/Form";

function App() {
  // const [count, setCount] = useState(0);
  const [cityListData, setcityListData] = useState([]);
  const [isloading, setIsloding] = useState(false);

  useEffect(() => {
    setIsloding(true);
    fetch("http://localhost:1000/cities")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setcityListData(data);
        setIsloding(false);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage></Homepage>}></Route>
          <Route path="/" element={<Homepage></Homepage>}></Route>
          <Route path="home" element={<Homepage></Homepage>}></Route>
          <Route path="app" element={<AppLayout></AppLayout>}>
            <Route
              index
              element={<Navigate replace to={"cities"}></Navigate>}
            ></Route>
            <Route
              path="cities"
              element={
                <Cities
                  cityListData={cityListData}
                  isloading={isloading}
                ></Cities>
              }
            ></Route>
            <Route
              path="cities/:id"
              element={<CityDetails></CityDetails>}
            ></Route>
            <Route
              path="countries"
              element={<Countries cityListData={cityListData}></Countries>}
            ></Route>
            <Route path="form" element={<Form></Form>}></Route>
          </Route>

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
