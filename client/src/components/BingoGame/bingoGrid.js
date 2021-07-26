import react, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core";
import GridLayout from 'react-grid-layout';
import { FaSlash } from 'react-icons/fa';

const BingoGrid = () => {

    var arr = [];

    const [styleToggle, setStyleToggle] = useState([]);
    const [shuffle,setShuffle] = useState(false);

    for (var i = 1; i <= 25; i++) {
        styleToggle.push(false);
    }

    var bingoNum = [];
    for(var h=0;h<25;h++){
        bingoNum.push(h+1);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    if(!shuffle){
        setShuffle(true);
        shuffleArray(bingoNum);
        console.log(bingoNum);
    } 

    var obj = {
        i: "",
        x: 0,
        y: 0,
        w: 1,
        h: 2,
    }

    for (var t = 0; t < 25; t++) {
        obj = {
            i: (bingoNum[t]).toString(),
            x: (t) % 5,
            y: 0,
            w: 1,
            h: 1,
        }
        arr[t] = obj;
    }
    
    return (
        <GridLayout layout={arr} cols={12} colHeight={20} rowHeight={30} width={500} isDraggable={false} style={{backgroundColor: "rgb(247,203,45)",width: "17%", margin: "auto"}}>
            {arr.map((ar, index) => (<div style={{ display: "flex", justifyContent: "center",border: "1px solid black",alignItems: "center", borderRadius: "4px",margin: "auto"  }} key={ar.i}
                onClick={(e) => {
                    var newArr = [];
                    for (var p = 0; p < 25; p++) {
                        if(styleToggle[p])
                          newArr[p] = true;
                        else if(p === index)
                            newArr[p] = true;
                        else    
                            newArr[p] = false;
                    }
                    setStyleToggle(newArr);
                }} >
                {ar.i}<FaSlash style={{ position: "absolute", left: "7px", fontSize: "18px", visibility: styleToggle[index] ? "visible" : "hidden" }} />
                </div>))}

        </GridLayout>
    )
}

export default BingoGrid;