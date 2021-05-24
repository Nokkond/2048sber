import React from "react";

import styles from "./Footer.module.scss";
import { useGameDataContext } from "../../service/contexts";

export const Footer = () => {
  return (
    <div>
    
      
      
    <p className={styles.footer}>
      <strong>How to play:</strong> Use your <strong>arrow keys</strong> to move
      the tiles. When two tiles with the same number touch, they{" "}
      <strong>merge into one!</strong>
    </p>
    </div>
  );
};
