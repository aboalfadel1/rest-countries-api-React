import React from "react";
import styles from "./cardLoader.module.css";
import classes from "../card/card.module.css"

const CardLoader = () => {
  return (
    <div className={classes.card}>
      <div className={`${styles.skeleton} ${styles.flag}`}></div>
      <div className={`${styles.skeleton} ${styles.title}`}></div>
      <div className={`${styles.skeleton} ${styles.text} ${styles.line1}`}></div>
      <div className={`${styles.skeleton} ${styles.text} ${styles.line2}`}></div>
      <div className={`${styles.skeleton} ${styles.text} ${styles.line3}`}></div>
    </div>
  );
};

export default CardLoader;
