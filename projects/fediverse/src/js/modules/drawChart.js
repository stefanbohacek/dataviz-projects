/* globals Chart, scrollama */

import {backgroundColorFromData} from '/js/modules/chartHelper.min.js';

const menuIcon = document.getElementById('menu-icon');

const drawChart = (userData) => {
  let highlightedValues = [];
  const labels = userData.allDomains.map((domain) => domain.domain);
  const datasets = [userData.allDomains.map((domain) => domain.connections)];

  // Chart.defaults.color = "#172c66";
  // Chart.defaults.borderColor = "#8bd3dd";
  // Chart.defaults.backgroundColor = "rgb(255, 99, 132)";

  const data = {
    labels: labels[0],
    datasets: [
      {
        label: "Servers",
        backgroundColor: (context) => backgroundColorFromData(context, highlightedValues),
        borderColor: "rgb(255, 99, 132)",
        data: datasets[0],
      },
    ],
  };

  const chart = new Chart(document.getElementById("chart"), {
    type: "treemap",
    data,
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          // suggestedMax: Math.max(...[].concat(...datasets)),
          ticks: {
            callback: function (value, index, values) {
              return `${value}`;
            },
          },
        },
      },
      onClick: function (ev, data) {
        const domain = userData.allDomains[data[0].index];
        window.open(`https://${domain.domain}/`, "_blank");
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function (tooltipItems) {
              return labels[tooltipItems[0].dataIndex];
            },
            label: function (context) {
              return `${datasets[0][context.dataIndex]} connection${
                datasets[0][context.dataIndex] === 1 ? "" : "s"
              }`;
            },
          },
        },
      },
    },
  });

  const scroller = scrollama();

  scroller
    .setup({
      step: ".step",
    })
    .onStepEnter(function (response) {
      /* response = { direction, element, index }, */
      // console.log('onStepEnter', response);
      // console.log('onStepEnter', response.index, response.direction);

      if (
        menuIcon &&
        ((response.direction === "down" && response.index >= 0) ||
          (response.direction === "up" &&
            response.index <= datasets.length - 1))
      ) {
        menuIcon.classList.add("d-none");
        menuIcon.classList.add("d-md-block");
      }

      for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
        switch (response.index) {
          case 1:
            highlightedValues = userData.topDomains.map(
              (domain) => domain.connections
            );
            break;
          case 2:
            highlightedValues = [1];
            break;
          default:
            highlightedValues = userData.allDomains.map(
              (domain) => domain.connections
            );
            break;
        }
      }
      chart.update();
    })
    .onStepExit(function (response) {
      /* response = { direction, element, index }, */
      // console.log('onStepExit', response);
      // console.log('onStepExit', response.index, response.direction);

      if (
        menuIcon &&
        ((response.direction === "up" && response.index === 0) ||
          (response.direction === "down" &&
            response.index === datasets.length - 1))
      ) {
        menuIcon.classList.remove("d-none");
      }
    });

  window.addEventListener("resize", scroller.resize);
};

export default drawChart;
