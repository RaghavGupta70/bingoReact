import { Line } from "react-chartjs-2";
import {months} from '../../../utils/constantData/constantData'

const LineChart = ({ value, reload, playerData,oppLabel }) => {


  const data = {
    labels: playerData.matches.map((pl)=>months[pl.matchMonth-1]),
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

  const options = {
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let str;

            if (context.dataset.label === "Your Stats") {
              str = "You Won : " + context.formattedValue;
            } else {
              str = oppLabel + " Won : " + context.formattedValue;
            }
            return str;
          },
        },
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
