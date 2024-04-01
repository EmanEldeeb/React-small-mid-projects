import { NavLink, Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo></Logo>
      <ul>
        <li>
          <NavLink to={"/pricing"}>pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>product</NavLink>
        </li>
        <li>
          <Link to={"/login"} className="cta">
            login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
