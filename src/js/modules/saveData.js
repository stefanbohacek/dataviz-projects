const saveData = (label, data, expiration) => {
  const expirationMinutes = expiration || 10;
  const inXMinutes = new Date(
    new Date().getTime() + expirationMinutes * 60 * 1000
  );
  localStorage.setItem(
    label,
    JSON.stringify({ data: data, expiration: inXMinutes })
  );
};

export default saveData;
