/* globals Chart, mapboxgl, scrollama, moment */

import ready from "/js/modules/ready.min.js";
import { addMarkers } from "/js/modules/mapboxHelper.min.js";

ready(async () => {
  const resp = await fetch("/data/nyc-pizza-slices/nyc-pizza-slices.json");
  let dataset = await resp.json();
  dataset = dataset.map((d) => {
    return {
      name: d.name,
      x: d.lat,
      y: d.lng,
    };
  });

  const data = {
    datasets: [
      {
        label: "Price of a slice vs restaurant rating",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: dataset,
      },
    ],
  };

  [...document.getElementsByClassName("step-next")].forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      const stepID = ev.target.getAttribute("href");
      document
        .getElementById(stepID.replace("#", ""))
        .scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
    });
  });

  const menuIcon = document.getElementById("menu-icon");
  const scroller = scrollama();

  const locations = [];

  [...document.getElementsByClassName("step")].forEach((step) => {
    const lng = parseFloat(step.dataset.lng);
    const lat = parseFloat(step.dataset.lat);

    const marker = new mapboxgl.Marker({ color: "#232946" }).setLngLat([
      lng,
      lat,
    ]);
    locations.push([lng, lat]);
  });

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZm91cnRvbmZpc2giLCJhIjoiY2xvZ2g5MjkxMHR0dzJybzFjeWl1dWwxbCJ9.LrPluFJuIzcHp5Ts7HZb9Q";

  const map = new mapboxgl.Map({
    container: "map",
    // style: "mapbox://styles/mapbox/light-v11",
    style: "mapbox://styles/mapbox/dark-v11",
    // style: "mapbox://styles/mapbox/streets-v12",
    // style: "mapbox://styles/mapbox/satellite-v9",
    center: [40.712776, -74.005974],
    zoom: 1,
  });

  map.on("load", () => {
    map.addSource("asia", {
      type: "geojson",
      data: "/data/continents/asia.geojson",
      // data: "/data/continents/non-asia.geojson",
    });

    map.addLayer({
      id: "asia-layer",
      type: "fill",
      source: "asia",
      paint: {
        "fill-color": "#fff",
        "fill-opacity": 0.15,
      },
    });

    map.flyTo({
      center: [78.962883, 20.593683],
      zoom: 3,
      duration: 2000,
    });
  });

  const firstStep = document.getElementById("step-0");

  const lng = parseFloat(firstStep.dataset.lng);
  const lat = parseFloat(firstStep.dataset.lat);

  const options = {
    center: [lng, lat],
    essential: false,
  };

  map.flyTo(options);

  let markers = [];

  scroller
    .setup({
      step: ".step",
    })
    .onStepEnter((response) => {
      /* response = { direction, element, index }, */
      // console.log('onStepEnter', response);
      // console.log('onStepEnter', response.index, response.direction);

      [...document.getElementsByClassName("active-step")].forEach((el) =>
        el.classList.remove("active-step")
      );
      response.element.classList.add("active-step");

      const lng = parseFloat(response.element.dataset.lng);
      const lat = parseFloat(response.element.dataset.lat);

      const options = {
        center: [lng, lat],
        duration: 2400,
        essential: false,
      };

      map.flyTo(options);

      markers = addMarkers(
        map,
        locations,
        markers,
        "#666",
        "#ddd",
        response.index
      );

    //   if (
    //     menuIcon &&
    //     ((response.direction === "down" && response.index >= 0) ||
    //       (response.direction === "up" &&
    //         response.index <= datasets.length - 1))
    //   ) {
    //     menuIcon.classList.add("d-none");
    //     menuIcon.classList.add("d-md-block");
    //   }
    })
    .onStepExit((response) => {
      /* response = { direction, element, index }, */
      // console.log('onStepExit', response);
      // console.log('onStepExit', response.index, response.direction);

      // if (
      //   menuIcon &&
      //   ((response.direction === "up" && response.index === 0) ||
      //     (response.direction === "down" &&
      //       response.index === datasets.length - 1))
      // ) {
      //   menuIcon.classList.remove("d-none");
      // }
    });

  window.addEventListener("resize", scroller.resize);
});
