// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Useurlposition } from "../../hooks/Useurlposition";
import Message from "../Message/Message";
import { useCity } from "../../context/cityContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigator = useNavigate();
  const { addNewCity } = useCity();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setemoji] = useState("");
  const [maplat, maplng] = Useurlposition();

  useEffect(() => {
    if (!maplat || !maplng) return;
    async function getmapcity() {
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${maplat}&longitude=${maplng}`
        );
        const fetchedCity = await res.json();
        console.log(fetchedCity);
        setCityName(fetchedCity.city);
        setCountry(fetchedCity.countryName);
        setemoji(convertToEmoji(fetchedCity.countryCode));
      } catch (err) {
        console.log(err);
      }
    }
    getmapcity();
  }, [maplat, maplng]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("hi");
    console.log("Form submitted");
    const newCity = {
      cityName,
      country,
      emoji,
      notes,
      date,
      position: {
        lat: maplat,
        lng: maplng,
      },
    };
    await addNewCity(newCity);
    navigator("/app/cities");
  }

  if (!cityName)
    return <Message message="no city here chose anthor location 🤦‍♂️"></Message>;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name{country}</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          type="back"
          onclick={(e) => {
            e.preventDefault();
            navigator(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
