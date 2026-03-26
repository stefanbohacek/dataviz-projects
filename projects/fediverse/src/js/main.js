/* globals Chart, scrollama, moment */

// global modules
import ready from "/js/modules/ready.min.js";
import loadData from "/js/modules/loadData.min.js";
import getUrlParams from "/js/modules/getUrlParams.min.js";

// local modules
import signIn from "./modules/signIn.min.js";
import getData from "./modules/getData.min.js";
import showData from "./modules/showData.min.js";

let userData;
const signInForm = document.getElementById("sign-in-form");

const errorMessages = {
  server_blocked:
    "Your server does not allow signing into this app. Please contact your admin.",
};

ready(async () => {
  signInForm.addEventListener("submit", signIn);
  userData = await loadData("fediverseUserData");
  const params = getUrlParams(false);

  if (params?.error) {
    if (errorMessages[params.error]) {
      alert(errorMessages[params.error]);
    }
  }

  if (userData) {
    showData(userData);
  } else {
    getData();
  }
});
