// global modules

import getServerPlatform from "/js/modules/getServerPlatform.min.js";
import getUrlParams from "/js/modules/getUrlParams.min.js";
import countWords from "/js/modules/countWords.min.js";
import sortArrayOfObjects from "/js/modules/sortArrayOfObjects.min.js";
import saveData from "/js/modules/saveData.min.js";

// local modules

import fetchData from "./fetchData.min.js";
import showData from "./showData.min.js";

const greeting = document.getElementsByClassName("greeting");
const loadingScreen = document.getElementById("loading");
const profileImage = document.getElementsByClassName("profile-image");
const loadingStatusEl = document.getElementById("loading-status");
const skiptToResultsBtn = document.getElementById("skip-to-results");


skiptToResultsBtn.addEventListener("click", () => {
  window.skipToResults = true;
  skiptToResultsBtn.innerHTML = "Skipping...";
  skiptToResultsBtn.disabled = true;
});

const getData = async () => {
  let userData = {};
  const { token, instance, username, userid, avatarUrl } = getUrlParams(true);

  userData.instance = instance;

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
      case "gotosocial":
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
      case "sharkey":
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

    loadingStatusEl.innerHTML = `<span id="progress-items">0</span> posts found...`;

    const loading = document.getElementById("loading");

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
      case "gotosocial":
        statuses = await fetchData(
          instance,
          platform,
          `accounts/${userInfo.id}/statuses?limit=100&only_media=true&exclude_reblogs=true`,
          token
        );
        break;
      case "misskey":
      case "calckey":
      case "firefish":
      case "foundkey":
      case "magnetar":
      case "sharkey":
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

    let hashtags = [];
    let stats = {
      postsTotal: 0,
      postsWithVisualMedia: 0,
      visualMediaTotal: 0,
      visualMediaDescribed: 0,
      visualMediaDescribedShort: 0,
      statusesNeedFixing: [],
    };

    let mediaNeedsFixingCount = 0;

    statuses.forEach((status) => {
      if (
        status.visibility &&
        ["public", "unlisted"].includes(status.visibility)
      ) {
        // if (mediaNeedsFixingCount < 24) {
          stats.postsTotal++;

          if (
            platform === "misskey" ||
            userData.accountURL === status.account.url ||
            (status.account.fqn &&
              userData.account === `@${status.account.fqn}`)
          ) {
            if (status?.tags?.length) {
              if (!status.tags[0].name) {
                status.tags = status.tags.map((tag) => {
                  return {
                    name: tag,
                  };
                });
              }

              status.tags.forEach((tag) => {
                if (!hashtags.includes(tag.name)) {
                  hashtags.push(tag.name);
                }
              });
            }
          }

          const attachments = status.media_attachments || status.files || [];

          if (attachments && attachments.length) {
            let statusNeedsFixing = false;
            let statusHasVisualMedia = false;
            let mediaNeedsFixingResults = [];

            attachments.forEach((media) => {
              if (["image", "video", "image/png"].includes(media.type)) {
                statusHasVisualMedia = true;
                stats.visualMediaTotal++;

                if (media.description) {
                  stats.visualMediaDescribed++;

                  if (countWords(media.description) < 6) {
                    stats.visualMediaDescribedShort++;
                  }
                } else {
                  statusNeedsFixing = true;
                  mediaNeedsFixingCount++;

                  mediaNeedsFixingResults.push(media.url);
                }
              }
            });

            if (statusHasVisualMedia) {
              stats.postsWithVisualMedia++;
            }

            if (statusNeedsFixing) {
              let statusURL;

              if (status.url) {
                statusURL = status.url;
              } else if (status.id) {
                statusURL = `https://${userData.instance}/notes/${status.id}`;
              }

              stats.statusesNeedFixing.push({
                url: statusURL,
                mediaNeedsFixing: mediaNeedsFixingResults,
              });
            }
          }
        // }
      }
    });

    // userData.hashtags = hashtags;
    userData.stats = stats;
    // console.log({ userData });

    saveData("fediversePostAccessibility", userData, 60);
    showData(userData);
  }
};

export default getData;
