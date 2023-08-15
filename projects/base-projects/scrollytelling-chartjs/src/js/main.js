/* globals Chart, scrollama, moment */
import ready from '/js/modules/ready.min.js';
import highlightMax from '/js/modules/highlightMax.min.js';
import getMonth from '/js/modules/getMonth.min.js';


ready(() => {
    // const labels = [
    //   'January',
    //   'February',
    //   'March',
    //   'April',
    //   'May',
    //   'June',
    //   'July',
    //   'August',
    //   'September',
    //   'October',
    //   'November',
    //   'December'
    // ];

    const labels = [
        ['2013/01', '2013/02', '2013/03', '2013/04', '2013/05', '2013/06', '2013/07', '2013/08', '2013/09', '2013/10', '2013/11', '2013/12'],
        ['2014/01', '2014/02', '2014/03', '2014/04', '2014/05', '2014/06', '2014/07', '2014/08', '2014/09', '2014/10', '2014/11', '2014/12'],
        ['2015/01', '2015/02', '2015/03', '2015/04', '2015/05', '2015/06', '2015/07', '2015/08', '2015/09', '2015/10', '2015/11', '2015/12'],
        ['2016/01', '2016/02', '2016/03', '2016/04', '2016/05', '2016/06', '2016/07', '2016/08', '2016/09', '2016/10', '2016/11', '2016/12'],
        ['2017/01', '2017/02', '2017/03', '2017/04', '2017/05', '2017/06', '2017/07', '2017/08', '2017/09', '2017/10', '2017/11', '2017/12'],
        ['2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06', '2018/07', '2018/08', '2018/09', '2018/10', '2018/11', '2018/12'],
        ['2019/01', '2019/02', '2019/03', '2019/04', '2019/05', '2019/06', '2019/07', '2019/08', '2019/09', '2019/10', '2019/11', '2019/12'],
        ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05', '2020/06', '2020/07', '2020/08', '2020/09', '2020/10', '2020/11', '2020/12'],
        ['2021/01', '2021/02', '2021/03', '2021/04', '2021/05', '2021/06', '2021/07', '2021/08', '2021/09', '2021/10', '2021/11', '2021/12']
    ];

    const datasets = [
        [0, 10, 5, 2, 20, 30, 45, 35, 32, 25, 30, 15],
        [5, 8, 20, 15, 25, 35, 20, 30, 25, 15, 25, 5],
        [2, 14, 18, 5, 18, 40, 50, 45, 40, 25, 15, 10],
        [5, 15, 12, 20, 35, 30, 40, 42, 35, 30, 20, 8],
        [10, 20, 15, 20, 25, 35, 40, 40, 38, 45, 40, 27],
        [15, 20, 35, 40, 35, 42, 60, 50, 42, 50, 35, 25],
        [5, 15, 10, 25, 20, 30, 40, 55, 45, 25, 32, 28],
        [12, 24, 38, 25, 38, 45, 50, 60, 55, 50, 48, 25],
        [10, 20, 45, 35, 30, 40, 45, 35, 45, 50, 55, 52]
    ];

    const descriptionLabels = [
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Dolor magna eget est lorem ipsum dolor sit amet.',
        'Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus.',
        'Tortor condimentum lacinia quis vel eros.',
        'Neque vitae tempus quam pellentesque nec nam.',
        'Mus mauris vitae ultricies leo integer.',
        'Adipiscing commodo elit at imperdiet dui accumsan sit amet.',
        'Arcu cursus vitae congue mauris rhoncus.',
        'Tempor orci eu lobortis elementum.'
    ];

    // Chart.defaults.color = "#172c66";
    // Chart.defaults.borderColor = "#8bd3dd";
    // Chart.defaults.backgroundColor = "rgb(255, 99, 132)";

    const data = {
        labels: labels[0],
        datasets: [{
            label: 'Data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: datasets[0],
        }]
    };

    const chart = new Chart(
        document.getElementById('chart'),
        {
            type: 'line',
            data,
            options: {
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: Math.max(...[].concat(...datasets)),
                        ticks: {
                          callback: (value, index, values) => {
                            return `$${ value }`;
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (tooltipItems) => {
                            const title = tooltipItems[0].label;
                            const year = title.split('/')[0];
                            const month = getMonth(parseInt(title.split('/')[1]) - 1);
                            return `${month} ${year}`;
                        },
                        label: (context) => {
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                          }
                          if (context.parsed.y !== null) {
                              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                          }
                          return label;
                      }
                  }
              }
          }
      }
    });

    const description = document.getElementById('description');
    const menuIcon = document.getElementById('menu-icon');
    const scroller = scrollama();

    scroller
        .setup({
            step: '.step',
        })
        .onStepEnter((response) => {
            /* response = { direction, element, index }, */
            // console.log('onStepEnter', response); 
            // console.log('onStepEnter', response.index, response.direction);

            if (menuIcon && ((response.direction === 'down' && response.index >= 0) || (response.direction === 'up' && response.index <= datasets.length - 1))){
                menuIcon.classList.add('d-none');
                menuIcon.classList.add('d-md-block');
            }          

            chart.data.datasets[0].data = datasets[response.index];
            chart.data.labels = labels[response.index];
            chart.data.datasets[0].pointBackgroundColor = [];

            chart.data.datasets[0].data.forEach((d, i) => {
                if (chart.data.datasets[0].data[i] >= 30){
                    chart.data.datasets[0].pointBackgroundColor[i] = 'rgb(0,0,0)'; 
                } else {
                    chart.data.datasets[0].pointBackgroundColor[i] = 'rgb(255 99 132)'; 
                }
            });

            chart.update();
            description.innerHTML = descriptionLabels[response.index];

            highlightMax(chart);

        })
        .onStepExit((response) => {
            /* response = { direction, element, index }, */
            // console.log('onStepExit', response);
            // console.log('onStepExit', response.index, response.direction);

            if (menuIcon && ((response.direction === 'up' && response.index === 0) || (response.direction === 'down' && response.index === datasets.length - 1))){
                menuIcon.classList.remove('d-none');
            }
        }
   );

    window.addEventListener('resize', scroller.resize);
});
