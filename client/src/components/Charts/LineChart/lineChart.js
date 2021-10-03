import { Line } from "react-chartjs-2";

import { useState,useEffect } from "react";

const LineChart = ({ value, reload, playerData }) => {

 console.log(value[0].oppoM);
  
  // console.log(t);
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
        data: value ? value[0].oppoM.map((opp) => opp.matchWon) : [1, 2, 3],
        fill: true,
        backgroundColor: "#c795c7",
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
