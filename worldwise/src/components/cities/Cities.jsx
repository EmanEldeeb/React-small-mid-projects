import CityItem from "../CityItem/CityItem";
import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";
import { useCity } from "../../context/cityContext";
function Cities() {
  const { cityListData, isloading } = useCity();
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
