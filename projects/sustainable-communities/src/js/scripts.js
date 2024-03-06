/* globals Chart, scrollama, moment */

function ready( fn ) {
    if ( document.readyState !== 'loading' ){
        fn();
    } else {
        document.addEventListener( 'DOMContentLoaded', fn );
    }
}

ready( function(){
    const datasets = [
        {
            description: 'Global car sales by year in millions',
            labels:[2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],
            data:[59.82538999,62.11692753,65.35975731,62.11447225,60.39993278,69.10737696,72.21276899,74.6365189,77.78073407,80.74368694,84.60678349,89.11974173,91.2071613,91.23289985,86.892329]
        },
        {
            description: '600% increase in veganism in the US',
            labels:[2014,2017],
            data:[1,6]
        },
        {
            description: 'Top 100 companies responsible for 70% of polution',
            labels:['Top 100 companies', 'The rest'],
            data:[70.57,29.43]
        },
        {
            description: 'The US military emits more CO2 than many nations',
            labels:['U.S Military', 'Morocco', 'Peru', 'Sweden', 'Hungary', 'Finland', 'New Zealand', 'Norway', 'Switzerland'],
            data:[59.0,58.5,50.9,48.0,47.7,45.0,37.0,35.3,34.4]
        }
    ];

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
                            callback: function( value, index, values ){
                                return `${ value } mill`;
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function( context ){
                                let label = 'Cars sold: ';

                                if ( context.parsed.y !== null ) {
                                    label += new Intl.NumberFormat( 'en-US', {} ).format( context.parsed.y );
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
                            callback: function( value, index, values ){
                                return `${ value }%`;
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function( context ){
                                let label = context.dataset.label || '';
                                if ( label ) {
                                  label += ': ';
                              }
                              if ( context.parsed.y !== null ) {
                                  label += new Intl.NumberFormat( 'en-US', {} ).format( context.parsed.y );
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
                            label: function( context ){
                                let label = context.label += ' are responsible for ';
                                if ( context.parsed !== null ) {
                                    label += new Intl.NumberFormat( 'en-US', {} ).format( context.parsed );
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
                        label: function( context ){
                            let label = context.dataset.label || '';
                            if ( label ) {
                              label += ': ';
                          }
                          if ( context.parsed.y !== null ) {
                              label += new Intl.NumberFormat( 'en-US', {} ).format( context.parsed.y );
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

    let chart, chartWrapperEl = document.getElementById( 'chart-wrapper' ), chartEl = document.getElementById( 'chart' );

    const description = document.getElementById( 'description' );
    const scroller = scrollama();

    scroller
        .setup( {
            step: '.step',
        } )
        .onStepEnter( function( response ){
            /* response = { direction, element, index }, */
            // console.log( 'onStepEnter', response ); 
            // console.log( 'onStepEnter', response.index, response.direction );

            if ( chart && chart.destroy ){
                chart.destroy();
            }

            if ( response.index !== 'skip' && datasets[response.index] ){
                chartWrapperEl.classList.remove( 'opacity-0' );
                
                chart = new Chart(
                    chartEl,
                    config[response.index]
                );                    

                description.innerHTML = datasets[response.index].description;

                window.helpers.highlightMax( chart );

            } else {
                chartWrapperEl.classList.add( 'opacity-0' );
            }
            if ( config[response.index] ){
                chartWrapperEl.dataset.chartType = config[response.index].type;
            }
        } )
        .onStepExit( function( response ){
            /* response = { direction, element, index }, */
            // console.log( 'onStepExit', response );
            // console.log( 'onStepExit', response.index, response.direction );
        }
    );

    window.addEventListener( 'resize', scroller.resize );
} );
