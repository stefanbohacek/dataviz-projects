const loadData = (label, options) => {
  let data = null;
  try {
    let localStorageItem = localStorage.getItem(label);
    if (localStorageItem) {
      localStorageItem = JSON.parse(localStorageItem);

      if (localStorageItem.expiration) {
        const dataExpiration = Date.parse(localStorageItem.expiration);
        const dateNow = new Date();

        if (dateNow > dataExpiration) {
          localStorage.removeItem(label);
        } else {
          data = localStorageItem.data;
        }
      }
    }
  } catch (err) {
    console.log("loadData error", err);
  }
  return data;
};

export default loadData;
