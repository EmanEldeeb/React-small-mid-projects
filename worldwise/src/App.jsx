// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Cities from "./components/cities/Cities";
import Countries from "./components/countries/Countries";
import CityDetails from "./components/CityDetails/CityDetails";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/FullSpiner/SpinnerFullPage";

import { CityProvider } from "./context/cityContext";
import { Authprovider } from "./context/AuthContext";
import Routeprotection from "./pages/Routeprotection/Routeprotection";

// import Homepage from "./pages/Home/Homepage";
// import Loginpage from "./pages/Login/Loginpage";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
// import Pricing from "./pages/Pricing/Pricing";
// import Product from "./pages/Product/Product";
// import AppLayout from "./pages/AppLayout/AppLayout";
// optimzing bundle size
const Homepage = lazy(() => import("./pages/Home/Homepage"));

const Loginpage = lazy(() => import("./pages/Login/Loginpage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const Product = lazy(() => import("./pages/Product/Product"));

const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));

function App() {
  return (
    <>
      <CityProvider>
        <Authprovider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
              <Routes>
                <Route index element={<Homepage></Homepage>}></Route>
                <Route path="/" element={<Homepage></Homepage>}></Route>
                <Route path="home" element={<Homepage></Homepage>}></Route>
                <Route
                  path="app"
                  element={
                    <Routeprotection>
                      <AppLayout></AppLayout>
                    </Routeprotection>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to={"cities"}></Navigate>}
                  ></Route>
                  <Route
                    path="cities"
                    element={
                      <Cities
                      // cityListData={cityListData}
                      // isloading={isloading}
                      ></Cities>
                    }
                  ></Route>
                  <Route
                    path="cities/:id"
                    element={<CityDetails></CityDetails>}
                  ></Route>
                  <Route
                    path="countries"
                    element={<Countries></Countries>}
                  ></Route>
                  <Route path="form" element={<Form></Form>}></Route>
                </Route>

                <Route path="login" element={<Loginpage></Loginpage>}></Route>
                <Route path="pricing" element={<Pricing></Pricing>}></Route>
                <Route path="Product" element={<Product></Product>}></Route>
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </Authprovider>
      </CityProvider>
    </>
  );
}

export default App;
