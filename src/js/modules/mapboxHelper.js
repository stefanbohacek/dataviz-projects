/* globals mapboxgl */
const addMarkers = (
  map,
  locations,
  previousMarkers,
  colorDefault,
  colorHighlight,
  indexHighlight
) => {
  if (previousMarkers && previousMarkers.length) {
    previousMarkers.forEach((marker) => {
      marker.remove();
    });
  }

  let markers = [];
  locations.forEach((location, index) => {
    const marker = new mapboxgl.Marker({
      color: index === indexHighlight ? colorHighlight : colorDefault,
    })
      .setLngLat([location[0], location[1]])
      .addTo(map);

    markers.push(marker);
  });

  return markers;
};

export { addMarkers };
