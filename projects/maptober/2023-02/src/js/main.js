import ready from '/js/modules/ready.min.js';
import latLongDistance from '/js/modules/latLongDistance.min.js';

const getPopUpHTML = (item, nyc) => `
  <a target="_blank" href="${item.city}">
    <h3>${item.city}, ${item.country}</h3>
  </a>
  <p>
    ${latLongDistance(
      nyc.latitude,
      nyc.longitude,
      item.latitude,
      item.longitude
    )} miles
    (${latLongDistance(
      nyc.latitude,
      nyc.longitude,
      item.latitude,
      item.longitude,
      "K"
    )} kilometers)
    from NYC
  </p>
`;

ready(async () => {
    const resp = await fetch("/data/nyc-sister-cities/data.json");
    let sisterCities = await resp.json();
    const nyc = sisterCities.shift();
    mapboxgl.accessToken = 'pk.eyJ1IjoiZm91cnRvbmZpc2giLCJhIjoiY2xvZ2g5MjkxMHR0dzJybzFjeWl1dWwxbCJ9.LrPluFJuIzcHp5Ts7HZb9Q';
    
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      // center: [nyc.longitude, nyc.latitude],
      // center: [0, 0],
      center: [sisterCities[9].longitude, sisterCities[9].latitude],
      zoom: 2,
    });
  
    map.flyTo({
      center: [nyc.longitude, nyc.latitude],
    });
  
  
    let popups = [];
  
    const coordinates = sisterCities.map((item) => [
      item.longitude,
      item.latitude,
    ]);
  
    console.log({ coordinates });
  
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <a target="_blank" href="${nyc.wikipedia}">
        <h3>${nyc.city}, ${nyc.country}</h3>
      </a>
    `);
  
    popups.push(popup);
  
    map.on("load", () => {
      const marker = new mapboxgl.Marker()
        .setLngLat([nyc.longitude, nyc.latitude])
        .setPopup(popup)
        .addTo(map);
  
      sisterCities.forEach((item) => {
        map.addSource(`route-${item.city}`, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [nyc.longitude, nyc.latitude],
                [item.longitude, item.latitude],
              ],
            },
          },
        });
  
        map.addLayer({
          id: `route-${item.city}`,
          type: "line",
          source: `route-${item.city}`,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
  
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          getPopUpHTML(item, nyc)
        );
        popups.push(popup);
  
        const marker = new mapboxgl.Marker()
          .setLngLat([item.longitude, item.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    });
  
    const descriptionEl = document.getElementById("description");
  
    let descriptionHTML = `
    <p>
      <a href="https://en.wikipedia.org/wiki/List_of_sister_cities_in_New_York"><strong>New York's sister cities</strong></a> |
      <a href="nyc-sister-cities.json" target="_blank">Download</a>
    </p>
    <ul>
      ${sisterCities
        .map(
          (item) => `
      <li>
      <a
        class="show-city"
        data-city="${item.city.toLowerCase().replaceAll(" ", "-")}"
        data-city-name="${item.city}"
        data-country-name="${item.country}"
        data-lat="${item.latitude}"
        data-long="${item.longitude}"
        href="#"
      >
        ${item.city}, ${item.country}
      </a>
      </li>
        
      `
        )
        .join("")}
    </ul>
    `;
  
    descriptionEl.innerHTML = descriptionHTML;
  
    [...document.getElementsByClassName("show-city")].forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log("ev.target", ev.target);
        const lat = ev.target.dataset.lat;
        const long = ev.target.dataset.long;
  
        console.log({ lat, long });
  
        console.log({ popups });
  
        popups.forEach((popup) => {
          console.log("removing...", popup);
          popup.remove();
        });
  
        popups = [];
  
        map.flyTo({
          center: [long, lat],
        });
  
        const popup = new mapboxgl.Popup().setLngLat([long, lat]).setHTML(
          getPopUpHTML(
            {
              city: ev.target.dataset.cityName,
              country: ev.target.dataset.countryName,
              wikipedia: ev.target.dataset.wikipedia,
              latitude: lat,
              longitude: long,
            },
            nyc
          )
        );
  
        popup.addTo(map);
        popups.push(popup);
      });
    });








});
