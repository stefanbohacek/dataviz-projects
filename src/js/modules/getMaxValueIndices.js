const getMaxValueIndices = (arr) => {
  let max = -Infinity;
  let indices = [];

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] < max) {
      continue;
    }
    if (arr[i] > max) {
      indices = [];
      max = arr[i];
    }
    indices.push(i);
  }
  return indices;
};

export default getMaxValueIndices;
