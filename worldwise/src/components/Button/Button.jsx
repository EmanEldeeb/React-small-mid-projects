import styles from "./Button.module.css";
function Button({ type, children, onclick }) {
  return (
    <div onClick={onclick} className={`${styles[type]} ${styles.btn}`}>
      {children}
    </div>
  );
}

export default Button;
