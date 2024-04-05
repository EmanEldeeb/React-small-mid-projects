import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import styles from "./AppLayout.module.css";
import User from "../../../extra/User";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <User></User>
      <Map></Map>
    </div>
  );
}

export default AppLayout;
