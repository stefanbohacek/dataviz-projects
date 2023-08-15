/* globals Chart, scrollama, moment */

import ready from '/js/modules/ready.min.js';
import highlightMax from '/js/modules/highlightMax.min.js';

ready(async () => {
    const resp = await fetch('/data/sustainable-communities/sustainable-communities.json');
    const datasets = await resp.json();

    const config = [
        {
            type: 'line',
            data: {
                labels: datasets[0].labels,
                datasets: [{
                    label: 'Car sales',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: datasets[0].data,
                }]
            },
            options: {
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: Math.max(datasets[0].data),
                        ticks: {
                            callback: function(value, index, values){
                                return `${ value } mill`;
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context){
                                let label = 'Cars sold: ';

                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {}).format(context.parsed.y);
                                }
                                return label + " mill";
                            }
                       }
                    }
                }
            }
        },
        {
            type: 'line',
            data: {
                labels: datasets[1].labels,
                datasets: [{
                    label: 'Self-reported vegans in the US',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: datasets[1].data,
                }]
            },
            options: {
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: Math.max(datasets[0].data),
                        ticks: {
                            callback: function(value, index, values){
                                return `${ value }%`;
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context){
                                let label = context.dataset.label || '';
                                if (label) {
                                  label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                  label += new Intl.NumberFormat('en-US', {}).format(context.parsed.y);
                              }
                              return label + '%';
                            }
                       }
                    }
                }
            }
        },
        {
            type: 'pie',
            data: {
                labels: datasets[2].labels,
                datasets: [{
                    label: 'Companies sharing responsibility for polution',
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)'
                    ],
                    borderColor: 'rgb(255, 99, 132)',
                    data: datasets[2].data,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        reverse: true,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context){
                                let label = context.label += ' are responsible for ';
                                if (context.parsed !== null) {
                                    label += new Intl.NumberFormat('en-US', {}).format(context.parsed);
                                }
                                return label + '% of polution';
                            }
                       }
                    }                    
                }                
            }
        },
        {
          type: 'bar',
            data: {
                labels: datasets[3].labels,
                datasets: [{
                    label: 'CO2 emissions',
                    backgroundColor: datasets[3].data.map((d, i) => i === 0 ? 'rgb(255, 99, 132)' : Chart.defaults.backgroundColor),
                    borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)'
                    ],                    
                    // backgroundColor: [
                    //   'rgb(255, 99, 132)',
                    //   'rgb(54, 162, 235)',
                    //   'rgb(255, 205, 86)'
                    // ],
                    borderColor: 'rgb(255, 99, 132)',
                    data: datasets[3].data,
                }]
            },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context){
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                          }
                          if (context.parsed.y !== null) {
                              label += new Intl.NumberFormat('en-US', {}).format(context.parsed.y);
                          }
                          return label + ' mill. tons';
                        }
                   }
                }
            }            
          }
        }        
    ];

    // Chart.defaults.color = "#172c66";
    // Chart.defaults.borderColor = "#8bd3dd";
    // Chart.defaults.backgroundColor = "rgb(255, 99, 132)";

    let chart, chartWrapperEl = document.getElementById('chart-wrapper'), chartEl = document.getElementById('chart');

    const description = document.getElementById('description');
    const scroller = scrollama();

    scroller
        .setup({
            step: '.step',
        })
        .onStepEnter(function(response){
            /* response = { direction, element, index }, */
            // console.log('onStepEnter', response); 
            // console.log('onStepEnter', response.index, response.direction);

            if (chart && chart.destroy){
                chart.destroy();
            }

            if (response.index !== 'skip' && datasets[response.index]){
                chartWrapperEl.classList.remove('opacity-0');
                
                chart = new Chart(
                    chartEl,
                    config[response.index]
               );                    

                description.innerHTML = datasets[response.index].description;

                highlightMax(chart);

            } else {
                chartWrapperEl.classList.add('opacity-0');
            }
            if (config[response.index]){
                chartWrapperEl.dataset.chartType = config[response.index].type;
            }
        })
        .onStepExit(function(response){
            /* response = { direction, element, index }, */
            // console.log('onStepExit', response);
            // console.log('onStepExit', response.index, response.direction);
        }
   );

    window.addEventListener('resize', scroller.resize);
});
