import { Bar } from "react-chartjs-2";
import {useState,useEffect} from 'react';
import { CircularProgress } from "@material-ui/core";

const BarChart = ({graph,playerData}) => {
  const [barData, setBarData] = useState(playerData.matches);
  console.log(playerData)

  useEffect(() => {
    setBarData(playerData.matches);
  })

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
        text: "Average Rainfall per month",
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