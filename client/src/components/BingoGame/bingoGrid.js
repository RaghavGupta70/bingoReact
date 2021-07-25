import react, { useState } from "react"
import { Container, Grid } from "@material-ui/core";
import GridLayout from 'react-grid-layout';
import { FaSlash } from 'react-icons/fa';

const BingoGrid = () => {

    var arr = [];

    const [styleToggle, setStyleToggle] = useState([]);
    for (var i = 1; i <= 25; i++) {
        styleToggle.push(false);
    }
    // return(
    //     <Grid container>
    //        { arr.map((row,index) => (<Grid key={index} item xs={20%}>{row}</Grid>))}
    //     </Grid>
    // )
    var obj = {
        i: "",
        x: 0,
        y: 0,
        w: 1,
        h: 2,
    }

    for (var t = 0; t < 25; t++) {

        obj = {
            i: (t + 1).toString(),
            x: (t) % 5,
            y: 0,
            w: 1,
            h: 1,
        }
        arr[t] = obj;
    }
    // const layout = [
    //     {i: 'a', x: 0, y: 0, w: 1, h: 1},
    //     {i: 'b', x: 1, y: 0, w: 1, h: 1},
    //     {i: 'c', x: 0, y: 0, w: 1, h: 1},
    //     {i: 'd', x: 1, y: 0, w: 1, h: 1},
    //     {i: 'e', x: 0, y: 0, w: 1, h: 1},
    //     {i: 'f', x: 1, y: 0, w: 1, h: 1},

    //   ];

    // arr[7]={i:"abc",x:1,y:1,w:1,h:1};
    return (
        <GridLayout className="layout" layout={arr} cols={12} colHeight={20} rowHeight={30} width={500} isDraggable={false}>
            {/* <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
        <div key="d">d</div>
        <div key="e">e</div>
        <div key="f">f</div> */}
            {arr.map((ar, index) => (<div style={{ display: "flex", justifyContent: "center" }} key={ar.i}
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