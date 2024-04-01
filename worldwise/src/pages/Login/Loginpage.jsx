import styles from "./Login.module.css";
import PageNav from "../../components/PageNav/PageNav";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Loginpage() {
  const navigtor = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form}>
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
          <button
            className="cta"
            onClick={() => {
              navigtor("/app");
            }}
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

export default Loginpage;
