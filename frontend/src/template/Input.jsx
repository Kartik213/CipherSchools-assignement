import styles from "./Input.module.scss";

const Input = ({ img, title, disabled }) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <div className={styles.input_container}>
        <img src={img} className={styles.icon} alt={title} />
        <input
          disabled={disabled}
          className={styles.input}
          placeholder={title}
        />
        {!disabled && (
          <img src={"/pencil.svg"} className={styles.pencil_icon} alt={title} />
        )}
      </div>
    </div>
  );
}
export default Input