import {isMobile} from './browserHelpers.min.js';
import getMaxValueIndices from './getMaxValueIndices.min.js';

const highlightMax = (chart, color) => {
  const tooltip = chart.tooltip;
  const chartArea = chart.chartArea;
  const maxValueIndices = getMaxValueIndices(chart.data.datasets[0].data);


  if (color){
      chart.data.datasets[0].backgroundColor = chart.data.datasets[0].backgroundColor || [];

      for (let i = 0; i < chart.data.datasets[0].data.length; i++){
          chart.data.datasets[0].backgroundColor[i] = Chart.defaults.backgroundColor;
      }
  }

  if (!isMobile()){
      maxValueIndices.forEach(maxValueIndex => {
          tooltip.setActiveElements(
              [
                  {
                      datasetIndex: 0,
                      index: maxValueIndex,
                  }
              ],
              {
                  x: (chartArea.left + chartArea.right) / 2,
                  y: (chartArea.top + chartArea.bottom) / 2,
              }
        );

          if (color){
              chart.data.datasets[0].backgroundColor[maxValueIndex] = color;
          }

      });
  }

  chart.update();
}

export default highlightMax;
