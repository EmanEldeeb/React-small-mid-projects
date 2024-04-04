import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";
import { useCity } from "../../context/cityContext";
function Countries() {
  const { cityListData } = useCity();
  const uniqueCountries = cityListData.reduce((arr, city) => {
    console.log("arr", arr, city.country);
    if (arr.findIndex((item) => item.country === city.country) === -1) {
      console.log("u", city.country);
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem country={country} key={country.country}></CountryItem>
      ))}
    </ul>
  );
}

export default Countries;
