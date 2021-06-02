import React from "react";

import styles from "./Container.module.scss";
import { Header } from "../Header";
import { Footer } from "../Footer";

export const Container = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.gameField}>{children}</div>
      <Footer />
    </div>
  );
};
