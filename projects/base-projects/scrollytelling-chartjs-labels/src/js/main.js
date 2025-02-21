/* globals Chart, scrollama, moment */
import ready from "/js/modules/ready.min.js";
import getMonth from "/js/modules/getMonth.min.js";
import highlightMax from "/js/modules/highlightMax.min.js";
import preloadImages from "/js/modules/preloadImages.min.js";

ready(function () {
  let showAll = false;

  const dataset = [
    {
      language: "Python",
      salary: 100742,
    },
    {
      language: "JavaScript",
      salary: 97039,
    },
    {
      language: "Java",
      salary: 101192,
    },
    {
      language: "Swift",
      salary: 101589,
    },
    {
      language: "C",
      salary: 94264,
    },
    {
      language: "C++",
      salary: 100500,
    },
    {
      language: "Ruby",
      salary: 104988,
    },
    {
      language: "Go",
      salary: 112092,
    },
    {
      language: "Objective-C",
      salary: 101285,
    },
    {
      language: "Perl",
      salary: 98199,
    },
    {
      language: "CSS",
      salary: 94113,
    },
    {
      language: "Visual Basic",
      salary: 78271,
    },
  ].sort((a, b) => (a.salary > b.salary ? 1 : -1));

  const dataLabels = dataset.map(function (datapoint) {
    return datapoint.language;
  });

  const dataValues = dataset.map(function (datapoint) {
    return datapoint.salary;
  });

  const logos = [
    {
      src: `${window.location.pathname}/images/logos/go.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/ruby.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/swift.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/objective-c.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/java.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/python.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/c++.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/perl.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/javascript.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/c.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/css.png`,
      width: 20,
      height: 20,
    },
    {
      src: `${window.location.pathname}/images/logos/visual-basic.png`,
      width: 20,
      height: 20,
    },
  ];

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    Chart.defaults.color = "#fff";
    Chart.defaults.borderColor = "#fff";
    Chart.defaults.backgroundColor = "#fff";
  } else {
    Chart.defaults.color = "#172c66";
    Chart.defaults.borderColor = "#8bd3dd";
    Chart.defaults.backgroundColor = "#fef6e4";
  }

  const data = {
    labels: [],
    datasets: [
      {
        label: "Median salary",
        borderWidth: 1,
        data: [],
      },
    ],
  };

  const annotation = {
    type: "line",
    scaleID: "y",
    value: 72560,
    borderColor: Chart.defaults.borderColor,
    borderWidth: 2,
    borderDash: [5, 5],
    // label: {
    //     backgroundColor: 'rgba(0,0,0,0.3)',
    //     color: Chart.defaults.backgroundColor,
    //     content: '$78k',
    //     enabled: false
    // },
    click: function ({ chart, element }) {
      console.log("Line annotation clicked");
    },
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
              }).format(value)}`;
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
          text: "Average developer salary by programming language",
        },
        subtitle: {
          display: true,
          text: "Average developer salary: $78,271",
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
                }).format(context.parsed.y)}`;
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
          textMargin: -40,
          images: logos.reverse(),
        },
        // annotation: {
        //     annotations: {
        //         annotation
        //     }
        // }
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
              }).format(context.parsed.y)}`;
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
        // annotation.label.enabled = response.index > 0;

        chart.options.plugins.annotation = {
          annotations: {
            annotation,
          },
        };

        chart.data.datasets[0].data = dataValues.slice(0, response.index + 1);
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
