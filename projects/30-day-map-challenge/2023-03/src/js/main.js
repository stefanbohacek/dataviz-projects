/* globals mapboxgl */

import ready from "/js/modules/ready.min.js";

ready(async () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZm91cnRvbmZpc2giLCJhIjoiY2xvZ2g5MjkxMHR0dzJybzFjeWl1dWwxbCJ9.LrPluFJuIzcHp5Ts7HZb9Q";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v11",
    center: [40.712776, -74.005974],
    zoom: 1,
  });

  map.on("load", () => {
    map.addSource("pangea", {
      type: "geojson",
      data: "/data/continents/pangea.geojson",
    });

    map.addLayer({
      id: "pangea-layer",
      type: "fill",
      source: "pangea",
      paint: {
        "fill-opacity": 0.3,
      },
    });

    map.flyTo({
      center: [0, 0],
      duration: 12000,
    });
  });
});
