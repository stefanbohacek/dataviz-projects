/* globals d3 */

$(document).ready( function () {

    const gridmapLayoutUsa = [{
        x: 0,
        y: 0,
        key: "AK",
        name: "Alaska",
        value: 16
    }, {
        x: 11,
        y: 0,
        key: "ME",
        name: "Maine",
        value: 24
    }, {
        x: 9,
        y: 1,
        key: "VT",
        name: "Vermont",
        value: 27
    }, {
        x: 10,
        y: 1,
        key: "NH",
        name: "New Hampshire",
        value: 17
    }, {
        x: 11,
        y: 1,
        key: "MA",
        name: "Massachusetts",
        value: 26
    }, {
        x: 1,
        y: 2,
        key: "WA",
        name: "Washington",
        value: 25
    }, {
        x: 2,
        y: 2,
        key: "MT",
        name: "Montana",
        value: 23
    }, {
        x: 3,
        y: 2,
        key: "ND",
        name: "North Dakota",
        value: 17
    }, {
        x: 4,
        y: 2,
        key: "SD",
        name: "South Dakota",
        value: 15
    }, {
        x: 5,
        y: 2,
        key: "MN",
        name: "Minnesota",
        value: 28
    }, {
        x: 6,
        y: 2,
        key: "WI",
        name: "Wisconsin",
        value: 22
    }, {
        x: 7,
        y: 2,
        key: "MI",
        name: "Michigan",
        value: 24
    }, {
        x: 9,
        y: 2,
        key: "NY",
        name: "New York",
        value: 29
    }, {
        x: 10,
        y: 2,
        key: "CT",
        name: "Connecticut",
        value: 26
    }, {
        x: 11,
        y: 2,
        key: "RI",
        name: "Rhode Island",
        value: 17
    }, {
        x: 1,
        y: 3,
        key: "OR",
        name: "Oregon",
        value: 26
    }, {
        x: 2,
        y: 3,
        key: "ID",
        name: "Idaho",
        value: 20
    }, {
        x: 3,
        y: 3,
        key: "WY",
        name: "Wyoming",
        value: 18
    }, {
        x: 4,
        y: 3,
        key: "NE",
        name: "Nebraska",
        value: 25
    }, {
        x: 5,
        y: 3,
        key: "IA",
        name: "Iowa",
        value: 22
    }, {
        x: 6,
        y: 3,
        key: "IL",
        name: "Illinois",
        value: 31
    }, {
        x: 7,
        y: 3,
        key: "IN",
        name: "Indiana",
        value: 24
    }, {
        x: 8,
        y: 3,
        key: "OH",
        name: "Ohio",
        value: 24
    }, {
        x: 9,
        y: 3,
        key: "PA",
        name: "Pennsylvania",
        value: 26
    }, {
        x: 10,
        y: 3,
        key: "NJ",
        name: "New Jersey",
        value: 26
    }, {
        x: 0,
        y: 4,
        key: "CA",
        name: "California",
        value: 33
    }, {
        x: 1,
        y: 4,
        key: "NV",
        name: "Nevada",
        value: 27
    }, {
        x: 2,
        y: 4,
        key: "UT",
        name: "Utah",
        value: 21
    }, {
        x: 3,
        y: 4,
        key: "CO",
        name: "Colorado",
        value: 27
    }, {
        x: 4,
        y: 4,
        key: "KS",
        name: "Kansas",
        value: 25
    }, {
        x: 5,
        y: 4,
        key: "MO",
        name: "Missouri",
        value: 30
    }, {
        x: 6,
        y: 4,
        key: "KY",
        name: "Kentucky",
        value: 23
    }, {
        x: 7,
        y: 4,
        key: "WV",
        name: "West Virginia",
        value: 24
    }, {
        x: 8,
        y: 4,
        key: "MD",
        name: "Maryland",
        value: 27
    }, {
        x: 9,
        y: 4,
        key: "DE",
        name: "Delaware",
        value: 19
    }, {
        x: 2,
        y: 5,
        key: "AZ",
        name: "Arizona",
        value: 25
    }, {
        x: 3,
        y: 5,
        key: "NM",
        name: "New Mexico",
        value: 26
    }, {
        x: 4,
        y: 5,
        key: "OK",
        name: "Oklahoma",
        value: 24
    }, {
        x: 5,
        y: 5,
        key: "AR",
        name: "Arkansas",
        value: 22
    }, {
        x: 6,
        y: 5,
        key: "TN",
        name: "Tennessee",
        value: 30
    }, {
        x: 7,
        y: 5,
        key: "VA",
        name: "Virginia",
        value: 27
    }, {
        x: 8,
        y: 5,
        key: "NC",
        name: "North Carolina",
        value: 27
    }, {
        x: 3,
        y: 6,
        key: "TX",
        name: "Texas",
        value: 24
    }, {
        x: 4,
        y: 6,
        key: "LA",
        name: "Louisiana",
        value: 28
    }, {
        x: 5,
        y: 6,
        key: "MS",
        name: "Mississippi",
        value: 29
    }, {
        x: 6,
        y: 6,
        key: "AL",
        name: "Alabama",
        value: 31
    }, {
        x: 7,
        y: 6,
        key: "GA",
        name: "Georgia",
        value: 26
    }, {
        x: 8,
        y: 6,
        key: "SC",
        name: "South Carolina",
        value: 22
    }, {
        x: 0,
        y: 7,
        key: "HI",
        name: "Hawaii",
        value: 23
    }, {
        x: 7,
        y: 7,
        key: "FL",
        name: "Florida",
        value: 28
    }];

    const options = {
        rectWidth: 45,
        rectHeight: 45
    };

    const colors = [
        "#b2ddf0",
        "#92bcd8",
        "#769cbf",
        "#5d7da7",
        "#46608f",
        "#334577",
        "#232d5f"
    ];

    const color = d3.scale
        .quantize()
        .domain([10, 30])
        .range(colors);

    const svg = d3
        .select("svg")
        // .attr("width", 12 * options.rectWidth)
        // .attr("height", 8 * options.rectHeight)
        .attr("viewBox", `0 0 ${ 12 * options.rectWidth } ${ 8 * options.rectHeight }`);

    const sEnter = svg
        .append("g")
        .selectAll("g")
        .data(gridmapLayoutUsa)
        .enter()
        .append("g")
        .attr("preserveAspectRatio", "xMinYMin")
        .attr("transform", function(d) {
            return (
                "translate( " +
                d.x * options.rectWidth +
                "," +
                d.y * options.rectHeight +
                " )"
            );
        });

    sEnter
        .append("rect")
        .attr("width", options.rectWidth)
        .attr("height", options.rectHeight)
        .attr("vector-effect", "non-scaling-stroke")
        .style("opacity", 0.5)
        .style("stroke", "#aaa")
        .style("fill", function(d) {
            return color(d.value);
        });

    sEnter
        .append("text")
        .attr("x", options.rectWidth / 2)
        .attr("y", options.rectHeight / 2 + 2)
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.key;
        });

    $('table').DataTable( {
      "columns": [
      { "data": "state" },
      { "data": "loanPerRecipient",
      render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
  },
  { "data": "annualSalary ",
  render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) 
},
{ "data": "monthsToPayOff" },
]

} );
} );      