const countWords = (text) =>
  text.split(" ").filter((n) => {
    return n !== "";
  }).length;

export default countWords;
