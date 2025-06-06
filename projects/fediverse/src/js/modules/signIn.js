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
    localStorage.removeItem("fediverseUserData");
    const platform = await getServerPlatform(fediverseServer);
    let platformSupported = false;
    let authRedirectURL;
    let authServer;
    const app = "mastodon-dataviz";
    const environment = ftfGlobal.node_env ?? "production"

    if (environment === "development") {
      authServer = "http://localhost:3000/";
    } else {
      authServer = "https://auth.stefanbohacek.com/";
    }

    switch (platform) {
      case "mastodon":
      case "hometown":
      case "pixelfed":
      case "friendica":
      case "pleroma":
      case "akkoma":
      case "gotosocial":
        platformSupported = true;
        authRedirectURL = `${authServer}?method=oauth&instance=${fediverseServer}&scope=read:accounts+read:follows&app=${app}&environment=${environment}`;
        break;
      case "misskey":
      case "calckey":
      case "firefish":
      case "foundkey":
      case "magnetar":
      case "sharkey":
        platformSupported = true;
        authRedirectURL = `${authServer}?method=miauth&instance=${fediverseServer}&scope=read:account+read:following&app=${app}&environment=${environment}`;
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
