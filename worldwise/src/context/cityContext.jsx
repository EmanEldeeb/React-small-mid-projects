import { createContext, useContext, useEffect, useState } from "react";

export const cityContext = createContext();

export function CityProvider({ children }) {
  // const [count, setCount] = useState(0);
  const [cityListData, setcityListData] = useState([]);
  const [isloading, setIsloding] = useState(false);
  const [currentCity, setcurrentcity] = useState({});

  useEffect(() => {
    setIsloding(true);
    fetch("http://localhost:1000/cities")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setcityListData(data);
        setIsloding(false);
      });
  }, []);

  function getCurrentcity(id) {
    setIsloding(true);
    fetch(`http://localhost:1000/cities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setcurrentcity(data);
        setIsloding(false);
      });
  }
  function addNewCity(newcity) {
    setIsloding(true);
    fetch(`http://localhost:1000/cities`, {
      method: "POST",
      body: JSON.stringify(newcity),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setcityListData((cities) => [...cities, newcity]);
        setIsloding(false);
      });
  }
  function deleteCity(id) {
    setIsloding(true);
    fetch(`http://localhost:1000/cities/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setcityListData((cities) => cities.filter((city) => city.id !== id));
        setIsloding(false);
      });
  }

  return (
    <cityContext.Provider
      value={{
        cityListData,
        isloading,
        getCurrentcity,
        currentCity,
        addNewCity,
        deleteCity,
      }}
    >
      {children}
    </cityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(cityContext);
  if (context === undefined)
    throw new Error("use context out of thier children");
  return context;
}
