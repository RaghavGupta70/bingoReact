import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const DonutChart = ({value,reload}) => {

    const data ={
      labels: ["Won", "Lost", "No Result"],
      datasets: [
        {
          label: "Statistics",
          data: [value[0].matchPlayed,value[0].matchWon,value[0].matchLost],
          backgroundColor: [
            "rgb(23 205 23)",
            "rgb(197 9 9)",
            "rgb(215 173 35)",
          ],
          hoverOffset: 10,
          cutout: '70%',
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
        },
        legend: {
          display: true,
          position: "bottom",
          align: "center",
          maxHeight: 100,
          maxWidth: 400,
          labels: {
            boxWidth: 20,
          },
        },
      },
    };
    return (<>
      {console.log(reload)}
        <Doughnut data={data} options={options} />
        </>
    )
}

export default DonutChart;