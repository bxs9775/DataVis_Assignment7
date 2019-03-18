/* Assignment 7: Lines 
 * 
 * Create a chart that visualizes the dataset below. It must:
 * 
 * - Use only one sequence of .selectAll(), .data(), .enter() to
 * generate all lines
 * - change color of lines (you could use .style() with 'stroke')
 */

let dataset = []

for(let i = 0; i < 3; i++) {
  let lineData = []
  for(let j = 0; j < 3; j++) {
    let datum = {
      sleep: 2 + Math.random() * 10,
      date: new Date(2018, j)
    };
    lineData.push(datum);
  }
  let datum = {
    name: `Person ${i}`, 
    lineData: lineData
  };
  dataset.push(datum);
}

let w = 600;
let h = 500;

function createLineChart() {
  // create our SVG element
  let svg = d3
    .select("#lineChart")
    .attr("width", w)
    .attr("height", h);

  // create a scale for y-axis: use linear for the sleep data variable
  let yScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([h - 20, 20]);

  let xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset[0].lineData.map((d) => d.date)))
    .range([30, w - 20]);

  // create our x-axis and customize look with .ticks() and
  // .tickFormat()
  let xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.timeFormat("%m/%y"));
  let xAxisGroup = svg
    .append("g")
    .attr("transform", `translate(0, ${h - 20})`)
    .call(xAxis);

  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = svg
    .append("g")
    .attr("transform", `translate(30, 0)`)
    .call(yAxis);

  /* LINE CHART CODE */

  // draw the lines using SVG path elements
  // You must use only one .selectAll(), .data(), .enter() sequence
  // here to generate all of your lines
  let lines = [];
  for(var i = 0; i < dataset.length; i++){
    let line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.sleep));
    lines.push(line);
  }
  
  console.dir(dataset);
  console.dir(dataset.map(d => d.lineData),(d) => d.name);
  
  let path = svg.selectAll("path")
    .data(dataset.map(d => d.lineData))
    .enter()
    .append("path")
    .attr("class","line")
    .attr("d",(d,i) => lines[i](d));
  
  console.dir(path);
}



window.onload = function() {
    // console.table is very handy for viewing row/column data
    console.table(dataset);
    createLineChart();
};
