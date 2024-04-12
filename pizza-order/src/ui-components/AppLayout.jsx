import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
function AppLayout() {
  const { state } = useNavigation();
  return (
    <>
      <Navbar></Navbar>
      {state === "loading" && <Spinner></Spinner>}
      <Outlet></Outlet>
    </>
  );
}

export default AppLayout;
