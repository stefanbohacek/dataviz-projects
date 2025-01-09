/* globals Chart, scrollama, moment */

import ready from '/js/modules/ready.min.js';

ready(async () => {
    const resp = await fetch('/data/overshoot-days/overshoot-days.json');
    const overshootDays = await resp.json();

    const Utils = {
        isoDayOfWeek: (dt) => {
          let wd = dt.getDay(); // 0..6, from sunday
          wd = (wd + 6) % 7 + 1; // 1..7 from monday
          return '' + wd; // string so it gets parsed
        },
        startOfToday: () => {
          const d = new Date();
          return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        }
    };

    let datasets = [];
    let years = Object.keys(overshootDays);

    for (let year = parseInt(years[0]); year <= parseInt(years[years.length - 1]); year++){
      let a = moment(`${year}-01-01`);
      let b = moment(`${year}-12-31`);
      let dataset = [];

      let overshootDayPassed = false;

      for (let m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')){
        let date = m.format('YYYY-MM-DD');
        if (!overshootDayPassed && date === `${ year }-${ overshootDays[year].overshoot_day }`){
            overshootDayPassed = true;

        }

        let dt = new Date(date);

        dataset.push({
            x: date,
            y: Utils.isoDayOfWeek(dt),
            overshoot_day_passed: overshootDayPassed,
            date: date,
            days_lasted: overshootDays[year].days_lasted,
            percent_lasted:  Math.round(overshootDays[year].percent_lasted),
            days_left: overshootDays[year].days_left
        });
      }

      datasets.push(dataset);
    }

    const dataDescriptions = document.getElementById('data-descriptions');

    let html = '';

    datasets.forEach((datapoint, index) => {
        let notes = '';
        let dataYear = datapoint[0].date.split('-')[0];

        switch (dataYear){
            case '2020':
                notes = ' <a href="https://earthobservatory.nasa.gov/images/148477/covid-19-lockdowns-cut-pollution-but-not-all-of-it" target="_blank" rel="noopener">Due to COVID-19</a>, the Overshoot Day was pushed further into the year.';
        }

        let isHighlighted = index === 0 ? 'bg-dark' : '';

        html += `
          <div class="step --min-vh-100 p-3 ${ isHighlighted }" data-step="${ index }">
            <h2 class="text-body-secondary">${dataYear} <span class="percent-lasted text-white">${ datapoint[0].percent_lasted }%</span></h2>
            <p>In ${dataYear} the Overshoot Day was on <strong>${ moment(`${dataYear}-${overshootDays[dataYear].overshoot_day}`).format('MMMM DD') }</strong>, which means our planet lasted us <span class="days-lasted">${ datapoint[0].days_lasted } days</span> with <span class="days-left">${ datapoint[0].days_left } days</span> left in the year.${ notes }</p>
          </div>
        `;
    });

    dataDescriptions.innerHTML = html;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        Chart.defaults.color = "#fff";
    } else {
        Chart.defaults.color = "#000";
    }
    

    // Chart.defaults.borderColor = "#8bd3dd";
    // Chart.defaults.backgroundColor = "rgb(255, 99, 132)";

    // console.log(datasets[0]);

    const colors = {
        // red: '#BF625A',
        // green: '#84D98A'
        red: '#D98B79',
        green: '#abd1c6'        
    };

    const data = {
        datasets: [{
            label: 'My Matrix',
            data: datasets[0],
            backgroundColor(c) {
                // const value = c.dataset.data[c.dataIndex].v;
                // const alpha = (10 + value) / 60;
                // return Chart.helpers.color('green').alpha(alpha).rgbString();

                return c.dataset.data[c.dataIndex].overshoot_day_passed ? colors.red : colors.green;
            },
            borderColor(c) {
                // const value = c.dataset.data[c.dataIndex].v;
                // const alpha = (10 + value) / 60;
                // return Chart.helpers.color('green').alpha(alpha).darken(0.3).rgbString();
                return c.dataset.data[c.dataIndex].overshoot_day_passed ? colors.red : colors.green;
            },
            borderWidth: 1,
            hoverBackgroundColor: 'yellow',
            hoverBorderColor: 'yellowgreen',
            width(c) {
                const a = c.chart.chartArea || {};
                return (a.right - a.left) / 60 - 1;
            },
            height(c) {
                const a = c.chart.chartArea || {};
                return (a.bottom - a.top) / 10 - 1;
            }
        }]
    };

    const scales = {
        y: {
            type: 'time',
            offset: true,
            time: {
                unit: 'day',
                round: 'day',
                isoWeekday: 1,
                parser: 'd',
                // displayFormats: {
                //     // day: 'YYYY-MM-DD'
                // }
            },
            reverse: true,
            position: 'right',
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
                tickLength: 0
            }
        },
        x: {
            type: 'time',
            position: 'bottom',
            offset: true,
            time: {
                unit: 'week',
                round: 'week',
                isoWeekday: 1,
                displayFormats: {
                    week: 'MMMM'
                }
            },
            ticks: {
                maxRotation: 0,
                autoSkip: true,
                // padding: 20,
                font: {
                    color: '#fff',
                    size: 12
                }
            },
            grid: {
                display: false,
                drawBorder: false,
                tickLength: 0,
            }
        }
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
                        return '';
                    },
                    label(context) {
                        const v = context.dataset.data[context.dataIndex];
                        return moment(v.date).format('MMMM DD YYYY');
                    }
                }
            },
        },
        scales: scales,
        layout: {
            padding: {
                top: 10
            }
        }
    };
    const chart = new Chart(document.getElementById('chart'), {
        type: 'matrix',
        data: data,
        options: options
    });

    document.querySelector('.col-sm-12.col-md-12.bg-white.p-0').classList.add('sticky-top');
    
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

            let highlighted = document.querySelectorAll('.bg-dark.step');

            if (highlighted){
                for (let i = 0, j = highlighted.length; i < j; i++){
                    highlighted[i].classList.remove('bg-dark');
                }
            }

            document.querySelector(`[data-step="${ response.index }"]`).classList.add('bg-dark');

            if (menuIcon && ((response.direction === 'down' && response.index >= 0) || (response.direction === 'up' && response.index <= datasets.length - 1))){
                menuIcon.classList.add('d-none');
                menuIcon.classList.add('d-md-block');
            }          

            chart.data.datasets[0].data = datasets[response.index];
            chart.update();

            // description.innerHTML = datasets[response.index][datasets[response.index].length-1].d;
            description.innerHTML = '';
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
