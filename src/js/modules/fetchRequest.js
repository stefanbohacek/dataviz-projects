import sleep from "/js/modules/sleep.min.js";

const fetchRequest = async (url, platform, options) => {
  // console.log('debug:fetchRequest', url, platform, options);
  // options.mode = "no-cors"

  try {
    const response = await fetch(url, options);
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

          if (progressElWrapper){
            progressElWrapper.classList.remove("d-none");
          }

          if (progressEl) {
            progressEl.innerHTML = (
              parseInt(progressEl.innerHTML.replace(/\D/g, "")) + data.length
            ).toLocaleString();
          }

          if (!window.skipToResults){
            await sleep(500);
            data = data.concat(await fetchRequest(nextPage, platform, options));
          } else {
            window.skipToResults = false;
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

          if (!window.skipToResults){
            await sleep(500);
            data = data.concat(await fetchRequest(url, platform, options));
          } else {
            window.skipToResults = false;            
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
