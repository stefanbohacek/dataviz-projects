import drawChart from "./drawChart.min.js";
import sortArrayOfObjects from "/js/modules/sortArrayOfObjects.min.js";
import { isMobile } from "/js/modules/browserHelpers.min.js";
import { jsonToCSV, downloadCSV } from "/js/modules/csvHelper.min.js";

const dataDownloadPrompt = document.getElementById("download-data");
const loadingScreen = document.getElementById("loading");

const profileImage = document.getElementsByClassName("profile-image");
const accountNameEl = document.getElementById("account-name");
const thankYouEl = document.getElementById("thank-you");
const userVisualization = document.getElementById("viz-user");

const showData = async (userData) => {
  loadingScreen.classList.add("d-none");
  userVisualization.classList.remove("d-none");
  userVisualization.scrollIntoView({
    behavior: "smooth",
  });

  // setTimeout(() => {
  //   loadingScreen.classList.add("d-none");
  // }, 2000);

  accountNameEl.innerHTML = userData.name;

  if (userData.profileImageURL) {
    profileImage[1].src = userData.profileImageURL;
  }

  // connectionsBreakdownEl.innerHTML = `
  //     <li>
  //         You follow <strong>${userData.followingCount}</strong> accounts across <strong>${userData.followingInstancesCount}</strong> servers
  //     </li>
  //     <li>
  //         You have <strong>${userData.followersCount}</strong> followers across <strong>${userData.followersInstancesCount}</strong> servers
  //     </li>

  //     <li>
  //         You have <strong>${userData.connectionsCount} connections</strong> across <strong>${userData.totalDomainsCount} servers</strong> in total
  //     </li>
  // `;
  // topDomainsCountEl.innerHTML = userData.topDomainsCount;
  // topServersListEl.innerHTML = userData.topDomains
  //   .map(
  //     (domain) =>
  //       `<li><code>${domain.domain}</code>: <strong>${domain.connections}</strong> connections (${domain.percentage}%)</li>`
  //   )
  //   .join("");
  // domainsUniqueConnectionsEl.innerHTML = `Out of the ${userData.totalDomainsCount} servers you are connected to, <strong>${userData.uniqueDomainsCount}</strong> of them have <strong>only one connection</strong> on it.`;

  let hashtags = [];

  for (let hashtag in userData.hashtags) {
    hashtags.push({
      hashtag: hashtag,
      count: userData.hashtags[hashtag],
    });
  }

  hashtags = sortArrayOfObjects(hashtags, "count", true);
  // userData.hashtags = hashtags;
  userData.hashtags = hashtags.slice(0, isMobile() ? 50 : 250);
  // drawChart(userData);

  // dataDownloadPrompt.innerHTML = `
  //     <button class="small d-inline d-md-block mt-md-3" id="download-data-btn">Download the full data</button>
  // `;

  // const csv = jsonToCSV(hashtags);

  // document
  //   .getElementById("download-data-btn")
  //   .addEventListener("click", (ev) => {
  //     ev.preventDefault();
  //     downloadCSV(csv, "fediverse-hashtags.csv");
  //   });

  let visualMediaDescribedNote = "";

  if (userData.stats.visualMediaDescribed === userData.stats.visualMediaTotal) {
    visualMediaDescribedNote = "Fantastic!";
  } else {
    const percentageOfDescribedVisualMedia = Math.round(
      (userData.stats.visualMediaDescribed / userData.stats.visualMediaTotal) *
        100
    );

    visualMediaDescribedNote += `That's about ${percentageOfDescribedVisualMedia}%.`;

    if (percentageOfDescribedVisualMedia > 90) {
      visualMediaDescribedNote += " You're doing a great job!";
    } else if (percentageOfDescribedVisualMedia > 75) {
      thankYouEl.classList.remove("d-none");
      visualMediaDescribedNote += " Great effort, but you can do better!";
    } else {
      visualMediaDescribedNote += " You can surely do better!";
    }
  }

  let mediaNeedsFixingHTML = "";

  if (userData.stats.statusesNeedFixing && userData.stats.statusesNeedFixing.length) {
    mediaNeedsFixingHTML = /* html */ `
      <p>Here are some of the images that are missing description.</p>
      <div class="row mt-5 mb-5">`;

    userData.stats.statusesNeedFixing.forEach((status) => {
      status.mediaNeedsFixing.forEach((media) => {
        mediaNeedsFixingHTML += /* html */ `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <a href="${status.url}" target="_blank">
              <img class="w-10" src="${media}" alt="An image with no description.">
            </a>
          </div>
          `;
      });
    });
    mediaNeedsFixingHTML += /* html */ `</div>`;
  }

  const resultsEl = document.getElementById("results");
  resultsEl.innerHTML = /*html*/ `
    <p>
      Out of <strong>${userData.stats.visualMediaTotal.toLocaleString()} visual media attached in your ${userData.stats.postsWithVisualMedia.toLocaleString()} public posts with visual media</strong>, <strong>${
    userData.stats.visualMediaDescribed
  } have alt text</strong>. ${visualMediaDescribedNote}
    </p>
    ${mediaNeedsFixingHTML}
    `;

  // const resultsTableWrapper = document.getElementById("results-table");
  // resultsTableWrapper.innerHTML = `
  // <table class="table table-hover mt-5">
  //   <thead>
  //     <tr>
  //       <th scope="col">Hashtag</th>
  //       <th scope="col">Count</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //   ${
  //     hashtags.map(hashtag => `
  //       <tr>
  //         <td>${hashtag.hashtag}</td>
  //         <td>${hashtag.count.toLocaleString()}</td>
  //       </tr>
  //     `).join("")
  //   }
  // </table>
  // `;
};

export default showData;
