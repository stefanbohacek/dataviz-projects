import randomFromArray from '/js/modules/randomFromArray.min.js';
import fetchRequest from '/js/modules/fetchRequest.min.js';

const waitMessageEl = document.getElementById('wait-message');
const progressInfoEl = document.getElementById('progress-info');
let waitMessageInterval;

const fetchData = async (instance, platform, endpoint, token, userId) => {
  waitMessageInterval = setInterval(() => {
    waitMessageEl.innerHTML = randomFromArray([
      "Still working...",
      "Fetching your connections...",
    ]);
  }, 5000);

  let fetchURL,
    fetchOptions = {};

  switch (platform) {
    case "mastodon":
    case "hometown":
    case "pixelfed":
    case "friendica":
    case "pleroma":
    case "akkoma":
    case "gotosocial":
      fetchURL = `https://${instance}/api/v1/${endpoint}`;

      fetchOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      break;

    case "misskey":
    case "calckey":
    case "firefish":
    case "foundkey":
    case "magnetar":
    case "sharkey":
      fetchURL = `https://${instance}/api/${endpoint}`;

      fetchOptions = {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          limit: window.globalConfig.misskeyFetchLimit,
        }),
        method: "POST",
      };
      break;
    default:
      break;
  }

  try {
    const resp = await fetchRequest(
      fetchURL,
      platform,
      fetchOptions
    );
    clearInterval(waitMessageInterval);
    return resp;
  } catch (error) {
    console.log("fetchData error", error);
    return [];
  }
};

export default fetchData;
