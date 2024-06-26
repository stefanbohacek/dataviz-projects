/* globals Chart, scrollama, moment */

function ready( fn ) {
    if ( document.readyState !== 'loading' ){
        fn();
    } else {
        document.addEventListener( 'DOMContentLoaded', fn );
    }
}

ready( function(){
    let showAll = false;

    const dataset = [
        {
            "country": "U.S.",
            "budget": 801,
            "percentage_global": 37.9,
            "percentage_gdp": 3.48,
            "logo": "us"
        },
        {
            "country": "China",
            "budget": 293,
            "percentage_global": 13.9,
            "percentage_gdp": 1.74,
            "logo": "china"
        },
        {
            "country": "India",
            "budget": 76.6,
            "percentage_global": 3.6,
            "percentage_gdp": 2.66,
            "logo": "india"
        },
        {
            "country": "UK",
            "budget": 68.4,
            "percentage_global": 3.2,
            "percentage_gdp": 2.22,
            "logo": "uk"
        },
        {
            "country": "Russia",
            "budget": 65.9,
            "percentage_global": 3.1,
            "percentage_gdp": 4.08,
            "logo": "russia"
        },
        {
            "country": "France",
            "budget": 56.6,
            "percentage_global": 2.7,
            "percentage_gdp": 1.95,
            "logo": "france"
        },
        {
            "country": "Germany",
            "budget": 56,
            "percentage_global": 2.7,
            "percentage_gdp": 1.34,
            "logo": "germany"
        },
        {
            "country": "Saudi Arabia",
            "budget": 55.6,
            "percentage_global": 2.6,
            "percentage_gdp": 6.59,
            "logo": "saudi-arabia"
        },
        {
            "country": "Japan",
            "budget": 54.1,
            "percentage_global": 2.6,
            "percentage_gdp": 1.07,
            "logo": "japan"
        },
        {
            "country": "South Korea",
            "budget": 50.2,
            "percentage_global": 2.4,
            "percentage_gdp": 2.78,
            "logo": "south-korea"
        },
        {
            "country": "Rest of the world",
            "budget": 536,
            "percentage_global": 25.3,
            "logo": "world"
        }
    ];

    Chart.defaults.color = "#172c66";
    Chart.defaults.borderColor = "#8bd3dd";
    Chart.defaults.backgroundColor = "#fef6e4";

    const dataLabels = dataset.map( function( datapoint ){
        return datapoint.country;
    } );

    const dataValues = dataset.map( function( datapoint ){
        return datapoint.budget;
    } );

    const logos = dataset.map(d => {
        return {
            src: `${ window.location.pathname }/images/logos/${d.logo}.png`,
            width: 20,
            height: 20
        }        
    });

    const data = {
        labels: [],
        datasets: [{
            label: 'Budget',
            borderWidth: 1,
            data: []
        }]
    };

    const config = {
        type: 'bar',
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
                    suggestedMax: Math.max( dataValues ),
                    ticks: {
                        callback: function( value, index, values ){
                            return `${new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD' } ).format( value )}B`;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Top 10 Countries by Military Spending'
                },                
                subtitle: {
                    display: true,
                    text: '2021 budget in billions of US Dollars',
                    padding: {
                        bottom: 30
                    }                    
                },                
                tooltip: {
                    callbacks: {
                        label: function( context ){
                            let label = context.dataset.label || '';
                            if ( label ) {
                              label += ': ';
                          }
                          if ( context.parsed.y !== null ) {
                              label += `${new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD' } ).format( context.parsed.y )}B`;
                          }
                          return label;
                      }
                  }
                },
                datalabels: {
                    anchor: 'end',
                    align  : 'start'        
                },
                labels: {
                    render: 'image',
                    textMargin: -16,
                    images: logos
                }
            }            
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: function( tooltipItems ) {
                        const title = tooltipItems[0].label;
                        const year = title.split( '/' )[0];
                        const month = window.helpers.getMonth( parseInt( title.split( '/' )[1] ) - 1 );
                        return `${month} ${year}`;
                    },
                    label: function( context ){
                        let label = context.dataset.label || '';
                        if ( label ) {
                          label += ': ';
                      }
                      if ( context.parsed.y !== null ) {
                          label += `$${new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD' } ).format( context.parsed.y )}B`;
                      }
                      return label;
                  }
              }
            }        
        }        
    };

    const chart = new Chart( document.getElementById( 'chart' ), config );

    const description = document.getElementById( 'description' );
    const menuIcon = document.getElementById( 'menu-icon' );
    const scroller = scrollama();

    scroller
        .setup( {
            step: '.step',
        } )
        .onStepEnter( function( response ){
            /* response = { direction, element, index }, */
            // console.log( 'onStepEnter', response ); 
            // console.log( 'onStepEnter', response.index, response.direction );

            // if ( response.index === 0 ){
            //     description.innerHTML = '';
            // }

            chart.options.scales.x.display = true;
            chart.options.scales.y.display = true;

            if ( !showAll ){
                chart.data.datasets[0].data = dataValues.slice(0, response.index + 1);
                chart.data.datasets[0].backgroundColor = dataset.map((d, i) => i === 0 ? 'rgb(255, 99, 132)' : Chart.defaults.backgroundColor);
                chart.data.labels = dataLabels.slice(0, response.index + 1);
                // chart.data.labels[response.index] = dataLabels[response.index];

                description.innerHTML = '';
                chart.update();
                window.helpers.highlightMax( chart );
            }

            if ( response.index === dataset.length - 1 ){
                showAll = true;
            }

        } )
        .onStepExit( function( response ){
            /* response = { direction, element, index }, */
            // console.log( 'onStepExit', response );
            // console.log( 'onStepExit', response.index, response.direction );

            if ( menuIcon && ( ( response.direction === 'up' && response.index === 0 ) || ( response.direction === 'down' && response.index === datasets.length - 1 ) ) ){
                menuIcon.classList.remove( 'd-none' );
            }
        }
    );

    window.addEventListener( 'resize', scroller.resize );
    
    window.helpers.preloadImages( logos.map( function( logo ){
        return logo.src;
    } ) );

} );
