import { Line } from "react-chartjs-2";

import { useState,useEffect } from "react";

const LineChart = ({ value, reload, playerData }) => {

  const [t,setT] = useState([]);
  if(value.length !== 0) {setT(value.matches.map((op) => op.matchWon))}
  
  console.log(t);
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Your Stats",
        data: playerData.matches.map((p) => p.matchWon),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Opponent Stats",
        data:
          value.length !==0
            ? t
            : [1, 2, 3],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };
  return (
    <>
      {console.log(reload)}
      <Line data={data} />
    </>
  );
};

export default LineChart;
