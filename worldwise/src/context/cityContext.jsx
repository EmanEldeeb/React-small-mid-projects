import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

export const cityContext = createContext();
const initialCity = {
  cityListData: [],
  isloading: false,
  currentCity: {},
};
function Reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isloading: true };
    case "cities/fetching":
      return { ...state, cityListData: action.payload, isloading: false };
    case "city/getcurrentone":
      return {
        ...state,
        currentCity: action.payload,
        isloading: false,
      };
    case "city/addnewone":
      return {
        ...state,
        cityListData: [...state.cityListData, action.payload],
        isloading: false,
        currentCity: action.payload,
      };
    case "city/delete":
      return {
        ...state,
        cityListData: state.cityListData.filter(
          (city) => city.id !== action.payload
        ),
        isloading: false,
      };
    default:
      throw new Error("undefined action");
  }
}
export function CityProvider({ children }) {
  // const [count, setCount] = useState(0);
  // const [cityListData, setcityListData] = useState([]);
  // const [isloading, setIsloding] = useState(false);
  // const [currentCity, setcurrentcity] = useState({});
  const [{ cityListData, isloading, currentCity }, dispatch] = useReducer(
    Reducer,
    initialCity
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch("http://localhost:1000/cities")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "cities/fetching", payload: data });
      });
  }, []);

  const getCurrentcity = useCallback(
    function getCurrentcity(id) {
      if (id === currentCity.id) return;
      dispatch({ type: "loading" });
      fetch(`http://localhost:1000/cities/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch({ type: "city/getcurrentone", payload: data });
        });
    },
    [currentCity.id]
  );

  function addNewCity(newcity) {
    dispatch({ type: "loading" });
    fetch(`http://localhost:1000/cities`, {
      method: "POST",
      body: JSON.stringify(newcity),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "city/addnewone", payload: data });
      });
  }
  function deleteCity(id) {
    dispatch({ type: "loading" });
    fetch(`http://localhost:1000/cities/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        dispatch({ type: "city/delete", payload: id });
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
