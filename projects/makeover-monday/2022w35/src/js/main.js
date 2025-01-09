/* globals Chart, scrollama, moment */
import ready from "/js/modules/ready.min.js";
import getMonth from "/js/modules/getMonth.min.js";
import highlightMax from "/js/modules/highlightMax.min.js";
import preloadImages from "/js/modules/preloadImages.min.js";

ready(async () => {
  let showAll = false;
  const resp = await fetch("/data/military-budget/military-budget-2021.json");
  const dataset = await resp.json();


  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    Chart.defaults.color = "#fff";
    Chart.defaults.borderColor = "#fff";
    Chart.defaults.backgroundColor = "#fff";
  } else {
    Chart.defaults.color = "#172c66";
    Chart.defaults.borderColor = "#8bd3dd";
    Chart.defaults.backgroundColor = "#f3d2c1";
  }

  const dataLabels = dataset.map(function (datapoint) {
    return datapoint.country;
  });

  const dataValues = dataset.map(function (datapoint) {
    return datapoint.budget;
  });

  const logos = dataset.map((d) => {
    return {
      src: `${window.location.pathname}/images/logos/${d.logo}.png`,
      width: 20,
      height: 20,
    };
  });

  const data = {
    labels: [],
    datasets: [
      {
        label: "Budget",
        borderWidth: 1,
        data: [],
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          suggestedMin: 50000,
          startAtZero: false,
          suggestedMax: Math.max(dataValues),
          ticks: {
            callback: function (value, index, values) {
              return `${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(value)}B`;
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Top 10 Countries by Military Spending",
        },
        subtitle: {
          display: true,
          text: "2021 budget in billions of US Dollars",
          padding: {
            bottom: 30,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += `${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(context.parsed.y)}B`;
              }
              return label;
            },
          },
        },
        datalabels: {
          anchor: "end",
          align: "start",
        },
        labels: {
          render: "image",
          textMargin: -16,
          images: logos,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const title = tooltipItems[0].label;
            const year = title.split("/")[0];
            const month = getMonth(parseInt(title.split("/")[1]) - 1);
            return `${month} ${year}`;
          },
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `$${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y)}B`;
            }
            return label;
          },
        },
      },
    },
  };

  const chart = new Chart(document.getElementById("chart"), config);

  const description = document.getElementById("description");
  const menuIcon = document.getElementById("menu-icon");
  const scroller = scrollama();

  scroller
    .setup({
      step: ".step",
    })
    .onStepEnter(function (response) {
      /* response = { direction, element, index }, */
      // console.log('onStepEnter', response);
      // console.log('onStepEnter', response.index, response.direction);

      // if (response.index === 0){
      //     description.innerHTML = '';
      // }

      chart.options.scales.x.display = true;
      chart.options.scales.y.display = true;

      if (!showAll) {
        chart.data.datasets[0].data = dataValues.slice(0, response.index + 1);
        chart.data.datasets[0].backgroundColor = dataset.map((d, i) =>
          i === 0 ? "rgb(255, 99, 132)" : Chart.defaults.backgroundColor
        );
        chart.data.labels = dataLabels.slice(0, response.index + 1);
        // chart.data.labels[response.index] = dataLabels[response.index];

        description.innerHTML = "";
        chart.update();
        highlightMax(chart);
      }

      if (response.index === dataset.length - 1) {
        showAll = true;
      }
    })
    .onStepExit(function (response) {
      /* response = { direction, element, index }, */
      // console.log('onStepExit', response);
      // console.log('onStepExit', response.index, response.direction);
      // if (menuIcon && ((response.direction === 'up' && response.index === 0) || (response.direction === 'down' && response.index === datasets.length - 1))){
      //     menuIcon.classList.remove('d-none');
      // }
    });

  window.addEventListener("resize", scroller.resize);

  preloadImages(
    logos.map(function (logo) {
      return logo.src;
    })
  );
});
