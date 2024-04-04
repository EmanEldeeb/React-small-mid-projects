import styles from "./Button.module.css";
function Button({ type, children, onclick }) {
  return (
    <button onClick={onclick} className={`${styles[type]} ${styles.btn}`}>
      {children}
    </button>
  );
}

export default Button;
