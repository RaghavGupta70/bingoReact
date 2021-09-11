import react, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { Container, Grid } from "@material-ui/core";
import GridLayout from "react-grid-layout";
import { FaSlash } from "react-icons/fa";
import { io } from "socket.io-client";
import { getUserName, getUsers } from "../../utils/commonData/common";

let socket;

const BingoGrid = ({ arrNum }) => {

  const location = useLocation();
  const { roomID } = queryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const ENDPOINT = "localhost:5000";
  let dependency = 0;
  const [turn,setTurn] = useState(0);

  var arr = new Array(5);
  var ar = new Array(25);
  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  let [gameValue, setGameValue] = useState({
    userName: "",
    numberSelected: null,
    roomID: roomID,
  });
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(5);
}
var h=0;
  // useEffect(() => {
  //   socket.emit("gameValue", (gameValue), (error) => {
  //     alert("You bitch");
  //   });
  // }, [gameValue]);

  // useEffect(() => {
  //   console.log(turn);
  //   socket.on("value", (gameV) => {
  //     console.log(gameV);
  //     console.log("hello");
  //     sessionStorage.setItem("playValue", gameV);
  //   });
  // }, []);

  // setInterval(() => {
  //   dependency++;
  // }, 100);
  const [styleToggle, setStyleToggle] = useState([]);
  const [shuffle, setShuffle] = useState(false);

  for (var i = 1; i <= 25; i++) {
    styleToggle.push(false);
  }

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      alert('Game is If you still want to refresh then your game will over.')
      setShuffle(false);
    }
  }, []);

  useEffect(() => {
      
      console.log(getUsers()[turn],turn)
      if(turn === getUsers().length )
      {
          setTurn(0);
      }
  }, [turn])
 
      if (!shuffle) {
    setShuffle(true);
    console.log("here",arrNum);
   }
 
  console.log('Random')


  // console.log(bingoNum)

  var obj = {
    i: "",
    x: 0,
    y: 0,
    w: 1,
    h: 2,
  };

  for (var t = 0; t < 5; t++) {
    for(var j=0;j<5;j++){
      obj = {
        i: arrNum[h].toString(),
        x: h % 5,
        y: 0,
        w: 1,
        h: 1,
      };
      arr[t][j] = obj;
      h++;
    }
  }
  
  for (var t = 0; t < 25; t++) {
      obj = {
        i: arrNum[t].toString(),
        x: t % 5,
        y: 0,
        w: 1,
        h: 1,
      };
      ar[t] = obj;
    }
  
  console.log(arr)
  
  return (
    <div>
      <GridLayout
        layout={ar}
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
        {arr.map((row, index) =>
          row.map((ar, ind) => (
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
                if (getUsers().length === 1) {
                  alert("You are the only one here");
                  return;
                }
                console.log(e.target, ar.i);
                // if(ar.i !== num.toString()){
                //     console.log("Error")
                //     return;
                // }
                let result = getUserName();

                var numLen = getUsers()[0].numbers.length;
                if (numLen === 0) {
                  if (getUsers()[turn].userName === result) {
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
                      else if (p === index * 5 + ind) newArr[p] = true;
                      else newArr[p] = false;
                    }
                    console.log(ar);
                    setStyleToggle(newArr);
                    var f = turn + 1;
                    setTurn(f);
                  } else {
                    alert("Ruk Ja Chodu");
                  }
                } else if (getUsers()[turn].userName === result) {
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
                    else if (p === index * 5 + ind) newArr[p] = true;
                    else newArr[p] = false;
                  }
                  console.log(ar);
                  setStyleToggle(newArr);
                  var f = turn + 1;
                  setTurn(f);
                } else {
                  if (getUsers()[0].numbers[numLen - 1].userName === result) {
                    alert("Keep Your Calm Boi");
                  } else {
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
                        else if (p === index * 5 + ind) newArr[p] = true;
                        else newArr[p] = false;
                      }
                      console.log(ar);
                      setStyleToggle(newArr);
                      var f = turn + 1;
                      setTurn(f);
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
                  visibility: styleToggle[index * 5 + ind]
                    ? "visible"
                    : "hidden",
                }}
              />
            </div>
          ))
        )}
      </GridLayout>
    </div>
  );
};

export default BingoGrid;
