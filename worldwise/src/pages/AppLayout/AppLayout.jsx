import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <Map></Map>
    </div>
  );
}

export default AppLayout;
