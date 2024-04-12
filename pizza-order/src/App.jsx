import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Cart from "./features/Cart/Cart";
import AppLayout from "./ui-components/AppLayout";
import Home from "./ui-components/Home";
import Menu, { loader as menuLoader } from "./features/Menu/Menu";
import CreateOrder, {
  action as createOrderAction,
} from "./features/Order/CreateOrder";
import Order, { loader as orderLoader } from "./features/Order/Order";
import Error from "./ui-components/Error";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "home", element: <Navigate replace to={"/"}></Navigate> },
      { path: "cart", element: <Cart></Cart> },
      {
        path: "menu",
        element: <Menu></Menu>,
        loader: menuLoader,
        errorElement: <Error></Error>,
      },
      {
        path: "order/new",
        element: <CreateOrder></CreateOrder>,
        action: createOrderAction,
      },
      {
        path: "order/:id",
        element: <Order></Order>,
        loader: orderLoader,
        errorElement: <Error></Error>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
