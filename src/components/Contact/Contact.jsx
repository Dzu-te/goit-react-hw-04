import styles from "./Contact.module.css";

export const Contact = (props) => {
  return (
    <>
      <li className={styles.listItem}>
        {props.name}: {props.number}
        <button onClick={props.onDelete}>Delete</button>
      </li>
    </>
  );
};
