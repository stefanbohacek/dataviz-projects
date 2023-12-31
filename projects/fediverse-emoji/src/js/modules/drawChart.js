/* globals Chart */

import { backgroundColorFromData } from "/js/modules/chartHelper.min.js";

const menuIcon = document.getElementById("menu-icon");

const drawChart = (userData) => {
  // Chart.defaults.font.family = "Noto Color Emoji";
  let highlightedValues = [];
  // const labels = userData.allDomains.map((domain) => domain.domain);
  // const datasets = [userData.allDomains.map((domain) => domain.connections)];

  // Chart.defaults.color = "#172c66";
  // Chart.defaults.borderColor = "#8bd3dd";
  // Chart.defaults.backgroundColor = "rgb(255, 99, 132)";

  // const emojis = userData.emoji.slice(0, 10);
  const emojis = userData.emoji;
  const minFontSize = 25;
  const maxFontSize = 50;
  // const minFontSize = Math.min(200/emojis.length, 10);
  // const maxFontSize = Math.min(300/emojis.length, 40);

  // console.log({minFontSize, maxFontSize});

  const maxCount = Math.max(...emojis.map((emoji) => emoji.count));
  const minCount = Math.min(...emojis.map((emoji) => emoji.count));

  const scale = (num, in_min, in_max, out_min, out_max) =>
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

  const data = {
    // labels: emojis.map(emoji => `#${emoji.emoji}`),
    labels: emojis.map((emoji) => emoji.emoji),
    datasets: [
      {
        label: `Your top ${emojis.length.toLocaleString()} emoji`,
        // data: emojis.map((emoji) => emoji.count)
        data: emojis.map((emoji) =>
          scale(emoji.count, minCount, maxCount, minFontSize, maxFontSize)
        ),
        // data: emojis.map((d, i) => {
        //   let size = 5 + d.count * 5;
        //   if (size > 45){
        //     size = 45;
        //   }
        //   if (i > emojis.length - 5){
        //     size = 50 + (emojis.length - i);
        //   }

        //   return size;
        // })
      },
    ],
  };

  const options = {
    // fit: true,
    // responsive: true,
    rotationSteps: 0,
    minRotation: 0,
    padding: 4,
    family: "Noto Color Emoji",
    plugins: {
      // font: {
      //   family: "Noto Color Emoji"
      // },
      customCanvasBackgroundColor: "#fff",
      tooltip: {
        callbacks: {
          title: (tooltipItems) => emojis[tooltipItems[0].dataIndex].emoji,
          label: (context) => `used ${emojis[context.dataIndex].count} time(s)`,
        },
      },
    },
  };

  options.family = "Noto Color Emoji";
  const chart = new Chart(document.getElementById("chart"), {
    type: "wordCloud",
    data: data,
    options,
    plugins: [
      {
        id: "customCanvasBackgroundColor",
        beforeDraw: (chart, args, options) => {
          const { ctx } = chart;
          ctx.save();
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = options.color || "#fff";
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },
    ],
  });

  window.emojiChart = chart; 

  document.fonts.onloadingdone = () => {
    if (window.emojiChart){
      window.emojiChart.update();      
    }
  };
};

export default drawChart;
