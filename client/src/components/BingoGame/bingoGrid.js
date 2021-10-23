import react, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { Container, Grid } from "@material-ui/core";
import GridLayout from "react-grid-layout";
import { FaSlash } from "react-icons/fa";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { getUserEmail, getUserName, getUsers, putUsers } from "../../utils/commonData/common";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { cutNumbers, updatePlayerProfile } from '../../actions/index.js';
import WinnerGif from "../../assets/images/winnerGif.gif";
import LoserGif from "../../assets/images/loserGif.gif";
import bingoB from "../../assets/images/bingoB.png";
import bingoI from "../../assets/images/bingoI.png";
import bingoN from "../../assets/images/bingoN.png";
import bingoG from "../../assets/images/bingoG.png";
import bingoO from "../../assets/images/bingoO.png";
import bingoB2 from '../../assets/images/bingoB2.png'
import bingoI2 from '../../assets/images/bingoI2.png'
import bingoN2 from '../../assets/images/bingoN2.png'
import bingoG2 from '../../assets/images/bingoG2.png'
import bingoO2 from '../../assets/images/bingoO2.png'
import BingoButton from '../Buttons/BingoButton/bingoButton';

import binStyles from './bingoGrid.module.css';

let socket;

const BingoGrid = ({ setMessage }) => {
  const [arrNum, setArrNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);


  const [shuffleBingo, setShuffleBingo] = useState(false);
  const location = useLocation();
  const { roomID } = queryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const history = useHistory();
  const ENDPOINT = "localhost:5000";
  let dependency = 0;
  const [turn, setTurn] = useState(0);
  const [bingoCut, setBingoCut] = useState({ horiz: [], vert: [], diag: [] });
  const dispatch = useDispatch();

  var arr = new Array(5);
  var ar = new Array(25);
  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);



  if (!shuffleBingo) {
    for (let i = arrNum.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrNum[i], arrNum[j]] = [arrNum[j], arrNum[i]];
    }
    setShuffleBingo(true);
  }

  let [gameValue, setGameValue] = useState({
    userName: "",
    numberSelected: null,
    roomID: roomID,
  });
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(5);
  }
  var h = 0;


  const [styleToggle, setStyleToggle] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [win, setWin] = useState([false, false, false, false, false]);
  const [bingoWin, setBingoWin] = useState(0);

  for (var i = 1; i <= 25; i++) {
    styleToggle.push(false);
  }

  useEffect(() => {
    if (getUsers().length > 0) {
      if (getUsers()[0].numbers.length > 0) {
        if (getUsers()[0].numbers[getUsers()[0].numbers.length - 1].value === 100 && getUsers()[0].numbers[getUsers()[0].numbers.length - 1].userName !== getUserName()) {
          console.log('You lost');
        }
      }
    }
  });

  useEffect(() => {
    if (bingoCut.horiz.length + bingoCut.vert.length + bingoCut.diag.length >= 5) {
      console.log(bingoCut);
      const winData = getUsers().filter((elem) => elem.userEmail !== getUserEmail());
      const finalData = winData.map((elem) => { return { label: elem.userName, email: elem.userEmail, result: 'Lost' } });
      const gameVal = getUsers();
      const num = 100;
      const user = getUserName();
      socket.emit("gameValue", { gameVal, num, user }, (error) => {
        alert("You bitch");
      });
      dispatch(updatePlayerProfile(getUserEmail(), { oppData: finalData, result: 'Won' }))
      Swal.fire({
        title: "Congratulations You Won",
        color: "red",
        width: 600,
        position: "bottom",
        padding: "3em",
        background: `rgb(255,255,255)`,
        backdrop: `
    rgba(0,0,0,0.4)
    url(${WinnerGif})
    center top
    no-repeat
  `,
      });
      setTimeout(() => {
        history.push('/home');
      }, 2000);
    }
  }, [bingoCut]);

  useEffect(() => {
    console.log(getUsers()[turn], turn);
    if (turn === getUsers().length) {
      setTurn(0);
    }
  }, [turn]);

  if (!shuffle) {
    setShuffle(true);
    console.log("here", arrNum);
  }

  console.log("Random");

  var obj = {
    i: "",
    x: 0,
    y: 0,
    w: 1,
    h: 2,
  };

  for (var t = 0; t < 5; t++) {
    for (var j = 0; j < 5; j++) {
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

  // console.log(arr);

  const handleBingo = (e) => {
    e.preventDefault();
    for (let i = 0; i < 25; i++) {
      if (i % 5 === 0 && bingoCut.horiz.find((elem) => elem === i) !== i) {
        if (
          styleToggle[i] &&
          styleToggle[i + 1] &&
          styleToggle[i + 2] &&
          styleToggle[i + 3] &&
          styleToggle[i + 4]
        ) {
          console.log(i, "You can cut now");
          setBingoCut({
            horiz: [...bingoCut.horiz, i],
            vert: [...bingoCut.vert],
            diag: [...bingoCut.diag],
          });

          win[bingoWin] = true;
          setBingoWin(bingoWin + 1)
          const newWin = win;
          console.log(win, bingoWin);
          setWin(newWin);

          console.log(bingoCut.horiz.length);
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      if (bingoCut.vert.find((elem) => elem === i) !== i)
        if (
          styleToggle[i] &&
          styleToggle[i + 5] &&
          styleToggle[i + 10] &&
          styleToggle[i + 15] &&
          styleToggle[i + 20]
        ) {
          console.log(i, "You can cut now");
          setBingoCut({
            horiz: [...bingoCut.horiz],
            vert: [...bingoCut.vert, i],
            diag: [...bingoCut.diag],
          });
          console.log(bingoCut.vert.length);
          win[bingoWin] = true;
          setBingoWin(bingoWin + 1);
          const newWin = win;
          console.log(win, bingoWin);

          setWin(newWin);

        }
    }

    if (bingoCut.diag.find((elem) => elem === 0) !== 0)
      if (
        styleToggle[0] &&
        styleToggle[6] &&
        styleToggle[12] &&
        styleToggle[18] &&
        styleToggle[24]
      ) {
        console.log("You can cut now");
        setBingoCut({
          horiz: [...bingoCut.horiz],
          vert: [...bingoCut.vert],
          diag: [...bingoCut.diag, 0],
        });
        win[bingoWin] = true;
        setBingoWin(bingoWin + 1)
        const newWin = win;
        console.log(win, bingoWin);

        setWin(newWin);


      }

    if (bingoCut.diag.find((elem) => elem === 1) !== 1)
      if (
        styleToggle[4] &&
        styleToggle[8] &&
        styleToggle[12] &&
        styleToggle[16] &&
        styleToggle[20]
      ) {
        console.log("You can cut now");
        setBingoCut({
          horiz: [...bingoCut.horiz],
          vert: [...bingoCut.vert],
          diag: [...bingoCut.diag, 1],
        });
        win[bingoWin] = true;
        setBingoWin(bingoWin + 1)
        const newWin = win;
        console.log(win, bingoWin);

        setWin(newWin);

      }
  };

  return (
    <>
      <div className={binStyles.bingo}>
        <img src={win[0] ? bingoB2 : bingoB} />
        <img src={win[1] ? bingoI2 : bingoI} />
        <img src={win[2] ? bingoN2 : bingoN} />
        <img src={win[3] ? bingoG2 : bingoG} />
        <img src={win[4] ? bingoO2 : bingoO} />
      </div>
      <div className={binStyles.mainGrid}>
        <GridLayout
          layout={ar}
          cols={12}
          colHeight={20}
          rowHeight={30}
          width={500}
          isDraggable={false}
          className={binStyles.gridLayout}
        >
          {arr.map((row, index) =>
            row.map((ar, ind) => (
              <div className={styleToggle[index * 5 + ind]?binStyles.elem1:binStyles.elem}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid black",
                  alignItems: "center",
                  borderRadius: "4px",
                }}
                key={ar.i}
                onClick={(e) => {
                  if (getUsers().length > 0) {
                    if (getUsers()[0].numbers.length > 0) {
                      if (getUsers()[0].numbers[getUsers()[0].numbers.length - 1].value === 100 && getUsers()[0].numbers[getUsers()[0].numbers.length - 1].userName !== getUserName()) {
                        console.log('You lost');
                        const winData = getUsers().filter((elem) => elem.userEmail !== getUserEmail());
                        const winner = getUsers()[0].numbers[getUsers()[0].numbers.length - 1].userName;
                        const finalData = winData.map((elem) => { return { label: elem.userName, email: elem.userEmail, result: winner === elem.userName ? 'Won' : 'Lost' } });

                        dispatch(updatePlayerProfile(getUserEmail(), { oppData: finalData, result: 'Lost' }))
                        Swal.fire({
                          title: "You Lost the Game",
                          color: "red",
                          width: 600,
                          position: "bottom",
                          padding: "3em",
                          background: `rgb(255,255,255)`,
                          backdrop: `
                               rgba(0,0,0,0.4)
                               url(${LoserGif})
                               center top
                               no-repeat
                              `,
                        });
                        setTimeout(() => {
                          history.push('/home');
                        }, 2000);
                        return;
                      }
                    }
                  }
                  if (getUsers().length === 1) {
                    alert("You are the only one here");
                    return;
                  }
                  let result = getUserName();

                  var numLen = getUsers()[0].numbers.length;
                  if (numLen === 0) {
                    if (getUsers()[turn].userName === result) {
                      gameValue = {
                        userName: result,
                        userEmail: getUserEmail(),
                        numberSelected: ar.i,
                        roomID: roomID,
                      };
                      setGameValue(gameValue);

                      const gameVal = JSON.parse(sessionStorage.getItem('usersRoom'));
                      const num = ar.i;
                      const user = getUserName();
                      dispatch(cutNumbers({ userName: getUsers()[turn].userName, value: num }));
                      socket.emit("gameValue", { gameVal, num, user }, (error) => {
                        alert("You bitch");
                      });
                      var newArr = [];
                      for (var p = 0; p < 25; p++) {
                        if (styleToggle[p]) newArr[p] = true;
                        else if (p === index * 5 + ind) newArr[p] = true;
                        else newArr[p] = false;
                      }
                      setStyleToggle(newArr);
                      var f = turn + 1;
                      setTurn(f);
                    } else {
                      alert("Ruk Ja Chodu");
                    }
                  } else if (getUsers()[turn].userName === result) {
                    gameValue = {
                      userName: result,
                      userEmail: getUserEmail(),
                      numberSelected: ar.i,
                      roomID: roomID,
                    };
                    setGameValue(gameValue);
                    const gameVal = getUsers();
                    const num = ar.i;
                    const user = getUserName();
                    dispatch(cutNumbers({ userName: getUsers()[turn].userName, value: num }));
                    socket.emit("gameValue", { gameVal, num, user }, (error) => {
                      alert("You bitch");
                    });
                    var newArr = [];
                    for (var p = 0; p < 25; p++) {
                      if (styleToggle[p]) newArr[p] = true;
                      else if (p === index * 5 + ind) newArr[p] = true;
                      else newArr[p] = false;
                    }
                    setStyleToggle(newArr);
                    var f = turn + 1;
                    setTurn(f);
                  } else {
                    if (getUsers()[0].numbers[numLen - 1].userName === result) {
                      alert("Keep Your Calm Boi");
                    } else {
                      if (getUsers()[0].numbers.find((elem)=> elem.value == ar.i)) {
                        gameValue = {
                          userName: result,
                          userEmail: getUserEmail(),
                          numberSelected: ar.i,
                          roomID: roomID,
                        };
                        setGameValue(gameValue);
                        const gameVal = getUsers();
                        const num = ar.i;
                        const user = getUserName();
                        dispatch(cutNumbers({ userName: getUsers()[turn].userName, value: num }));
                        socket.emit("gameValue", { gameVal, num, user }, (error) => {
                          alert("You bitch");
                        });
                        var newArr = [];
                        for (var p = 0; p < 25; p++) {
                          if (styleToggle[p]) newArr[p] = true;
                          else if (p === index * 5 + ind) newArr[p] = true;
                          else newArr[p] = false;
                        }
                        setStyleToggle(newArr);
                        var f = turn + 1;
                        setTurn(f);
                      } else {
                        alert("You selected wrong number");
                      }
                    }
                  }

                  setMessage(getUsers());
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
        <BingoButton onBingo={handleBingo} />
      </div>
    </>
  );
};

export default BingoGrid;
