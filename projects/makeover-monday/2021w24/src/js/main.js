/* globals d3 */
import ready from '/js/modules/ready.min.js';

ready(async () => {
    const resp = await fetch('/data/student-loans/student-loans-us-2020-2021.json');
    const data = await resp.json();

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
        .attr("viewBox", `0 0 ${ 12 * options.rectWidth } ${ 8 * options.rectHeight }`);

    const sEnter = svg
        .append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("preserveAspectRatio", "xMinYMin")
        .attr("transform", function(d) {
            return (
                "translate(" +
                d.x * options.rectWidth +
                "," +
                d.y * options.rectHeight +
                ")"
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
            return color(d.loan_payoff_months);
        });

    sEnter
        .append("text")
        .attr("x", options.rectWidth / 2)
        .attr("y", options.rectHeight / 2 + 2)
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.state_abbrev;
        });

    const $table = $('table');
    $table.find('#data-table-body').html(data.map(d => `
    <tr>
        <td>${d.state_name}</td>
        <td align="right">${d.loan_per_recipient}</td>
        <td align="right">${d.annual_salary}</td>
        <td align="right">${d.loan_payoff_months}</td>
    </tr>
    `));

    $table.DataTable({
      "columns": [
      { "data": "state" },
      { "data": "loanPerRecipient",
      render: $.fn.dataTable.render.number(',', '.', 2, '$') 
  },
  { "data": "annualSalary ",
  render: $.fn.dataTable.render.number(',', '.', 2, '$') 
},
{ "data": "monthsToPayOff" },
]

});


});
