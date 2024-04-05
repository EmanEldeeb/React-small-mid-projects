import { useContext, createContext, useReducer } from "react";
const fakeUser = {
  email: "eman@gmail.com",
  password: "123456",
};
const AuthContext = createContext();
const AuthInitialState = {
  user: null,
  isLogged: false,
};
function Reducer(state, action) {
  switch (action.type) {
    case "user/logged":
      return { ...state, isLogged: true, user: fakeUser };
    case "user/loggedout":
      return { ...state, isLogged: false, user: null };

    default:
      return new Error("undefined action");
  }
}
function Authprovider({ children }) {
  const [{ user, isLogged }, dispatch] = useReducer(Reducer, AuthInitialState);

  function login(email, password) {
    console.log("emancontext");
    if (email == fakeUser.email && password == fakeUser.password) {
      dispatch({ type: "user/logged" });
    }
  }
  function logout() {
    dispatch({ type: "user/loggedout" });
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { UseAuth, Authprovider };
