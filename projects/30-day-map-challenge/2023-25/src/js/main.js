/* globals mapboxgl */

import ready from "/js/modules/ready.min.js";

ready(async () => {
  const resp = await fetch("/data/antarctica/south-pole-stations.json");
  const stations = await resp.json();

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZm91cnRvbmZpc2giLCJhIjoiY2xvZ2g5MjkxMHR0dzJybzFjeWl1dWwxbCJ9.LrPluFJuIzcHp5Ts7HZb9Q";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v11",
    center: [0, 0],
    zoom: 3,
  });

  map.on("load", () => {
    map.flyTo({
      center: [135.0, -82.862755],
      duration: 8000,
      zoom: 2,
    });

    stations.forEach((station, index) => {
      const popupHtml = `
      <h3>${station.name}</h3>
      <p>
        <img width="220" src="/data/antarctica/stations/${station.name}.jpg">
        <br/>
        <a target="_blank" href="${station.url}">
          ${station.name}
        </a>
      </p>
      `;
      const marker = new mapboxgl.Marker()
        .setLngLat([station.location.lon, station.location.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml))
        .addTo(map);

      if (index === 0) {
        const popup = new mapboxgl.Popup({
          // closeOnClick: false,
          // closeButton: false,
        })
          .setLngLat([station.location.lon, station.location.lat])
          .setHTML(popupHtml)
          .addTo(map);
      }
    });
  });
});
