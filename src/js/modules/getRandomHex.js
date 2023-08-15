const getRandomHex = () => (Math.random() * (max - min) + min).toFixed(fixed) * 1;

export default getRandomHex;
