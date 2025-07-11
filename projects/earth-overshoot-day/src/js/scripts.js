/* globals Chart, scrollama, moment */

function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function () {
  const Utils = {
    isoDayOfWeek: function (dt) {
      let wd = dt.getDay(); // 0..6, from sunday
      wd = ((wd + 6) % 7) + 1; // 1..7 from monday
      return "" + wd; // string so it gets parsed
    },
    startOfToday: function () {
      const d = new Date();
      return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
    },
  };

  const overshootDays = {
    1971: {
      overshoot_day: "12-25",
      days_lasted: 358,
      days_left: 7,
      percent_lasted: 98.08,
    },
    1972: {
      overshoot_day: "12-14",
      days_lasted: 348,
      days_left: 18,
      percent_lasted: 95.08,
    },
    1973: {
      overshoot_day: "12-01",
      days_lasted: 334,
      days_left: 31,
      percent_lasted: 91.51,
    },
    1974: {
      overshoot_day: "12-02",
      days_lasted: 335,
      days_left: 30,
      percent_lasted: 91.78,
    },
    1975: {
      overshoot_day: "12-04",
      days_lasted: 337,
      days_left: 28,
      percent_lasted: 92.33,
    },
    1976: {
      overshoot_day: "11-21",
      days_lasted: 325,
      days_left: 41,
      percent_lasted: 88.8,
    },
    1977: {
      overshoot_day: "11-15",
      days_lasted: 318,
      days_left: 47,
      percent_lasted: 87.12,
    },
    1978: {
      overshoot_day: "11-11",
      days_lasted: 314,
      days_left: 51,
      percent_lasted: 86.03,
    },
    1979: {
      overshoot_day: "11-02",
      days_lasted: 305,
      days_left: 60,
      percent_lasted: 83.56,
    },
    1980: {
      overshoot_day: "11-08",
      days_lasted: 312,
      days_left: 54,
      percent_lasted: 85.25,
    },
    1981: {
      overshoot_day: "11-15",
      days_lasted: 318,
      days_left: 47,
      percent_lasted: 87.12,
    },
    1982: {
      overshoot_day: "11-19",
      days_lasted: 322,
      days_left: 43,
      percent_lasted: 88.22,
    },
    1983: {
      overshoot_day: "11-19",
      days_lasted: 322,
      days_left: 43,
      percent_lasted: 88.22,
    },
    1984: {
      overshoot_day: "11-11",
      days_lasted: 315,
      days_left: 51,
      percent_lasted: 86.07,
    },
    1985: {
      overshoot_day: "11-08",
      days_lasted: 311,
      days_left: 54,
      percent_lasted: 85.21,
    },
    1986: {
      overshoot_day: "11-03",
      days_lasted: 306,
      days_left: 59,
      percent_lasted: 83.84,
    },
    1987: {
      overshoot_day: "10-27",
      days_lasted: 299,
      days_left: 66,
      percent_lasted: 81.92,
    },
    1988: {
      overshoot_day: "10-18",
      days_lasted: 291,
      days_left: 75,
      percent_lasted: 79.51,
    },
    1989: {
      overshoot_day: "10-15",
      days_lasted: 287,
      days_left: 78,
      percent_lasted: 78.63,
    },
    1990: {
      overshoot_day: "10-14",
      days_lasted: 286,
      days_left: 79,
      percent_lasted: 78.36,
    },
    1991: {
      overshoot_day: "10-13",
      days_lasted: 285,
      days_left: 80,
      percent_lasted: 78.08,
    },
    1992: {
      overshoot_day: "10-15",
      days_lasted: 288,
      days_left: 78,
      percent_lasted: 78.69,
    },
    1993: {
      overshoot_day: "10-15",
      days_lasted: 287,
      days_left: 78,
      percent_lasted: 78.63,
    },
    1994: {
      overshoot_day: "10-13",
      days_lasted: 285,
      days_left: 80,
      percent_lasted: 78.08,
    },
    1995: {
      overshoot_day: "10-07",
      days_lasted: 279,
      days_left: 86,
      percent_lasted: 76.44,
    },
    1996: {
      overshoot_day: "10-04",
      days_lasted: 277,
      days_left: 89,
      percent_lasted: 75.68,
    },
    1997: {
      overshoot_day: "10-01",
      days_lasted: 273,
      days_left: 92,
      percent_lasted: 74.79,
    },
    1998: {
      overshoot_day: "10-01",
      days_lasted: 273,
      days_left: 92,
      percent_lasted: 74.79,
    },
    1999: {
      overshoot_day: "10-01",
      days_lasted: 273,
      days_left: 92,
      percent_lasted: 74.79,
    },
    2000: {
      overshoot_day: "09-25",
      days_lasted: 268,
      days_left: 98,
      percent_lasted: 73.22,
    },
    2001: {
      overshoot_day: "09-24",
      days_lasted: 266,
      days_left: 99,
      percent_lasted: 72.88,
    },
    2002: {
      overshoot_day: "09-21",
      days_lasted: 263,
      days_left: 102,
      percent_lasted: 72.05,
    },
    2003: {
      overshoot_day: "09-11",
      days_lasted: 253,
      days_left: 112,
      percent_lasted: 69.32,
    },
    2004: {
      overshoot_day: "09-02",
      days_lasted: 245,
      days_left: 121,
      percent_lasted: 66.94,
    },
    2005: {
      overshoot_day: "08-26",
      days_lasted: 237,
      days_left: 128,
      percent_lasted: 64.93,
    },
    2006: {
      overshoot_day: "08-21",
      days_lasted: 232,
      days_left: 133,
      percent_lasted: 63.56,
    },
    2007: {
      overshoot_day: "08-15",
      days_lasted: 226,
      days_left: 139,
      percent_lasted: 61.92,
    },
    2008: {
      overshoot_day: "08-15",
      days_lasted: 227,
      days_left: 139,
      percent_lasted: 62.02,
    },
    2009: {
      overshoot_day: "08-19",
      days_lasted: 230,
      days_left: 135,
      percent_lasted: 63.01,
    },
    2010: {
      overshoot_day: "08-08",
      days_lasted: 219,
      days_left: 146,
    },
    2011: {
      overshoot_day: "08-04",
      days_lasted: 215,
      days_left: 150,
      percent_lasted: 58.9,
    },
    2012: {
      overshoot_day: "08-04",
      days_lasted: 216,
      days_left: 150,
      percent_lasted: 59.02,
    },
    2013: {
      overshoot_day: "08-03",
      days_lasted: 214,
      days_left: 151,
      percent_lasted: 58.63,
    },
    2014: {
      overshoot_day: "08-04",
      days_lasted: 215,
      days_left: 150,
      percent_lasted: 58.9,
    },
    2015: {
      overshoot_day: "08-05",
      days_lasted: 216,
      days_left: 149,
      percent_lasted: 59.18,
    },
    2016: {
      overshoot_day: "08-06",
      days_lasted: 218,
      days_left: 148,
      percent_lasted: 59.56,
    },
    2017: {
      overshoot_day: "08-01",
      days_lasted: 212,
      days_left: 153,
      percent_lasted: 58.08,
    },
    2018: {
      overshoot_day: "07-28",
      days_lasted: 208,
      days_left: 157,
      percent_lasted: 56.99,
    },
    2019: {
      overshoot_day: "07-29",
      days_lasted: 209,
      days_left: 156,
      percent_lasted: 57.26,
    },
    2020: {
      overshoot_day: "08-22",
      days_lasted: 234,
      days_left: 132,
      percent_lasted: 63.93,
    },
    2021: {
      overshoot_day: "07-30",
      days_lasted: 210,
      days_left: 155,
      percent_lasted: 57.53,
    },
    2022: {
      overshoot_day: "07-28",
      days_lasted: 208,
      days_left: 157,
      percent_lasted: 56.99,
    },
    2023: {
      overshoot_day: "08-02",
      days_lasted: 213,
      days_left: 152,
      percent_lasted: 58.34,
    },
    2024: {
      overshoot_day: "08-01",
      days_lasted: 212,
      days_left: 153,
      percent_lasted: 58.08,
    },
    2025: {
      overshoot_day: "07-27",
      days_lasted: 208,
      days_left: 157,
      percent_lasted: 56.99,
    },
  };

  let datasets = [];
  let years = Object.keys(overshootDays);

  for (
    let year = parseInt(years[0]);
    year <= parseInt(years[years.length - 1]);
    year++
  ) {
    let a = moment(`${year}-01-01`);
    let b = moment(`${year}-12-31`);
    let dataset = [];

    let overshootDayPassed = false;

    for (let m = moment(a); m.diff(b, "days") <= 0; m.add(1, "days")) {
      let date = m.format("YYYY-MM-DD");
      if (
        !overshootDayPassed &&
        date === `${year}-${overshootDays[year].overshoot_day}`
      ) {
        overshootDayPassed = true;
      }

      let dt = new Date(date);

      dataset.push({
        x: date,
        y: Utils.isoDayOfWeek(dt),
        overshoot_day_passed: overshootDayPassed,
        date: date,
        days_lasted: overshootDays[year].days_lasted,
        percent_lasted: Math.round(overshootDays[year].percent_lasted),
        days_left: overshootDays[year].days_left,
      });
    }

    datasets.push(dataset);
  }

  // console.log( datasets );
  const dataDescriptions = document.getElementById("data-descriptions");

  let html = "";

  datasets.forEach(function (datapoint, index) {
    let notes = "";
    let dataYear = datapoint[0].date.split("-")[0];

    switch (dataYear) {
      case "2020":
        notes =
          ' <a href="https://earthobservatory.nasa.gov/images/148477/covid-19-lockdowns-cut-pollution-but-not-all-of-it" target="_blank" rel="noopener">Due to COVID-19</a>, the Overshoot Day was pushed further into the year.';
    }

    let isHighlighted = index === 0 ? "bg-dark" : "";

    html += `
          <div class="step --min-vh-100 p-3 ${isHighlighted}" data-step="${index}">
            <h2>${dataYear} <span class="percent-lasted text-white">${
      datapoint[0].percent_lasted
    }%</span></h2>
            <p>In ${dataYear} the Overshoot Day was on <strong>${moment(
      `${dataYear}-${overshootDays[dataYear].overshoot_day}`
    ).format(
      "MMMM DD"
    )}</strong>, which means our planet lasted us <span class="days-lasted">${
      datapoint[0].days_lasted
    } days</span> with <span class="days-left">${
      datapoint[0].days_left
    } days</span> left in the year.${notes}</p>
          </div>
        `;
  });

  dataDescriptions.innerHTML = html;

  Chart.defaults.color = "#000";
  // Chart.defaults.borderColor = "#8bd3dd";
  // Chart.defaults.backgroundColor = "rgb(255, 99, 132)";

  // console.log( datasets[0] );

  const colors = {
    // red: '#BF625A',
    // green: '#84D98A'
    red: "#D98B79",
    green: "#abd1c6",
  };

  const data = {
    datasets: [
      {
        label: "My Matrix",
        data: datasets[0],
        backgroundColor(c) {
          // const value = c.dataset.data[c.dataIndex].v;
          // const alpha = (10 + value) / 60;
          // return Chart.helpers.color('green').alpha(alpha).rgbString();

          return c.dataset.data[c.dataIndex].overshoot_day_passed
            ? colors.red
            : colors.green;
        },
        borderColor(c) {
          // const value = c.dataset.data[c.dataIndex].v;
          // const alpha = (10 + value) / 60;
          // return Chart.helpers.color('green').alpha(alpha).darken(0.3).rgbString();
          return c.dataset.data[c.dataIndex].overshoot_day_passed
            ? colors.red
            : colors.green;
        },
        borderWidth: 1,
        hoverBackgroundColor: "yellow",
        hoverBorderColor: "yellowgreen",
        width(c) {
          const a = c.chart.chartArea || {};
          return (a.right - a.left) / 60 - 1;
        },
        height(c) {
          const a = c.chart.chartArea || {};
          return (a.bottom - a.top) / 10 - 1;
        },
      },
    ],
  };

  const scales = {
    y: {
      type: "time",
      offset: true,
      time: {
        unit: "day",
        round: "day",
        isoWeekday: 1,
        parser: "d",
        // displayFormats: {
        //     // day: 'YYYY-MM-DD'
        // }
      },
      reverse: true,
      position: "right",
      ticks: {
        display: false,
        maxRotation: 0,
        autoSkip: true,
        padding: 1,
        // font: {
        //     size: 0
        // }
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
    },
    x: {
      type: "time",
      position: "bottom",
      offset: true,
      time: {
        unit: "week",
        round: "week",
        isoWeekday: 1,
        displayFormats: {
          week: "MMMM",
        },
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        // padding: 20,
        font: {
          color: "#fff",
          size: 12,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
    },
  };

  const options = {
    animation: false,
    aspectRatio: 5,
    plugins: {
      legend: false,
      tooltip: {
        displayColors: false,
        callbacks: {
          title() {
            return "";
          },
          label(context) {
            const v = context.dataset.data[context.dataIndex];
            return moment(v.date).format("MMMM DD YYYY");
          },
        },
      },
    },
    scales: scales,
    layout: {
      padding: {
        top: 10,
      },
    },
  };
  const chart = new Chart(document.getElementById("chart"), {
    type: "matrix",
    data: data,
    options: options,
  });

  document
    .querySelector(".col-sm-12.col-md-12.bg-white.p-0")
    .classList.add("sticky-top");

  const description = document.getElementById("description");
  const menuIcon = document.getElementById("menu-icon");
  const scroller = scrollama();

  scroller
    .setup({
      step: ".step",
    })
    .onStepEnter(function (response) {
      /* response = { direction, element, index }, */
      // console.log( 'onStepEnter', response );
      // console.log( 'onStepEnter', response.index, response.direction );

      let highlighted = document.querySelectorAll(".bg-dark.step");

      if (highlighted) {
        for (let i = 0, j = highlighted.length; i < j; i++) {
          highlighted[i].classList.remove("bg-dark");
        }
      }

      document
        .querySelector(`[data-step="${response.index}"]`)
        .classList.add("bg-dark");

      if (
        menuIcon &&
        ((response.direction === "down" && response.index >= 0) ||
          (response.direction === "up" &&
            response.index <= datasets.length - 1))
      ) {
        menuIcon.classList.add("d-none");
        menuIcon.classList.add("d-md-block");
      }

      chart.data.datasets[0].data = datasets[response.index];
      chart.update();

      // description.innerHTML = datasets[response.index][datasets[response.index].length-1].d;
      description.innerHTML = "";
    })
    .onStepExit(function (response) {
      /* response = { direction, element, index }, */
      // console.log( 'onStepExit', response );
      // console.log( 'onStepExit', response.index, response.direction );

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
});
