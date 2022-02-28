/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Steps to create a plot
// 1) create a SVG container, see it as a canvas
  // 2) set up the x-y scaling function
  // 3) set up x-y axis
  // 4) set up tooltip
  // 5) show the data


// Set dimensions and margins for plots 
const width = 900;
const height = 450;
const margin = { left: 50, right: 50, bottom: 50, top: 50 };
const yTooltipOffset = 15;


// TODO: What does this code do? 
const svg1 = d3
  .select("#hard-coded-bar") // Select HTML element with id '#hard-coded-bar'
  .append("svg") // Append svg object
  .attr("width", width - margin.left - margin.right) // Sets the width of the svg
  .attr("height", height - margin.top - margin.bottom)  // Sets the height of the svg
  .attr("viewBox", [0, 0, width, height]);  // Sets the viewbox of the svg

// Hardcoded barchart data
const data1 = [
  { name: 'A', score: 92 },
  { name: 'B', score: 15 },
  { name: 'C', score: 67 },
  { name: 'D', score: 89 },
  { name: 'E', score: 53 },
  { name: 'F', score: 91 },
  { name: 'G', score: 18 }
];

/*

  Axes

*/

// Returns the maximum score in the data
let maxY1 = d3.max(data1, function (d) { return d.score; });

let yScale1 = d3.scaleLinear()
  .domain([0, maxY1]) // Defines the mapping domain
  .range([height - margin.bottom, margin.top]); // Defines the mapping range
 
let xScale1 = d3.scaleBand()
  .domain(d3.range(data1.length)) // Defines the mapping domain
  .range([margin.left, width - margin.right]) // Defines the mapping range
  .padding(0.1); // Defines the padding
  
svg1.append("g") // Appends a g element
  .attr("transform", `translate(${margin.left}, 0)`) // Translate the g element
  .call(d3.axisLeft(yScale1)) // Sets up the left axis
  .attr("font-size", '20px'); // Sets the font-size for the text on the axe

svg1.append("g") // Appends a g element
  .attr("transform", `translate(0,${height - margin.bottom})`) // Translate the g element
  .call(d3.axisBottom(xScale1) // Sets up the bottom axis
    .tickFormat(i => data1[i].name)) // Defines the tick
  .attr("font-size", '20px');

/* 

  Tooltip Set-up  

*/

const tooltip1 = d3.select("#hard-coded-bar")
  .append("div") // appends a div element for tooltip display
  .attr('id', "tooltip1")
  .style("opacity", 0)
  .attr("class", "tooltip");

const mouseover1 = function (event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // defines the tooltip display text
    .style("opacity", 1); // shows the tooltip
}

const mousemove1 = function (event, d) {
  tooltip1.style("left", (event.pageX) + "px") // redefines the x positition of the tooltip 
    .style("top", (event.pageY + yTooltipOffset) + "px");  // redefines the y positition of the tooltip 
}

// TODO: What does this code do? 
const mouseleave1 = function (event, d) {
  tooltip1.style("opacity", 0); // hides the tooltip
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
svg1.selectAll(".bar")
  .data(data1)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => xScale1(i))
  .attr("y", (d) => yScale1(d.score))
  .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
  .attr("width", xScale1.bandwidth())
  .on("mouseover", mouseover1)
  .on("mousemove", mousemove1)
  .on("mouseleave", mouseleave1);

const svg2 = d3.select("#csv-bar")
  .append('svg')
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Step 11
d3.csv('../ic-07-chy101010//data/barchart.csv').then(data => {
  let maxY3 = d3.max(data, function (d) { return d.score; });

  let yScale2 = d3.scaleLinear()
    .domain([0, maxY3])
    .range([height - margin.bottom, margin.top]);

  let xScale2 = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale2))
    .attr("font-size", '20px');
  
  svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale2)
      .tickFormat(i => data[i].name))
    .attr("font-size", '20px');
  
  const tooltip3 = d3.select("#csv-bar")
    .append("div")
    .attr('id', "tooltip3")
    .style("opacity", 0)
    .attr("class", "tooltip");

  const mouseover = function (event, d) {
    tooltip3.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
      .style("opacity", 1);
  }

  const mousemove = function (event, d) {
    console.log(event)
    tooltip3.style("left", (event.pageX) + "px")
      .style("top", (event.pageY + yTooltipOffset) + "px");
  }
   
  const mouseleave = function (event, d) {
    tooltip3.style("opacity", 0);
  }

  svg2.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale2(i))
    .attr("y", (d) => yScale2(d.score))
    .attr("height", (d) => (height - margin.bottom) - yScale2(d.score))
    .attr("width", xScale2.bandwidth())
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
})