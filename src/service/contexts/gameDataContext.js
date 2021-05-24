import React, { useCallback, useContext, useState } from "react";
import { swipeDown, swipeLeft, swipeRight, swipeUp } from "../swipes";
import cloneDeep from "lodash.clonedeep";

export const GameDataContext = React.createContext({});

export const GameDataProvider = ({ children }) => {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const initializeGame = () => {
    // console.log("CALLING INITIALIZE");

    let newGrid = cloneDeep(data);
    console.log(newGrid);

    addNumber(newGrid);
    console.table(newGrid);
    addNumber(newGrid);
    console.table(newGrid);
    setData(newGrid);
  };

  const resetGame = () => {
    setGameOver(false);
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addNumber(emptyGrid);
    addNumber(emptyGrid);
    setData(emptyGrid);
  };

  const [gameOver, setGameOver] = useState(false);

  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 50) {
        gridFull = true;
        checkGameOver();
      }
    }
  };

  const checkGameOver = useCallback(() => {
    const checkers = [
      swipeLeft(true, { data, setData, addNumber }),
      swipeDown(true, { data, setData, addNumber }),
      swipeRight(true, { data, setData, addNumber }),
      swipeUp(true, { data, setData, addNumber }),
    ].map((e) => JSON.stringify(e));

    const stringifyData = JSON.stringify(data);

    if (!checkers.some((e) => e !== stringifyData)) {
      alert("game over");
      setGameOver(true);
    }
  }, [addNumber, data]);

  const value = {
    data,
    setData,
    gameOver,
    setGameOver,
    checkGameOver,
    addNumber,
    initializeGame,
    resetGame,
  };

  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  );
};

export const useGameDataContext = () => useContext(GameDataContext);
