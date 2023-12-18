/* globals mapboxgl */

import ready from "/js/modules/ready.min.js";

ready(async () => {
  const resp = await fetch(
    "https://wikipedia.stefanbohacek.dev/wikidata/?query=SELECT%20DISTINCT%20%3Forg%20%3ForgLabel%20%3ForgTypeLabel%20%3FhostAt%20%3FMastName%20%20WHERE%20%7B%20%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%20%20%3Forg%20wdt%3AP4033%20%3FMastName.%0A%20%20%3Forg%20wdt%3AP31%20%3ForgType.%0A%20%20FILTER%20(%3ForgType%20!%3D%20wd%3AQ5).%0A%20%20BIND%20(strafter(%3FMastName%2C%22%40%22)%20AS%20%3FhostAt).%0A%7D%20ORDER%20BY%20%3FhostAt%20LIMIT%2020000%0A&token=lYVGZjrHEUk3DxWm8WgVpExNdj5NHY8x7XiHyt9ltMhKNwbJ1XNwPC22SvoqVR"
  );

  const fediverseAccounts = await resp.json();

  const columns = [
    { title: "Name", field: "name", headerFilter: "input" },
    {
      title: "Type",
      field: "type",
      editor: "input",
      headerFilter: "list",
      headerFilterParams: { valuesLookup: true, clearable: true },
    },
    { title: "Account", field: "account", headerFilter: "input" },
    { title: "Server", field: "server", headerFilter: "input" },
  ];

  let data = [];

  fediverseAccounts.forEach((datapoint, index) => {
    if (
      !data
        .map((account) => account.account)
        .includes(datapoint?.MastName?.value)
    ) {
      data.push({
        id: index,
        name: datapoint?.orgLabel?.value,
        url: datapoint?.org?.value,
        type: datapoint?.orgTypeLabel?.value,
        account: `@${datapoint?.MastName?.value}`.replace("@@", "@"),
        server: datapoint?.hostAt?.value,
      });
    }
  });

  document.getElementById("count-placeholder").remove();
  document.getElementById("count").innerHTML = data.length.toLocaleString();
  document.getElementById("placeholder-table").remove();

  const table = new Tabulator("#data", {
    // height: "500px",
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 25,
    responsiveLayout:true,
    columns,
    data,
  });

  document
    .getElementById("download-csv")
    .addEventListener("click", () => {
      table.download("csv", "fediverse-accounts.csv");
    });

  document
    .getElementById("download-json")
    .addEventListener("click", () => {
      table.download("json", "fediverse-accounts.json");
    });

  document
    .getElementById("download-xlsx")
    .addEventListener("click", () => {
      table.download("xlsx", "fediverse-accounts.xlsx", { sheetName: "My Data" });
    });

  document
    .getElementById("download-pdf")
    .addEventListener("click", () => {
      table.download("pdf", "fediverse-accounts.pdf", {
        orientation: "portrait", 
        title: "Fediverse accounts", 
      });
    });

  document
    .getElementById("download-html")
    .addEventListener("click", () => {
      table.download("html", "fediverse-accounts.html", { style: true });
    });
});
