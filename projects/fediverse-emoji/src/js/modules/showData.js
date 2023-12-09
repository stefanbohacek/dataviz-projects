import drawChart from "./drawChart.min.js";
import sortArrayOfObjects from "/js/modules/sortArrayOfObjects.min.js";
import { isMobile } from "/js/modules/browserHelpers.min.js";
import { jsonToCSV, downloadCSV } from "/js/modules/csvHelper.min.js";

const dataDownloadPrompt = document.getElementById("download-data");
const loadingScreen = document.getElementById("loading");

const profileImage = document.getElementsByClassName("profile-image");
const accountNameEl = document.getElementById("account-name");
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

  let emojis = [];

  for (let emoji in userData.emoji) {
    emojis.push({
      emoji: emoji,
      count: userData.emoji[emoji],
    });
  }

  emojis = sortArrayOfObjects(emojis, "count", true);
  // userData.emoji = emojis;
  userData.emoji = emojis.slice(0, isMobile() ? 50 : 250);
  drawChart(userData);

  // dataDownloadPrompt.innerHTML = /*html*/`
  //     <button
  //       class="small d-inline d-md-block mt-md-3"
  //       id="download-data-btn"
  //     >
  //       Download the full data
  //     </button>
  // `;

  // const csv = jsonToCSV(emojis);

  // document
  //   .getElementById("download-data-btn")
  //   .addEventListener("click", (ev) => {
  //     ev.preventDefault();
  //     downloadCSV(csv, "fediverse-emoji.csv");
  //   });

  const resultsTableWrapper = document.getElementById("results-table");
  resultsTableWrapper.innerHTML = `
    <table class="table table-hover mt-5">
      <thead>
        <tr>
          <th scope="col">Emoji</th>
          <th scope="col">Count</th>
        </tr>
      </thead>
      <tbody>
      ${emojis
        .map(
          (emoji) => `
          <tr>
            <td>${emoji.emoji}</td>
            <td>${emoji.count.toLocaleString()}</td>
          </tr>        
        `
        )
        .join("")}
    </table>
    `;
};

export default showData;
