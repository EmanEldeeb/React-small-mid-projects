import styles from "./Sidebar.module.css";
import Logo from "../../components/Logo/Logo";
import AppNav from "../AppNav/AppNav";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>
      <Outlet></Outlet>
    </div>
  );
}

export default Sidebar;
