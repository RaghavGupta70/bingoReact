import { Line } from "react-chartjs-2";

import { useState,useEffect } from "react";

const LineChart = ({ value, reload, playerData }) => {

  const [t,setT] = useState([]);
  
  useEffect(() => {
    if(value)
    {
    console.log(value, value.matches);
    setT(value.matches.map((op)=>op.matchWon));
    }
  },[])
  
  console.log(t);
  const data = (val) => ({
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
          value
            ? val
            : [1, 2, 3],
        fill: false,
        borderColor: "#742774",
      },
    ],
  });
  return (
    <>
      {console.log(reload)}
      <Line data={data(t)} />
    </>
  );
};

export default LineChart;
