let initAwesompleteIntervalID;

const initAwesompleteFn = (selector, options) => {
  new Awesomplete(document.querySelector(selector), options);
};

export default (selector, options) => {
  if (typeof Awesomplete !== "undefined") {
    clearInterval(initAwesompleteIntervalID);
    initAwesompleteFn(selector, options);
  } else {
    initAwesompleteIntervalID = setInterval(() => {
      initAwesompleteFn(selector, options);
    }, 1000);
  }
};
