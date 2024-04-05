import styles from "./Login.module.css";
import PageNav from "../../components/PageNav/PageNav";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";

function Loginpage() {
  const navigtor = useNavigate();
  const [email, setEmail] = useState("eman@gmail.com");
  const [password, setPassword] = useState("123456");
  const { login, isLogged } = UseAuth();
  function handlelogin(e) {
    e.preventDefault();
    login(email, password);
  }
  useEffect(() => {
    console.log("eman");
    if (isLogged) navigtor("/app");
  }, [isLogged]);
  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form} onSubmit={handlelogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className="cta">Login</button>
        </div>
      </form>
    </main>
  );
}

export default Loginpage;
