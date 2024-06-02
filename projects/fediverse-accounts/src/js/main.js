/* globals Tabulator */

import ready from "/js/modules/ready.min.js";
import sortArrayOfObjects from "/js/modules/sortArrayOfObjects.min.js";

ready(async () => {

  const query = `
  SELECT DISTINCT ?org ?orgLabel ?orgTypeLabel ?hostAt ?MastName WHERE {
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
    }
    ?org wdt:P4033
    ?MastName.
    ?org wdt:P31
    ?orgType.
    BIND (strafter(?MastName,"@") AS ?hostAt). } ORDER BY ?hostAt LIMIT 20000
  `;
  
  // const resp = await fetch(
  //   `https://tools.stefanbohacek.dev/wikidata/?query=${encodeURIComponent(query)}&token=Lyvgzjrheuk3dxwm8wgvpexndj5nhy8x7xihyt9ltmhknwbj1xnwpc22svoqvr`
  // );


  const resp = await fetch(
    "https://tools.stefanbohacek.dev/wikidata/?query=SELECT%20DISTINCT%20%3Forg%20%3ForgLabel%20%3ForgTypeLabel%20%3FhostAt%20%3FMastName%20WHERE%20%7B%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%20%3Forg%20wdt%3AP4033%20%3FMastName.%20%3Forg%20wdt%3AP31%20%3ForgType.%20BIND%20(strafter(%3FMastName%2C%22%40%22)%20AS%20%3FhostAt).%20%7D%20ORDER%20BY%20%3FhostAt%20LIMIT%2020000&token=lYVGZjrHEUk3DxWm8WgVpExNdj5NHY8x7XiHyt9ltMhKNwbJ1XNwPC22SvoqVR"
  );

  const fediverseAccounts = await resp.json();

  const columns = [
    {
      title: "Name",
      field: "name",
      sorter: "string",
      headerFilter: "input",
      formatter: "link",
      formatterParams: {
        labelField: "name",
        urlField: "url",
        target: "_blank",
      },
    },
    {
      title: "Type",
      field: "type",
      editor: "input",
      sorter: "string",
      headerFilter: "input"
    },
    {
      title: "Account",
      field: "account",
      sorter: "string",
      headerFilter: "input",
      // TODO: The account link format depends on the platform used, eg. Mastodon usernames start with @, on Pleroma they do not.
      // formatter: "link",
      // formatterParams: {
      //   labelField: "account",
      //   urlField: "account_url",
      //   target: "_blank",
      // },
    },
    {
      title: "Server",
      field: "server",
      sorter: "string",
      headerFilter: "input",
      // headerFilter: "list",
      // headerFilterParams: {
      //   valuesLookup: true,
      //   sortValuesList: "asc",
      //   clearable: true,
      // },      
      formatter: "link",
      formatterParams: {
        labelField: "server",
        urlField: "server_url",
        target: "_blank",
      },
    },
  ];

  let data = [];

  fediverseAccounts.forEach((datapoint, index) => {
    const account = `@${datapoint?.MastName?.value}`.replace("@@", "@");
    if (
      !data
        .map((acc) => acc.account)
        .includes(account)
    ) {
      const server = datapoint?.hostAt?.value;
      const username = datapoint?.MastName?.value.replace(`@${server}`, "");

      data.push({
        id: index,
        name: datapoint?.orgLabel?.value,
        url: datapoint?.org?.value,
        type: datapoint?.orgTypeLabel?.value,
        account,
        account_url: `https://${server}/@${username}`,
        server_url: `https://${server}`,
        server,
      });
    }
  });

  data = sortArrayOfObjects(data, "type", false);

  document.getElementById("count-placeholder").remove();
  document.getElementById("count").innerHTML = data.length.toLocaleString();
  document.getElementById("placeholder-table").remove();

  const table = new Tabulator("#data", {
    // height: "500px",
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 25,
    responsiveLayout: true,
    columns,
    data,
  });

  document.getElementById("download-csv").addEventListener("click", () => {
    table.download("csv", "fediverse-accounts.csv");
  });

  document.getElementById("download-json").addEventListener("click", () => {
    table.download("json", "fediverse-accounts.json");
  });

  document.getElementById("download-xlsx").addEventListener("click", () => {
    table.download("xlsx", "fediverse-accounts.xlsx", { sheetName: "My Data" });
  });

  document.getElementById("download-pdf").addEventListener("click", () => {
    table.download("pdf", "fediverse-accounts.pdf", {
      orientation: "portrait",
      title: "Fediverse accounts",
    });
  });

  document.getElementById("download-html").addEventListener("click", () => {
    table.download("html", "fediverse-accounts.html", { style: true });
  });
});
