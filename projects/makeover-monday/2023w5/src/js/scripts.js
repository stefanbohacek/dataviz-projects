/* globals Chart, scrollama, moment */

function ready( fn ) {
    if ( document.readyState !== 'loading' ){
        fn();
    } else {
        document.addEventListener( 'DOMContentLoaded', fn );
    }
}

ready( function(){
    const labels = ['Artichoke Basille\'s Pizza - Times Square', 'Koronet Pizzeria', 'My PIE Pizzeria', 'Di Fara Pizza', 'Dough Boys Pizza', 'Pizza Italia', 'Marinara Pizza', 'Valentine\'s Pizza', 'Pronto Pizza', 'Artichoke Basille\'s Pizza - East Village'];

    // Chart.defaults.color = "#172c66";
    // Chart.defaults.borderColor = "#8bd3dd";
    // Chart.defaults.backgroundColor = "rgb(255, 99, 132)";

    const data = {
        // labels: labels[0],
        datasets: [{
            label: 'Price of a slice vs restaurant rating',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [
                {
                  "name": "Artichoke Basille's Pizza - Times Square",
                  "x": 6.53,
                  "y": 3.5
                },
                {
                  "name": "Koronet Pizzeria",
                  "x": 5.5,
                  "y": 3.5
                },
                {
                  "name": "My PIE Pizzeria",
                  "x": 5.25,
                  "y": 4.5
                },
                {
                  "name": "Di Fara Pizza",
                  "x": 5,
                  "y": 4.5
                },
                {
                  "name": "Dough Boys Pizza",
                  "x": 5,
                  "y": 3.5
                },
                {
                  "name": "Pizza Italia",
                  "x": 5,
                  "y": 4.5
                },
                {
                  "name": "Marinara Pizza",
                  "x": 4.9,
                  "y": 4.5
                },
                {
                  "name": "Valentine's Pizza",
                  "x": 4.5,
                  "y": 4
                },
                {
                  "name": "Pronto Pizza",
                  "x": 4.5,
                  "y": 3
                },
                {
                  "name": "Artichoke Basille's Pizza - East Village",
                  "x": 4.5,
                  "y": 4
                }
               ]
        }]
    };

    // const chart = new Chart(
    //     document.getElementById( 'chart' ),
    //     {
    //         type: 'scatter',
    //         data,
    //         options: {
    //             scales: {
    //                 x: {
    //                     ticks: {
    //                       callback: function( value, index, values ){
    //                         return `$${ value }`;
    //                     }
    //                 }
    //             }
    //         },
    //         plugins: {
    //             tooltip: {
    //                 callbacks: {
    //                     label: function( context ){
    //                         const name = context.raw.name;
    //                         const price = context.raw.x;
    //                         const rating = context.raw.y;
    //                         return `${name}: $${price} / ${rating}★`;
    //                   }
    //               }
    //           }
    //       }
    //   }
    // } );


    [...document.getElementsByClassName('step-next')].forEach(btn => {
        btn.addEventListener('click', ev => {
            ev.preventDefault();
            const stepID = ev.target.getAttribute('href');
            document.getElementById(stepID.replace('#', '')).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        })
    })

    const menuIcon = document.getElementById( 'menu-icon' );
    const scroller = scrollama();

    const locations = [];
    
    [...document.getElementsByClassName('step')].forEach(step => {
        const lng = parseFloat(step.dataset.lng);
        const lat = parseFloat(step.dataset.lat);

        const marker = new mapboxgl.Marker({ "color": "#232946" })
                                   .setLngLat([lng, lat]);
        locations.push([lng, lat]);
    });

    mapboxgl.accessToken = 'pk.eyJ1IjoiZm91cnRvbmZpc2giLCJhIjoiY2xlZzlkbHJlMDRuZTNzcDZyMzdwNmZyZiJ9.7IMx3xgFUmr_MSU3QeEU8g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-74.5, 40],
        zoom: 13
    });

    const firstStep = document.getElementById('step-0');

    const lng = parseFloat(firstStep.dataset.lng);
    const lat = parseFloat(firstStep.dataset.lat);

    const options = {
        center: [lng, lat],
        essential: false
    };

    map.flyTo(options);


    let markers = [];

    scroller
        .setup( {
            step: '.step',
        } )
        .onStepEnter( function( response ){
            /* response = { direction, element, index }, */
            // console.log( 'onStepEnter', response ); 
            // console.log( 'onStepEnter', response.index, response.direction );

            [...document.getElementsByClassName('active-step')].forEach(el => el.classList.remove('active-step'));
            response.element.classList.add('active-step');

            const lng = parseFloat(response.element.dataset.lng);
            const lat = parseFloat(response.element.dataset.lat);

            const options = {
                center: [lng, lat],
                essential: false
            };

            map.flyTo(options);
            
            markers = window.helpers.mapboxHelper.addMarkers(map, locations, markers, '#232946', '#b8c1ec', response.index);

            if ( menuIcon && ( ( response.direction === 'down' && response.index >= 0 ) || ( response.direction === 'up' && response.index <= datasets.length - 1 ) ) ){
                menuIcon.classList.add( 'd-none' );
                menuIcon.classList.add( 'd-md-block' );
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
} );
