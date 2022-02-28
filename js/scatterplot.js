/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const svg3 = d3.select("#csv-scatter")
  .append('svg')
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv('../ic-07-chy101010//data/scatter.csv').then(data => {
  let maxX3 = d3.max(data, function(d) {return d.day;})
  let maxY3 = d3.max(data, function(d) {return d.score;})
  console.log(maxX3, maxY3)
  
  let xScale3 = d3.scaleLinear()
    .domain([0, maxX3])
    .range([margin.left, width - margin.right])

  let yScale3 = d3.scaleLinear()
    .domain([0, maxY3])
    .range([height - margin.bottom, margin.top]);

  svg3.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale3))
    .attr("font-size", '20px');

  svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale3))
    .attr("font-size", '20px');

  const tooltip2 = d3.select("#csv-scatter")
    .append("div")
    .attr('id', "tooltip2")
    .style("opacity", 0)
    .attr("class", "tooltip");

  const mouseover = function (event, d) {
    tooltip2.html("Day: " + d.day + "<br> Score: " + d.score + "<br>")
      .style("opacity", 1);
  }
  
  const mousemove = function (event, d) {
    tooltip2.style("left", (event.pageX) + "px")
      .style("top", (event.pageY + yTooltipOffset) + "px");
  }
     
  const mouseleave = function (event, d) {
    tooltip2.style("opacity", 0);
  }
  
  svg3.selectAll(".bar")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "bar")
    .attr("cx", (d, i) => xScale3(d.day))
    .attr("cy", (d) => yScale3(d.score))
    .attr("r", 10)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
})