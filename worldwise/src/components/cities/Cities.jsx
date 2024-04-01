import CityItem from "../CityItem/CityItem";
import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";
function Cities({ cityListData, isloading }) {
  if (isloading) return <Spinner></Spinner>;
  return (
    <ul className={styles.cityList}>
      {cityListData.map((city) => (
        <CityItem city={city} key={city.id}></CityItem>
      ))}
    </ul>
  );
}

export default Cities;
