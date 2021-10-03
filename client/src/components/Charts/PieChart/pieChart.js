import {Pie} from 'react-chartjs-2';

const PieChart = ({playerData}) => {

  console.log(playerData);

    const data = {
      labels: ["Won", "Lose", "No Result"],
      datasets: [
        {
          label: "Your Statistics",
          data: [playerData.matchesWon, playerData.matchesLost, 
            playerData.matchesPlayed-playerData.matchesWon-playerData.matchesLost],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          position: 'right',
          fullSize: true, 
        }
      }
    };

    return(
        <Pie data={data} options={options} />
    )
}

export default PieChart;