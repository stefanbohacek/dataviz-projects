import ready from '/js/modules/ready.min.js';
import getMastodonURL from '/js/modules/getMastodonURL.min.js';


ready(async () => {

    // mapboxgl.accessToken = 'pk.eyJ1IjoiZm91cnRvbmZpc2giLCJhIjoiY2xvZ2g5MjkxMHR0dzJybzFjeWl1dWwxbCJ9.LrPluFJuIzcHp5Ts7HZb9Q';
    mapboxgl.accessToken = 'pk.eyJ1IjoiZm91cnRvbmZpc2giLCJhIjoiY2tlMjN2ZjljMDVsOTJ6cDgxNGgweTJ5ZiJ9.mJ0-aoLZIVU2bqjH3j9kKQ';

    const map = new mapboxgl.Map({
      container: "map",
      projection: "equalEarth",
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 30],
      zoom: 3,
    });
  
    const resp = await fetch("/data/fediverse/fediverse-gov-accounts.json");
    const data = await resp.json();
    let countries = {};
  
    data.forEach((item) => {
      if (countries[item.country]){
        countries[item.country]++;
      } else {
        countries[item.country] = 1;
      }
      const longitude = parseFloat(item.physical_location.longitude);
      const latitude = parseFloat(item.physical_location.latitude);
  
  
      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) 
            .setHTML(`
              <h3>${item.itemLabel}</h3>
              <p>
                <a target="_blank" href="${getMastodonURL(item.MastName)}">
                  @${item.MastName}
                </a>
                </p>
              `)
        )
        .addTo(map);
    });
  
    console.log({countries});
    
    
    let countriesSortable = [];
    for (var country in countries) {
      countriesSortable.push([country, countries[country]]);
    }
    
    countriesSortable.sort(function(a, b) {
      return b[1] - a[1];
    });
  
    console.log({countriesSortable});
  
    const descriptionEl = document.getElementById("description");
  
    let descriptionHTML = `
    <details>
      <summary>Government agencies with fediverse presence</summary>
      <ul>
        ${countriesSortable.map(country => `
        <li>
        ${country[0]}: ${country[1]}
        </li>
          
        `).join('')}
      </ul>
    </details>
    <p>
      Source: wikidata.org | <a href="/data/fediverse/fediverse-gov-accounts.json" target="_blank">Download data</a>
    </p>
    `;
  
    descriptionEl.innerHTML = descriptionHTML;
    
    
});