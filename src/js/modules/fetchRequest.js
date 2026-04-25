import sleep from "/js/modules/sleep.min.js";

const getRetryDelay = (retryAfterHeader) => {
  if (!retryAfterHeader) {
    return 5000;
  }

  const seconds = parseInt(retryAfterHeader, 10);
  if (seconds > 0) {
    return seconds * 1000;
  }

  const date = Date.parse(retryAfterHeader);
  if (!isNaN(date)) {
    return date - Date.now();
  }

  return 5000;
};

const resetSkipToResultsButton = (btn) => {
  if (btn) {
    setTimeout(() => {
      btn.innerHTML = "Skip to results";
      btn.disabled = false;
    }, 1000);
  }
};

const fetchRequest = async (url, platform, options, delay = 100, retries = 3) => {
  // console.log('debug:fetchRequest', url, platform, options);
  // options.mode = "no-cors"

  try {
    const skiptToResultsBtn = document.getElementById("skip-to-results");
    const response = await fetch(url, options);

    if (response.status === 429) {
      if (retries === 0) {
        console.log("fetchRequest: max retries reached", { url });
        return [];
      }
      const retryAfterHeader = response.headers.get("Retry-After");
      const waitMs = getRetryDelay(retryAfterHeader);
      await sleep(waitMs);
      return fetchRequest(url, platform, options, delay, retries - 1);
    }

    if (!response.ok) {
      console.log("fetchRequest: request failed", { url, status: response.status });
      return [];
    }

    // console.log({
    //   url,
    //   response: {
    //     status: response.status,
    //     body: response.body,
    //   }
    // });
    let data = await response.json();
    let nextPage;

    switch (platform) {
      case "mastodon":
      case "hometown":
      case "friendica":
      case "pleroma":
      case "akkoma":
      case "gotosocial":
        if (/<([^>]+)>; rel="next"/g.test(response.headers.get("link"))) {
          nextPage = /<([^>]+)>; rel="next"/g.exec(
            response.headers.get("link")
          )[1];
        }

        if (nextPage) {
          const progressElWrapper = document.getElementById("progress-items-wrapper");
          const progressEl = document.getElementById("progress-items");

          if (progressElWrapper) {
            progressElWrapper.classList.remove("d-none");
          }

          if (progressEl) {
            progressEl.innerHTML = (
              parseInt(progressEl.innerHTML.replace(/\D/g, "")) + data.length
            ).toLocaleString();
          }

          if (!window.skipToResults) {
            await sleep(delay);
            data = data.concat(await fetchRequest(nextPage, platform, options, delay, retries));
          } else {
            window.skipToResults = false;
            resetSkipToResultsButton(skiptToResultsBtn);
          }
        }

        break;
      case "misskey":
      case "calckey":
      case "firefish":
      case "foundkey":
      case "magnetar":
        if (data.length === window.globalConfig.misskeyFetchLimit) {
          if (data && data.length) {
            const lastItem = data.slice(-1)[0];
            let body = JSON.parse(options.body);
            body.untilId = lastItem.id;
            options.body = JSON.stringify(body);
          }

          if (!window.skipToResults) {
            await sleep(delay);
            data = data.concat(await fetchRequest(url, platform, options, delay, retries));
          } else {
            window.skipToResults = false;
            resetSkipToResultsButton(skiptToResultsBtn);
          }
        }
        break;
      default:
        break;
    }

    return data;
  } catch (error) {
    console.log("fetchRequest error", { error });
    return [];
  }
};

export default fetchRequest;
