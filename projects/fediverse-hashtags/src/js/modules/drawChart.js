import {backgroundColorFromData} from '/js/modules/chartHelper.min.js';

const menuIcon = document.getElementById('menu-icon');

const drawChart = (userData) => {
  let highlightedValues = [];
  // const labels = userData.allDomains.map((domain) => domain.domain);
  // const datasets = [userData.allDomains.map((domain) => domain.connections)];

  // Chart.defaults.color = "#172c66";
  // Chart.defaults.borderColor = "#8bd3dd";
  // Chart.defaults.backgroundColor = "rgb(255, 99, 132)";

  // const hashtags = userData.hashtags.slice(0, 10);
  const hashtags = userData.hashtags;
  const minFontSize = 20;
  const maxFontSize = 22;
  // const minFontSize = Math.min(200/hashtags.length, 10);
  // const maxFontSize = Math.min(300/hashtags.length, 40);

  // console.log({minFontSize, maxFontSize});

  const maxCount = Math.max(...hashtags.map(hashtag => hashtag.count));
  const minCount = Math.min(...hashtags.map(hashtag => hashtag.count));

  const scale = (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

  const data = {
    // labels: hashtags.map(hashtag => `#${hashtag.hashtag}`),
    labels: hashtags.map(hashtag => hashtag.hashtag),
    datasets: [
      {
        label: 'Your hashtags',
        // data: hashtags.map((hashtag) => hashtag.count)
        // data: hashtags.map((hashtag) => scale(hashtag.count, minCount, maxCount, minFontSize, maxFontSize ))
        data: hashtags.map((d, i) => {
          let size = 5 + d.count * 5;
          if (size > 45){
            size = 45;
          }
          if (i > hashtags.length - 5){
            size = 50 + (hashtags.length - i);
          }

          return size;
        })
      },
    ],
  };

  const chart = new Chart(document.getElementById("chart"), {
    type: "wordCloud",
    data: data,
    options: {
      // fit: true,
      // responsive: true,
      // padding: 2,
      plugins: {
        customCanvasBackgroundColor: "#fff",
        tooltip: {
          callbacks: {
            title: (tooltipItems) => `#${hashtags[tooltipItems[0].dataIndex].hashtag}`,
            label: (context) => `used ${hashtags[context.dataIndex].count} time(s)`
          }
        }
      }
    },
    plugins: [{
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#fff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    }],
  });

};

export default drawChart;
