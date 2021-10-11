import { Bar } from "react-chartjs-2";
import {useState,useEffect} from 'react';
import { CircularProgress } from "@material-ui/core";

const BarChart = ({graph,playerData}) => {
  const [barData, setBarData] = useState(playerData.matches);

  useEffect(() => {
    setBarData(playerData.matches);
  })


  useEffect(()=> {
    if(barData)
    setBarData(barData.sort((a,b)=> {
      var monthStringA = a;
      var monthStringB = b;
      var datA = new Date('1 ' + monthStringA + ' 1999');
      var datB = new Date('1 ' + monthStringB + ' 1999');
      console.log(datA.getMonth(),datB.getMonth());
      return datA.getMonth()<datB.getMonth()?1:0;
    }));
  },[barData])

    const data =(barData)=>( {
      labels: !barData? ["Jan","Feb","Mar"] : barData.map((data)=> data.matchMonth),

      datasets: [
        {
          label: "Won",
          backgroundColor: "rgb(3 252 103)",
          data: !barData? [7,3,1] : barData.map((data)=> data.matchWon),
        },
        {
          label: "Lost",
          backgroundColor: "rgb(252 3 61)",
          data: !barData? [4, 3, 5] : barData.map((data)=> data.matchLost),
        },
        {
          label: "No Result",
          backgroundColor: "rgb(3 252 232)",
          data: !barData? [7,2,6] : barData.map((data)=> data.matchNoResult)
        },
      ],
    });
    const options = {
      title: {
        display: true,
        text: "Statistics Per Month",
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "right",
      }
    };
    return(<>{!barData? <CircularProgress />:<Bar data={data(barData)} options={options} />}</>)
}

export default BarChart;