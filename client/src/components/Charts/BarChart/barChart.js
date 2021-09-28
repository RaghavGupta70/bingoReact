import { Bar } from "react-chartjs-2";
import {useState} from 'react';

const BarChart = ({playerData}) => {
  console.log(playerData.matches)
  const [barData,setBarData] = useState(playerData.matches);
    const data = {
      labels: ["Jan", "Feb", "March"],

      datasets: [
        {
          label: "Won",
          backgroundColor: "rgb(3 252 103)",
          data: [3, 7, 4],
        },
        {
          label: "Lost",
          backgroundColor: "rgb(252 3 61)",
          data: [4, 3, 5],
        },
        {
          label: "No Result",
          backgroundColor: "rgb(3 252 232)",
          data: [7, 2, 6],
        },
      ],
    };
    const options = {
      
      title: {
        display: true,
        text: "Average Rainfall per month",
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "right",
      },
    };
    return(<Bar data={data} options={options} />)
}

export default BarChart;