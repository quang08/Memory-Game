import React, { useState } from "react";

function MemoryGame() {
  const [grid, setGrid] = useState([
    [1, 3, 2, 4],
    [2, 1, 5, 4],
    [0, 5, 3, 0],
  ]);

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false)), //create a 2d array of false values with the same dimensions as the grid
  );

  const [previousClick, setPreviousClick] = useState();

  function handleClicked(rowIndex, colIndex) {
    //reveal clicked card
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);

    const clickedValue = grid[rowIndex][colIndex];
    
    if(previousClick) { //if one card has already been clicked prior
      const previousClickNumber = grid[previousClick.row][previousClick.col]; //get the value of the previous click

      if(previousClickNumber !== clickedValue) { //if the two cards do not match
        setTimeout(() => { //hide them again after 1 second
          const newRevealedGrid = [...revealedGrid]; //create a copy of the revealed grid
          newRevealedGrid[rowIndex][colIndex] = false; //hide the clicked card
          newRevealedGrid[previousClick.row][previousClick.col] = false; //hide the previous card
          setRevealedGrid(newRevealedGrid); //update the revealed grid
        }, 1500);
      }
      setPreviousClick(null); //reset the previous click to null so that the next click will be the first click again

    } else { //if no card has been clicked prior 
      setPreviousClick({row: rowIndex, col: colIndex}); //set the previous click to the current click 
    }
  }

  return (
    <div className="h-1/2 w-1/2 mx-auto text-center p-5 md:max-w-md">
      <div>
        {grid.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center items-center gap-4 mb-4"
          >
            {row.map((col, colIndex) => (
              <div
                className="bg-white text-3xl text-black h-16 w-40 flex items-center justify-center cursor-pointer hover:bg-blue-500/80 transition duration-300"
                key={colIndex}
                onClick={() => handleClicked(rowIndex, colIndex)}
              >
                {revealedGrid[rowIndex][colIndex] ? col : " "} 
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
