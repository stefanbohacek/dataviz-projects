const median = (values) => {
  if (values.length === 0) {
    throw new Error("No inputs");
  }

  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  }

  return (values[half - 1] + values[half]) / 2.0;
};

export default median;
