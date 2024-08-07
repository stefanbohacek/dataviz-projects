// global modules

import getServerPlatform from "/js/modules/getServerPlatform.min.js";
import getUrlParams from "/js/modules/getUrlParams.min.js";
import sortArrayOfObjects from "/js/modules/sortArrayOfObjects.min.js";
import saveData from "/js/modules/saveData.min.js";

// local modules

import fetchData from "./fetchData.min.js";
import showData from "./showData.min.js";

const greeting = document.getElementsByClassName("greeting");
const loadingScreen = document.getElementById("loading");
const profileImage = document.getElementsByClassName("profile-image");

const getData = async () => {
  let userData = {};
  const { token, instance, username, userid, avatarUrl } = getUrlParams(true);

  if (token && instance) {
    const platform = await getServerPlatform(instance);
    let userInfo = {},
      profileImageURL;

    switch (platform) {
      case "mastodon":
      case "hometown":
      case "pixelfed":
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
        console.log("userInfo", userInfo);
        profileImageURL = userInfo.avatar_static || userInfo.avatar;

        if (userInfo.display_name) {
          userData.name = userInfo.display_name || "there";
        }

        if (userInfo.acct) {
          userData.account = `@${userInfo.acct}@${instance}`;

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

    const loading = document.getElementById("loading");

    loading.scrollIntoView({
      behavior: "smooth",
    });

    let followers, following, accountIDs, connections;
    let followersInstances = {},
      followingInstances = {},
      connectionInstances = {};

    switch (platform) {
      case "mastodon":
      case "hometown":
      case "pixelfed":
      case "friendica":
      case "pleroma":
      case "akkoma":
      case "gotosocial":
        followers = await fetchData(
          instance,
          platform,
          `accounts/${userInfo.id}/followers?limit=100`,
          token
        );
        following = await fetchData(
          instance,
          platform,
          `accounts/${userInfo.id}/following?limit=100 `,
          token
        );

        break;
      case "misskey":
      case "calckey":
      case "firefish":
      case "foundkey":
      case "magnetar":
      case "sharkey":
        followers = await fetchData(
          instance,
          platform,
          `users/followers`,
          token,
          userInfo.id
        );
        following = await fetchData(
          instance,
          platform,
          `users/following `,
          token,
          userInfo.id
        );
        followers = followers.map((f) => f.follower);
        following = following.map((f) => f.followee);
        break;
      default:
        break;
    }

    if (followers && followers.length) {
      if (!followers[0].acct) {
        followers.forEach((follower) => {
          follower.acct = `${follower.username}@${follower.host || instance}`;
        });
      }
    }

    if (following && following.length) {
      if (!following[0].acct) {
        following.forEach((account) => {
          account.acct = `${account.username}@${account.host || instance}`;
        });
      }
    }

    accountIDs = new Set(followers.map((follower) => follower.acct));
    connections = [
      ...followers,
      ...following.filter((account) => !accountIDs.has(account.acct)),
    ];

    followers.forEach((account) => {
      // console.log(account, account.acct.split('@'));
      let domain;

      if (account.acct.includes("@")) {
        domain = account.acct.split("@")[1];
      } else {
        domain = instance;
      }

      if (followersInstances[domain]) {
        followersInstances[domain]++;
      } else {
        followersInstances[domain] = 1;
      }
    });

    following.forEach((account) => {
      let domain;

      if (account.acct.includes("@")) {
        domain = account.acct.split("@")[1];
      } else {
        domain = instance;
      }

      if (followingInstances[domain]) {
        followingInstances[domain]++;
      } else {
        followingInstances[domain] = 1;
      }
    });

    connections.forEach((account) => {
      let domain;

      if (account.acct.includes("@")) {
        domain = account.acct.split("@")[1];
      } else {
        domain = instance;
      }

      if (connectionInstances[domain]) {
        connectionInstances[domain]++;
      } else {
        connectionInstances[domain] = 1;
      }
    });

    let connectionInstancesObjectArray = [];
    let uniqueDomainsCount = 0;
    let totalDomainsCount = 0;

    for (let domain in connectionInstances) {
      totalDomainsCount++;

      connectionInstancesObjectArray.push({
        domain,
        connections: connectionInstances[domain],
        percentage: ((connectionInstances[domain] / connections.length) * 100)
          .toFixed(1)
          .toLocaleString(),
      });

      if (connectionInstances[domain] === 1) {
        uniqueDomainsCount++;
      }
    }

    connectionInstancesObjectArray = sortArrayOfObjects(
      connectionInstancesObjectArray,
      "connections",
      true
    );
    const topDomains = connectionInstancesObjectArray.slice(0, 10);

    userData.connectionsCount = connections.length.toLocaleString();
    userData.followersCount = followers.length.toLocaleString();
    userData.followingCount = following.length.toLocaleString();
    userData.followersInstancesCount =
      Object.keys(followersInstances).length.toLocaleString();
    userData.followingInstancesCount =
      Object.keys(followingInstances).length.toLocaleString();
    userData.totalDomainsCount = totalDomainsCount.toLocaleString();
    userData.topDomainsCount = topDomains.length.toLocaleString();
    userData.topDomains = topDomains;
    userData.allDomains = connectionInstancesObjectArray;
    userData.uniqueDomainsCount = uniqueDomainsCount.toLocaleString();

    saveData("fediverseUserData", userData, 60);
    showData(userData);
  }
};

export default getData;
