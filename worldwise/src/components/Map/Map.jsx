import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchquery] = useSearchParams();
  const navigator = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigator("form")}>
      map
      <div>lat:{searchquery.get("lat")}</div>
      <div>lng:{searchquery.get("lng")}</div>
    </div>
  );
}

export default Map;
