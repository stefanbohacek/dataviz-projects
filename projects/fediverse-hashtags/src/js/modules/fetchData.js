import randomFromArray from '/js/modules/randomFromArray.min.js';
import fetchRequest from '/js/modules/fetchRequest.min.js';

const fetchData = async (instance, platform, endpoint, token, userId) => {
  let fetchURL,
    fetchOptions = {};

  switch (platform) {
    case "mastodon":
    case "hometown":
    case "friendica":
    case "pleroma":
    case "akkoma":
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
    return resp;
  } catch (error) {
    console.log("fetchData error", error);
    return [];
  }
};

export default fetchData;
