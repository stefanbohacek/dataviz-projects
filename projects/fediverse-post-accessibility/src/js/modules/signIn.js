/* globals ftfGlobal */

import getServerPlatform from "/js/modules/getServerPlatform.min.js";
const fediverseServerField = document.getElementById("fediverse-server");
const signInBtn = document.getElementById("sign-in");

const signIn = async (ev) => {
  ev.preventDefault();

  fediverseServerField.disabled = true;
  signInBtn.disabled = true;

  const fediverseServer = fediverseServerField.value.trim();

  if (fediverseServer) {
    localStorage.removeItem("fediversePostAccessibility");
    const platform = await getServerPlatform(fediverseServer);
    let platformSupported = false;
    let authRedirectURL;
    let authServer;
    let app;

    if (ftfGlobal.node_env === "development") {
      authServer = "http://localhost:3000/";
      app = "fediverse-post-accessibility-local";
    } else {
      authServer = "https://auth.stefanbohacek.dev/";
      app = "fediverse-post-accessibility";
    }

    switch (platform) {
      case "mastodon":
      case "hometown":
      case "friendica":
      case "pleroma":
      case "akkoma":
        platformSupported = true;
        authRedirectURL = `${authServer}?method=oauth&instance=${fediverseServer}&scope=read:accounts+read:statuses&app=${app}`;
        break;
      case "misskey":
      case "calckey":
      case "firefish":
      case "foundkey":
      case "magnetar":
        platformSupported = true;
        authRedirectURL = `${authServer}?method=miauth&instance=${fediverseServer}&scope=read:account&app=${app}`;
        break;
      default:
        alert("Sorry, this platform is not yet supported.");
        fediverseServerField.disabled = false;
        signInBtn.disabled = false;
        break;
    }

    if (platformSupported) {
      signInBtn.innerHTML = "Loading...";
      window.location.href = authRedirectURL;
    }
  } else {
    fediverseServerField.focus();
    alert("Please fill out the name of your instance.");
    fediverseServerField.disabled = false;
    signInBtn.disabled = false;
  }
};

export default signIn;
