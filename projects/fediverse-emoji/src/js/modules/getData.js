// global modules

import getServerPlatform from "/js/modules/getServerPlatform.min.js";
import getUrlParams from "/js/modules/getUrlParams.min.js";
import stripHTML from '/js/modules/stripHTML.min.js';
import sortArrayOfObjects from "/js/modules/sortArrayOfObjects.min.js";
import saveData from "/js/modules/saveData.min.js";

// local modules

import fetchData from "./fetchData.min.js";
import showData from "./showData.min.js";

const greeting = document.getElementsByClassName("greeting");
const loadingScreen = document.getElementById("loading");
const profileImage = document.getElementsByClassName("profile-image");
const loadingStatusEl = document.getElementById("loading-status");

const getData = async () => {
  let userData = {};
  const { token, instance, username, userid, avatarUrl } = getUrlParams(true);

  if (token && instance) {
    let platform = await getServerPlatform(instance);
    let userInfo = {},
      profileImageURL;

    switch (platform) {
      case "mastodon":
      case "hometown":
      case "friendica":
      case "pleroma":
      case "akkoma":
        userInfo = await fetchData(
          instance,
          platform,
          "accounts/verify_credentials",
          token
        );
        profileImageURL = userInfo.avatar_static || userInfo.avatar;

        if (userInfo.display_name) {
          userData.name = userInfo.display_name || "there";
        }

        if (userInfo.acct) {
          userData.account = `@${userInfo.acct}@${instance}`;
          userData.accountURL = `https://${instance}/@${userInfo.acct}`;

          if (!userData.name) {
            userData.name = `@${userInfo.acct}`;
          }
        }

        if (!userData.name) {
          userData.name = "there";
        }

        if (profileImageURL) {
          userData.profileImageURL = profileImageURL;
        }

        break;
      case "misskey":
      case "calckey":
      case "firefish":
      case "foundkey":
      case "magnetar":
        userInfo.id = userid;
        userData.name = username;
        userData.account = `@${username}@${instance}`;
        userData.profileImageURL = avatarUrl;

        break;
      default:
        break;
    }

    loadingScreen.classList.remove("d-none");
    greeting[0].innerHTML = `Hello ${userData.name}!`;

    if (userData.profileImageURL) {
      profileImage[0].src = userData.profileImageURL;
    }

    let statusCount = userInfo.statuses_count;

    if (statusCount > 10) {
      statusCount = (Math.ceil(statusCount / 10) * 10).toLocaleString() + "+";
    }

    if (statusCount) {
      loadingStatusEl.innerHTML = `(<span id="progress-items">0</span>/${statusCount})`;
    }

    loading.scrollIntoView({
      behavior: "smooth",
    });

    let statuses = [];

    switch (platform) {
      case "mastodon":
      case "hometown":
      case "friendica":
      case "pleroma":
      case "akkoma":
        statuses = await fetchData(
          instance,
          platform,
          `accounts/${userInfo.id}/statuses?limit=100`,
          token
        );
        break;
      case "misskey":
      case "calckey":
      case "firefish":
      case "foundkey":
      case "magnetar":
        platform = "misskey";
        statuses = await fetchData(
          instance,
          platform,
          `users/notes`,
          token,
          userInfo.id
        );
        break;
      default:
        break;
    }

    let emoji = {};

    statuses.forEach((status) => {
      // console.log(status);
      if (
        platform === "misskey" ||
        userData.accountURL === status.account.url ||
        (status.account.fqn && userData.account === `@${status.account.fqn}`)
      ) {

        const statusText = status.content || status.text || "";

        if (statusText && statusText.length){
          /*
            Emoji
            Emoji_Presentation
            Extended_Pictographic
          */
          const statusContent = stripHTML(statusText);
          const emojiFound = statusContent.match(/\p{Emoji_Presentation}+/gu);

          if (emojiFound && emojiFound.length){
            // console.log(statusContent, emojiFound);
            const emojiArray = [...emojiFound.join('')];
            emojiArray.forEach(e => {
              emoji[e] = emoji[e] ? emoji[e] + 1 : 1;
            });
          }
        }

        // console.log(status);
      }
    });

    // console.log(emoji);
    userData.emoji = emoji;
    saveData("fediverseEmoji", userData, 60);
    showData(userData);
  }
};

export default getData;