import drawChart from "./drawChart.min.js";
import sortArrayOfObjects from "/js/modules/sortArrayOfObjects.min.js";

import {jsonToCSV, downloadCSV} from "/js/modules/csvHelper.min.js";

const dataDownloadPrompt = document.getElementById("download-data");
const loadingScreen = document.getElementById("loading");

const profileImage = document.getElementsByClassName("profile-image");
const accountNameEl = document.getElementById("account-name");
const userVisualization = document.getElementById("viz-user");

const connectionsBreakdownEl = document.getElementById("connections-breakdown");
const topDomainsCountEl = document.getElementById("top-servers-count");
const topServersListEl = document.getElementById("top-servers-list");
const domainsUniqueConnectionsEl = document.getElementById("domains-unique-connections");

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

  for (let hashtag in userData.hashtags){
    hashtags.push({
      hashtag: hashtag,
      count: userData.hashtags[hashtag]
    })
  }

  hashtags = sortArrayOfObjects(hashtags, "count", true);
  userData.hashtags = hashtags;
  drawChart(userData);

  dataDownloadPrompt.innerHTML = `
      <button class="small d-inline d-md-block mt-md-3" id="download-data-btn">Download the data</button>
  `;

  const csv = jsonToCSV(hashtags);

  document
    .getElementById("download-data-btn")
    .addEventListener("click", (ev) => {
      ev.preventDefault();
      downloadCSV(csv, "fediverse-hashtags.csv");
    });

    const resultsTableWrapper = document.getElementById("results-table");
    resultsTableWrapper.innerHTML = `
    <table class="table table-hover mt-5">
      <thead>
        <tr>
          <th scope="col">Hashtag</th>
          <th scope="col">Count</th>
        </tr>
      </thead>
      <tbody>
      ${
        hashtags.map(hashtag => `
          <tr>
            <td>${hashtag.hashtag}</td>
            <td>${hashtag.count.toLocaleString()}</td>
          </tr>        
        `).join("")
      }
    </table>
    `;
};

export default showData;