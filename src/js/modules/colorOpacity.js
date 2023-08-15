const colorOpacity = (color, opacity) => {
  /* A helper function that takes an rgb color and adds opacity to it. */
    opacity =
      opacity ||
      0.5 /* If no value is passed to the function, 0.5 will be used as a default value. */;
    return color.replace("rgb", "rgba").replace(")", "," + opacity + ")");
}

export default colorOpacity;
