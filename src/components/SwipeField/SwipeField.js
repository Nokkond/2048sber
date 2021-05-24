import {
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeUp,
} from "../../service/swipes";
import { Block } from "../Block";
import Swipe from "react-easy-swipe";
import React from "react";
import { useGameDataContext } from "../../service/contexts";

export const SwipeField = () => {
  const { data, setData, addNumber } = useGameDataContext();

  const gameDataContext = { data, setData, addNumber };
  return (
    <Swipe
     onSwipeStart ={() => {console.log('Start swiping...')
    }}
      
      
      onSwipeDown={() =>  swipeDown(false, gameDataContext)}
      onSwipeLeft={() => swipeLeft(false, gameDataContext)}
      onSwipeRight={() => swipeRight(false, gameDataContext)}
      onSwipeUp={() => swipeUp(false, gameDataContext)}
      
      style={{ overflowY: "hidden" }}
    >
      {data.map((row, oneIndex) => {
        return (
          <div style={{ display: "flex" }} key={oneIndex}>
            {row.map((digit, index) => (
              <Block num={digit} key={index} />
            ))}
          </div>
        );
      })}
    </Swipe>
  );
};
