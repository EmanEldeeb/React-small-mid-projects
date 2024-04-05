// import { useEffect } from "react";
import { useEffect } from "react";
import { UseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Routeprotection({ children }) {
  const { isLogged } = UseAuth();
  const navigtor = useNavigate();
  useEffect(() => {
    if (!isLogged) navigtor("/login");
  }, [isLogged, navigtor]);
  return isLogged ? children : null;
}

export default Routeprotection;
