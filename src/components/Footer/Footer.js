import React from "react";

import styles from "./Footer.module.scss";
import { useGameDataContext } from "../../service/contexts";

export const Footer = () => {
  return (
    <div>
    
      
      
    <p className={styles.footer}>
      <strong>Как играть:</strong> Используйте голосовые команды <strong>вверх, вниз, влево, вправо</strong> чтобы двигать блоки. Когда два блока с одинаковым значением соприкасаются, они{" "}
      <strong>объединяются в один!</strong>
    </p>
    </div>
  );
};
