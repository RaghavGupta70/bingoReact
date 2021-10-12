import { Bar } from "react-chartjs-2";
import {useState,useEffect} from 'react';
import { CircularProgress } from "@material-ui/core";
import {months} from '../../../utils/constantData/constantData.js';

const BarChart = ({graph,playerData}) => {
  const [barData, setBarData] = useState(playerData.matches);

  useEffect(() => {
    if(playerData.matches)
    {
      console.log(playerData.matches.sort((a, b) => a.matchMonth > b.matchMonth ? 1 : -1));
      setBarData(playerData.matches.sort((a, b) => a.matchMonth > b.matchMonth ? 1 : -1));
    }
  })

    const data =(barData)=>( {
      labels: !barData? ["Jan","Feb","Mar"] : barData.map((data)=> months[data.matchMonth-1] ),

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