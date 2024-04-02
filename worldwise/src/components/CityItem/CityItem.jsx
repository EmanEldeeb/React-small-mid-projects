import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function CityItem({ city }) {
  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={styles.cityItem}
      >
        <span>{city.emoji}</span>
        <h3>{city.cityName}</h3>
        <time>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn}>x</button>
      </Link>
    </li>
  );
}

export default CityItem;
