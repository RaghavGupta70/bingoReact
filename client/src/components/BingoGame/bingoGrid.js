import react, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core";
import GridLayout from 'react-grid-layout';
import { FaSlash } from 'react-icons/fa';
import NumberSelector from "./numberSelector";

const BingoGrid = ({arrNum,shuffleArr,generate}) => {

    var arr = [];

    const [styleToggle, setStyleToggle] = useState([]);
    const [shuffle,setShuffle] = useState(false);

    for (var i = 1; i <= 25; i++) {
        styleToggle.push(false);
    }

    useEffect(() => {
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {           
           setShuffle(false);
        }
    },[]);


        if(!shuffle){
            setShuffle(true);
            shuffleArr(arrNum);
            console.log('here')
        }
   
    // console.log(bingoNum)

    var obj = {
        i: "",
        x: 0,
        y: 0,
        w: 1,
        h: 2,
    }

    for (var t = 0; t < 25; t++) { 
        obj = {
            i: (arrNum[t]).toString(),
            x: (t) % 5,
            y: 0,
            w: 1,
            h: 1,
        }
        arr[t] = obj;
    }
    const num = generate();
    return (
        <div>
            <NumberSelector num={num} />
        <GridLayout layout={arr} cols={12} colHeight={20} rowHeight={30} width={500} isDraggable={false} style={{backgroundColor: "rgb(247,203,45)",width: "17%", margin: "auto"}}>
            {arr.map((ar, index) => (<div style={{ display: "flex", justifyContent: "center",border: "1px solid black",alignItems: "center", borderRadius: "4px",margin: "auto"  }} key={ar.i}
                onClick={(e) => {
                    if(ar.i !== num.toString()){
                        console.log("Error")
                        return;
                    }
                    var newArr = [];
                    for (var p = 0; p < 25; p++) {
                        if(styleToggle[p])
                          newArr[p] = true;
                        else if(p === index)
                            newArr[p] = true;
                        else    
                            newArr[p] = false;
                            
                    }
                    console.log(ar)
                    setStyleToggle(newArr);
                }}>
                {ar.i}<FaSlash style={{ position: "absolute", left: "7px", fontSize: "18px", visibility: styleToggle[index] ? "visible" : "hidden" }} />
                
                </div>))}

        </GridLayout>
        </div>
    )
}

export default BingoGrid;