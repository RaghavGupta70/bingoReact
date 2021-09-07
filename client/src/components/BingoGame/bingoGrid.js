import react, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { Container, Grid } from "@material-ui/core";
import GridLayout from "react-grid-layout";
import { FaSlash } from "react-icons/fa";
import NumberSelector from "./numberSelector";
import { io } from "socket.io-client";
import { getUserName, getUsers } from "../../utils/commonData/common";

let socket;

const BingoGrid = ({ arrNum, shuffleArr, generate }) => {
  const location = useLocation();
  const { roomID } = queryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const ENDPOINT = "localhost:5000";
  let dependency = 0;

  var arr = [];
  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  let [gameValue, setGameValue] = useState({
    userName: "",
    numberSelected: null,
    roomID: roomID,
  });
  // useEffect(() => {
  //   socket.emit("gameValue", (gameValue), (error) => {
  //     alert("You bitch");
  //   });
  // }, [gameValue]);

  useEffect(() => {
    console.log("hey");
    socket.on("value", (gameV) => {
      console.log(gameV);
      console.log("hello");
      sessionStorage.setItem("playValue", gameV);
    });
  }, []);

  setInterval(() => {
    dependency++;
  }, 100);
  const [styleToggle, setStyleToggle] = useState([]);
  const [shuffle, setShuffle] = useState(false);

  for (var i = 1; i <= 25; i++) {
    styleToggle.push(false);
  }

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      setShuffle(false);
    }
  }, []);

  if (!shuffle) {
    setShuffle(true);
    shuffleArr(arrNum);
    console.log("here");
  }

  // console.log(bingoNum)

  var obj = {
    i: "",
    x: 0,
    y: 0,
    w: 1,
    h: 2,
  };

  for (var t = 0; t < 25; t++) {
    obj = {
      i: arrNum[t].toString(),
      x: t % 5,
      y: 0,
      w: 1,
      h: 1,
    };
    arr[t] = obj;
  }
  const num = generate();
  return (
    <div>
      <GridLayout
        layout={arr}
        cols={12}
        colHeight={20}
        rowHeight={30}
        width={500}
        isDraggable={false}
        style={{
          backgroundColor: "rgb(247,203,45)",
          width: "17%",
          margin: "auto",
        }}
      >
        {arr.map((ar, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              border: "1px solid black",
              alignItems: "center",
              borderRadius: "4px",
              margin: "auto",
            }}
            key={ar.i}
            onClick={(e) => {
              console.log(e.target, ar.i);
              // if(ar.i !== num.toString()){
              //     console.log("Error")
              //     return;
              // }
              let result = getUserName();

              var numLen = getUsers()[0].numbers.length;
              
              if (numLen === 0) {
                gameValue = {
                  userName: result,
                  numberSelected: ar.i,
                  roomID: roomID,
                };
                setGameValue(gameValue);
                socket.emit("gameValue", gameValue, (error) => {
                  alert("You bitch");
                });
                var newArr = [];
                for (var p = 0; p < 25; p++) {
                  if (styleToggle[p]) newArr[p] = true;
                  else if (p === index) newArr[p] = true;
                  else newArr[p] = false;
                }
                console.log(ar);
                setStyleToggle(newArr);
              } 
              
              else {
              
              
                if (getUsers()[0].numbers[numLen - 1].userName === result) {
                  alert("Keep Your Calm Boi");
                } 
                
                else {
                  if (getUsers()[0].numbers[numLen - 1].value === ar.i) {
                    gameValue = {
                      userName: result,
                      numberSelected: ar.i,
                      roomID: roomID,
                    };
                    setGameValue(gameValue);
                    socket.emit("gameValue", gameValue, (error) => {
                      alert("You bitch");
                    });
                    var newArr = [];
                    for (var p = 0; p < 25; p++) {
                      if (styleToggle[p]) newArr[p] = true;
                      else if (p === index) newArr[p] = true;
                      else newArr[p] = false;
                    }
                    console.log(ar);
                    setStyleToggle(newArr);
                  } else {
                    alert("You selected wrong number");
                  }
                }
              }
            }}
          >
            {ar.i}
            <FaSlash
              style={{
                position: "absolute",
                left: "7px",
                fontSize: "18px",
                visibility: styleToggle[index] ? "visible" : "hidden",
              }}
            />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default BingoGrid;
