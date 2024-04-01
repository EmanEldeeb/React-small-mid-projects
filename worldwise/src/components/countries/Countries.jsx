import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";
function Countries({ cityListData }) {
  const uniqueCountries = cityListData.reduce((arr, city) => {
    if (!arr.includes(city.country)) {
      console.log(city.country);
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
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