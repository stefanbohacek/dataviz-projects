import config from "./config.min.js";
import ready from "./modules/ready.min.js";
import { isSafari, isSafariMobile } from "./modules/browserHelpers.min.js";

window.globalConfig = config;

ready(() => {
  if (isSafari() && !isSafariMobile()) {
    const t = document.querySelectorAll(".col-sm-12.sticky-top");
    if (t && t.length) {
      for (let e = 0, r = t.length; e < r; e++) {
        if (t[0].dataset && !t[0].dataset.keepSticky) {
          t[0].classList.remove("sticky-top");
        }
      }
    }
  }
});
