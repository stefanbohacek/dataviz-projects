const preloadImages = (urls) => {
  urls.forEach((url) => {
    let img = new Image();
    img.src = url;
  });
};

export default preloadImages;
