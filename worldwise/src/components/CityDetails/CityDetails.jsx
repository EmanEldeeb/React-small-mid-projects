import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCity } from "../../context/cityContext";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityDetails() {
  const { id } = useParams();
  const navigator = useNavigate();
  console.log(id);
  // TEMP DATA
  const { getCurrentcity, currentCity, isloading } = useCity();
  useEffect(() => {
    getCurrentcity(id);
  }, [id, getCurrentcity]);

  if (isloading) return <Spinner></Spinner>;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity.emoji}</span> {currentCity.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity.cityName} on</h6>
        <p>{formatDate(currentCity.date || null)}</p>
      </div>

      {currentCity.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onclick={() => {
            navigator(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default CityDetails;
