import { getColors } from "../../service/utils";
import React from "react";

import styles from "./Block.module.scss";

export const Block = ({ num }) => {
  if(true){
  return (
    <div
      className={styles.block}
      style={{
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num !== 0 ? num : ""}
    </div>
  );
  }
  else{
    return (
      
    <div
      className={styles.block}
      style={{
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num !== 0 ? num : ""}
    </div>
  
    )
  }
};
