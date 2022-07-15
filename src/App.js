// import logo from './logo.svg';
// import './App.css';

import { update } from "lodash";
import cloneDeep from "lodash.clonedeep";
import React, { useEffect, useState } from "react"
import { useEvent, getColors } from "./util";
import Swipe from "react-easy-swipe";

function App() {

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const [score, setScore] = useState(0);

  const [undoScore, setUndoScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const [ck, setCk] = useState(0);

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [undodata, setUndoData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // Initialize
  const initialize = () => {

    let newGrid = cloneDeep(data);
    // console.log(newGrid);

    addNumber(newGrid);
    //console.table(newGrid);
    addNumber(newGrid);
    //console.table(newGrid);
    setData(newGrid);

  };

  // AddNumber - Add an item
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
        // let sc = Math.random() > 0.5 ? 2 : 4;
        // newGrid[rand1][rand2] = sc;
        // setScore(sc+score);
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;;
        added = true;
      }
      if (attempts > 50) {
        gridFull = true;
        let gameOverr = checkIfGameOver();
        if (gameOverr) {
          // alert("game over");
          setGameOver(true);
        }
        // setGameOver(true);
      }
    }
  };

  //Swipe Left
  const swipeLeft = (dummy) => {
    // console.log(dummy);
    console.log("swipe left");
    let oldGrid = data;
    let newArray = cloneDeep(data);

    // console.table(newArray);
    var sc = 0;
    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;

      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        }
        else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        }
        else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        }
        else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            let temp = b[slow] + b[fast];
            sc = sc + temp;
            b[slow] = temp;
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }

    // if (sc !== 0)
    //   setScore(score + sc);

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {

      addNumber(newArray);
    }

    //   setData(newArray);
    // };

    if (dummy) {
      return newArray;
    } else {
      setScore(score + sc);
      setData(newArray);
      // setCk(!ck);
      // setCk(!ck);
    }
  };

  //Swipe Right
  const swipeRight = (dummy) => {
    console.log("swipe right");
    let oldData = data;
    let newArray = cloneDeep(data);
    var sc = 0;

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            let temp = b[slow] + b[fast];
            sc = sc + temp;
            b[slow] = temp;
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    // console.log("right");
    // console.log(sc);

    if (sc !== 0)
      setScore(score + sc);

    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {

      addNumber(newArray);
    }


    //   setData(newArray);
    // };
    if (dummy) {
      return newArray;
    } else {

      setData(newArray);
      // setCk(!ck);
      // setCk(!ck);
    }
  };

  //Swipe Up
  const swipeUp = (dummy) => {
    console.log("swipe up");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    var sc = 0;
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            let temp = b[slow][i] + b[fast][i];
            sc = sc + temp;
            b[slow][i] = temp;
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }

    if (sc !== 0)
      setScore(score + sc);

    if (JSON.stringify(oldData) !== JSON.stringify(b)) {

      addNumber(b);
    }


    //   setData(b);
    // };

    if (dummy) {
      return b;
    } else {
      setData(b);
      // setCk(!ck);
      // setCk(!ck);
    }
  };

  //Swipe Down
  const swipeDown = (dummy) => {
    console.log("swipe down");
    // console.log(data);
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    var sc = 0;
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            let temp = b[slow][i] + b[fast][i];
            sc = sc + temp;
            b[slow][i] = temp;
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    // if (sc !== 0)
    //   setScore(score + sc);
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {

      addNumber(b);
    }

    //   setData(b);
    // };

    if (dummy) {
      return b;
    } else {
      setScore(score + sc);
      setData(b);
      // setCk(!ck);
      // setCk(!ck);
    }
  };

  //Check Gameover
  const checkIfGameOver = () => {
    console.log("CHECKING GAME OVER");
    // let original = cloneDeep(data);
    let bool = true;
    // console.log(ck);
    let checker = swipeLeft(true);
    // console.table(data);
    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);
    // console.log("CHECKER DOWN");
    // console.table(data);
    // console.table(checker2);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    let checker4 = swipeUp(true);

    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }
    // console.log(ck);
    return true;
  };

  //Reset
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

  //Undo
  const undoGame = () => {
    setData(undodata);
    setScore(undoScore);
  }

  //Handle Key Down
  const handleKeyDown = (event) => {
    setUndoData(data);
    setUndoScore(score);
    setCk(1);
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        // alert("up");
        // console.log(ck);
        // console.table(data);
        // console.log(score);
        swipeUp();
        // console.log(ck);
        // console.table(data);
        // console.log(score);
        break;
      case DOWN_ARROW:
        // console.log(ck);
        // console.table(data);
        // console.log(score);
        swipeDown();
        // console.log(ck);
        // console.table(data);
        // console.log(score);
        break;
      case LEFT_ARROW:
        // console.log(ck);
        // useEffect(() => console.log(ck), [ck]);
        // console.table(data);
        // console.log(score);
        swipeLeft();
        // useEffect(() => console.log(ck), [ck]);
        // console.log(ck);
        // console.table(data);
        // console.log(score);
        break;
      case RIGHT_ARROW:
        // console.log(ck);
        // console.table(data);
        // console.log(score);
        swipeRight();
        // console.log(ck);
        // console.table(data);
        // console.log(score);
        break;
      default:
        break;
    }
    // console.log(ck);
    console.table(data);

    // let gameOverr = checkIfGameOver();
    // if (gameOverr) {
    //   // alert('game over');
    //   setGameOver(true);
    // }
  };

  //UseEffect for Initializer
  useEffect(() => {
    initialize();
    // document.addEventListener("keydown", handleKeyDown);
  }, []);

  useEvent('keydown', handleKeyDown);

  //UseEffect for Game Over Checking
  useEffect(() => {
    if (ck == 0)
      return;
    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      // alert('game over');
      setGameOver(true);
    }
  });


  return (
    <div className="App">
      <div
        style={{
          width: 345,
          margin: "auto",
          marginTop: 30,
        }}>

        {/*2048 , New Game, Undo*/}
        <div style={{ display: "flex" }}>

          {/*2048*/}
          <div
            style={{
              fontFamily: "sans-serif",
              flex: 1,
              fontWeight: "700",
              fontSize: 60,
              color: "#776e65",
            }}
          >
            2048
          </div>

          { /* New Game */}
          <div
            style={{
              flex: 1,
              marginTop: "auto",
              marginLeft: "30px",
            }}
          >
            <div onClick={resetGame} style={style.newGameButton}>
              NEW GAME
            </div>

          </div>

          {/* undo */}
          <div
            style={{
              flex: 1,
              marginTop: "auto",
              marginLeft: "30px",
            }}
          >
            <div onClick={undoGame} style={{ ...style.newGameButton, fontWeight: "900", textAlign: "center" }}>
              Undo
            </div>

          </div>
        </div>

        {/*Block Components and GameOver Overlay*/}
        <div
          style={{
            background: "#AD9D8F",
            width: "max-content",
            height: "max-content",
            margin: "auto",
            padding: 5,
            borderRadius: 5,
            marginTop: 10,
            position: "relative",
          }}
        >
          {gameOver && (
            <div style={style.gameOverOverlay}>
              <div>
                <div
                  style={{
                    fontSize: 30,
                    fontFamily: "sans-serif",
                    fontWeight: "900",
                    color: "#776E65",
                  }}
                >
                  Game Over
                </div>
                <div>
                  <div
                    style={{
                      flex: 1,
                      marginTop: "auto",
                    }}
                  >
                    <div onClick={resetGame} style={style.tryAgainButton}>
                      Try Again
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Swipe
          // onSwipeDown={() =>  swipeDown()}
          // onSwipeLeft={() => swipeLeft()}
          // onSwipeRight={() => swipeRight()}
          // onSwipeUp={() => swipeUp()}
          // style={{ overflowY: "hidden" }}
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
        </div>

        {/*Score*/}
        <div
          style={{
            flex: 1,
            marginTop: "20px",
            marginLeft: "180px",
            justifyContent: "center",
          }}
        >
          <div style={{
            textAlign: "center", fontFamily: "sans-serif",
            flex: 1,
            fontWeight: "550",
            float: "left",
            fontSize: 30,
            paddingRight: 50,
            color: "#776e65",
          }}>Score
            <div style={{
              background: "#846F5B",
              color: "#F8F5F0",
              // width: 50,
              // height: 50,
              borderRadius: 7,
              fontWeight: "600",
              //fontSize: "15px", 
              // paddingLeft: 10,paddingTop: 0,margin:0,
            }}>
              {score}
            </div>
          </div>

        </div>

      </div>
    </div>
  );

  // return (
  //   <div
  //     style={{
  //       background: "#AD9D8F",
  //           width: "max-content",
  //           height: "max-content",
  //           margin: "auto",
  //           padding: 5,
  //           borderRadius: 5,
  //           marginTop: 10,
  //           position: "relative",
  //     }}>
  //     {data.map((row, oneIndex) => {
  //       return (
  //         <div style={{ display: "flex" }} key={oneIndex}>
  //           {row.map((digit, index) => (
  //             <Block num={digit} key={index} />
  //           ))}
  //         </div>
  //       );
  //     })}
  //   </div>
  // )
  // return (
  // <div className="App">
  //  {JSON.stringify(data)}
  // </div>
  // );
}

const Block = ({ num }) => {
  // return <div>{num}</div>
  const { blockStyle } = style;

  return (
    <div style={{
      ...blockStyle,
      background: getColors(num),
      color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
    }}>
      {/* {num} */}
      {num !== 0 ? num : ""}
    </div>
  );
};

const style = {
  blockStyle: {
    height: 100,
    width: 100,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "600",
    color: "white",
  },
  newGameButton: {
    padding: 10,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 95,
    borderRadius: 7,
    fontWeight: "900",
    marginLeft: "auto",
    marginBottom: "auto",
    cursor: "pointer",
  },
  tryAgainButton: {
    padding: 10,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 80,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
    margin: "auto",
    marginTop: 20,
  },
  gameOverOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    borderRadius: 5,
    background: "rgba(238,228,218,.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}

export default App;
