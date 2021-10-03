import { Line } from "react-chartjs-2";

const LineChart = ({ value, reload, playerData }) => {

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
      <Line data={data} />
    </>
  );
};

export default LineChart;
