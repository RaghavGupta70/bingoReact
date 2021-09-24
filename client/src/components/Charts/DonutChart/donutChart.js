import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const DonutChart = ({reload}) => {

    const data = {
      labels: ["Won", "Lost", "No Result"],
      datasets: [
        {
          label: "Statistics",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
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