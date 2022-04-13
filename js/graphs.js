
function drawBarGraph(obj, flagh) {

    window.flagh = flagh
    window.obj = obj

    if (flagh > 0) {
        let filterValue = document.getElementById('filterValue').value
        window.filteredData = dataFilter(obj, filterValue)
        console.log(filteredData)
    }
    else (
        filteredData = obj
    )

    PrimKeys = getPrimaryKeys(obj, arr = [])
    SecKeys = getSecondaryKeys(obj, arr = [], prim = '', PrimKeys)

    let key = PrimKeys.concat(SecKeys)

    document.getElementById("labelX").removeAttribute("hidden")
    let catVar = document.getElementById("barX")
    catVar.removeAttribute("hidden")

    document.getElementById("labelY").removeAttribute("hidden")
    let numVar = document.getElementById("barY")
    numVar.removeAttribute("hidden")

    if (catVar.children.length == 0) {
        for (x in key) {
            var option = document.createElement("option")
            option.value = key[x]
            option.text = key[x]
            catVar.appendChild(option)
        }
    }

    if (numVar.children.length == 0) {
        for (x in key) {
            var option = document.createElement("option")
            option.value = key[x]
            option.text = key[x]
            numVar.appendChild(option)
        }
    }

    let formwidth = document.getElementById("widthForm").removeAttribute("hidden")
    document.getElementById("labelO").removeAttribute("hidden")
    let orient = document.getElementById("orient")
    orient.removeAttribute("hidden")

    let buttonG = document.getElementById("graph")

    buttonG.removeAttribute("hidden")

    buttonG.addEventListener("click", function () {


        let orient = document.getElementById("orient")

        if (orient.value == "horizontal") {
            horizontalGraph()
        }
        else if (orient.value == "bubble") {
            bubbleGraph()
        } else if (orient.value == "pie") {
            pieGraph()
        } else if (orient.value == "connectedScatter") {
            connectedScatter()
        } else if (orient.value == "line") {
            lineGrapgh()
        } else if (orient.value == "vertical") {
            verticalGraph()
        }

    })

    console.log(PrimKeys)
    console.log(SecKeys)

}

/**
 * Function to Draw Vertical Bar Graph
 * Calls update() to update the values in the graph
 */

function verticalGraph() {

    dataObject = getDataObject()

    keys = getkeys()

    catKey = keys[0]
    numKey = keys[1]

    if (flagh == 0) {
        document.getElementById("filterSubmit").removeAttribute("hidden")
    }

    let filter = document.querySelector('#filterSubmit')
    let flag = filter.getAttribute("hidden");

    var mTop = 30;
    var mRight = 30;
    var mLeft = 60;
    var mBottom = 70;

    var wB = 500;
    var margin = { top: mTop, right: mRight, bottom: mBottom, left: mLeft },
        width = wB - margin.left - margin.right,
        height = wB * scaleFactor - margin.top - margin.bottom;
    console.log(catKey)
    var x = d3.scaleBand()
        .range([0, width])
        .domain(dataObject.map(function (d) { return d[catKey]; }))
        .padding(0.2);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);


    if (document.getElementById("gid")) {
        document.getElementById("gid").remove()
    }

    if (document.getElementById("pid")) {
        document.getElementById("pid").remove()
    }

    if (document.getElementById("csid")) {
        document.getElementById("csid").remove()
    }

    if (document.getElementById("lgid")) {
        document.getElementById("lgid").remove()
    }

    if (document.getElementById("bgid")) {
        document.getElementById("bgid").remove()
    }
    if (document.getElementById("sbid")) {
        document.getElementById("sbid").remove()
    }


    var svg = d3.select("#my_dataviz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)


    svg
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
        .attr("id", "gid")

    svg.select("g").append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("id", "xid")
        .call(d3.axisBottom(x))

    svg.select("g").append("g")
        .attr("class", "myYaxis")
        .attr("id", "yid")
        .call(d3.axisLeft(y));

    update(dataObject, svg, x, y, height)

    filter.setAttribute("hidden", "hidden")
    let updateF = document.querySelector('#updateFilter').removeAttribute("hidden")

}

/**
 * Updates the bar values in a vertical bar graph
 * @param {object} data Filtered data
 * @param {element} svg SVG element reference on the canvas
 * @param {element} x x axis element
 * @param {element} y y axis element
 * @param {number} height height 
 */

function update(data, svg, x, y, height) {


    var u = svg.select("g").selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr('class', 'bar')
        .attr("x", function (d) { return x(d[catKey]); })
        .attr("y", function (d) { return y(d[numKey]); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d[numKey]); })
        .attr("fill", "#69b3a2")

    svg.exit().remove()

}

/**
 * Function to Draw Horizontal Bar Graph
 * Calls update() to update the values in the graph
 */


function horizontalGraph() {
    dataObject = getDataObject()
    console.log(dataObject)

    keys = getkeys()
    catKey = keys[0]
    numKey = keys[1]

    let filter = document.querySelector('#filterSubmit')
    let flag = filter.getAttribute("hidden");
    console.log(flag)
    var mTop = 30;
    var mRight = 30;
    var mLeft = 60;
    var mBottom = 70;

    var mTop = 30;
    var mRight = 30;
    var mLeft = 60;
    var mBottom = 70;

    var wB = 500;
    var margin = { top: mTop, right: mRight, bottom: mBottom, left: mLeft },
        width = wB - margin.left - margin.right,
        height = wB * scaleFactor - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .range([0, height])
        .domain(dataObject.map(function (d) { return d[catKey]; }))
        .padding(0.2);

    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    if (document.getElementById("gid")) {
        document.getElementById("gid").remove()
    }

    if (document.getElementById("pid")) {
        document.getElementById("pid").remove()
    }

    if (document.getElementById("csid")) {
        document.getElementById("csid").remove()
    }

    if (document.getElementById("lgid")) {
        document.getElementById("lgid").remove()
    }

    if (document.getElementById("bgid")) {
        document.getElementById("bgid").remove()
    }
    if (document.getElementById("sbid")) {
        document.getElementById("sbid").remove()
    }

    var svg = d3.select("#my_dataviz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)


    svg
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
        .attr("id", "gid")


    svg.select("g").append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("id", "xid")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.select("g").append("g")
        .attr("id", "yid")
        .call(d3.axisLeft(y));

    updateH(dataObject, svg, x, y, height)

    filter.setAttribute("hidden", "hidden")
    let updateF = document.querySelector('#updateFilter').removeAttribute("hidden")

}

/**
 * Updates the bar values in a Horizontal bar graph
 * @param {object} data Filtered data
 * @param {element} svg SVG element reference on the canvas
 * @param {element} x x axis element
 * @param {element} y y axis element
 * @param {number} height height 
 */

function updateH(data, svg, x, y, height) {


    var u = svg.select("g").selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", x(0))
        .attr("y", function (d) { return y(d[catKey]); })
        .attr("width", function (d) { return x(d[numKey]); })
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")

    svg.exit().remove()

}

/**
 * Function to Draw Connected Scatter Graph
 * Calls update() to update the values in the graph
 */

function connectedScatter() {

    dataObject = getDataObject()
    console.log(dataObject)

    keys = getkeys()
    catKey = keys[0]
    numKey = keys[1]

    let filter = document.querySelector('#filterSubmit')
    let flag = filter.getAttribute("hidden");
    console.log(flag)
    var mTop = 30;
    var mRight = 30;
    var mLeft = 60;
    var mBottom = 70;

    var wB = 460;
    var wH = 400;
    var margin = { top: mTop, right: mRight, bottom: mBottom, left: mLeft },
        width = wB * scaleFactor - margin.left - margin.right,
        height = wH - margin.top - margin.bottom;


    if (document.getElementById("gid")) {
        document.getElementById("gid").remove()
    }

    if (document.getElementById("pid")) {
        document.getElementById("pid").remove()
    }

    if (document.getElementById("csid")) {
        document.getElementById("csid").remove()
    }

    if (document.getElementById("lgid")) {
        document.getElementById("lgid").remove()
    }

    if (document.getElementById("bgid")) {
        document.getElementById("bgid").remove()
    }
    if (document.getElementById("sbid")) {
        document.getElementById("sbid").remove()
    }


    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
        .attr("id", "csid")


    var x = d3.scaleBand()
        .domain(dataObject.map(function (d) { return d[catKey]; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // .padding(0.2);
    const max = d3.max(dataObject, (d) => d[numKey]);
    var y = d3.scaleLinear()
        .domain([0, max + 20])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));



    updateCS(dataObject, svg, x, y)

    filter.setAttribute("hidden", "hidden")
    let updateF = document.querySelector('#updateFilter').removeAttribute("hidden")

}

/**
 * Updates the values in a connected scatter graph
 * @param {object} data Filtered data
 * @param {element} svg SVG element reference on the canvas
 * @param {element} x x axis element
 * @param {element} y y axis element
 */

function updateCS(data, svg, x, y) {

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d[catKey]) })
            .y(function (d) { return y(d[numKey]) })
        )
        .attr("x", function (d) { return x(d[catKey]); })
        .attr("y", function (d) { return y(d[numKey]); })
        .attr("width", x.bandwidth())

    svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[catKey]) })
        .attr("cy", function (d) { return y(d[numKey]) })
        .attr("r", 5)
        .attr("fill", "#69b3a2")

    svg.exit().remove()

}

/**
 * Function to get random colours in the graphs
 * @returns {text} Random HEX code generetaed
 */

var randomColor = (function () {
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random();

    var hslToRgb = function (h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return '#' + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
    };

    return function () {
        h += golden_ratio_conjugate;
        h %= 1;
        return hslToRgb(h, 0.5, 0.60);
    };
})();


/**
 * Function to Draw Bubble Graph
 * Calls update() to update the values in the graph
 */

function bubbleGraph() {

    dataObject = getDataObject()
    console.log(dataObject)

    keys = getkeys()
    catKey = keys[0]
    numKey = keys[1]

    let filter = document.querySelector('#filterSubmit')
    let flag = filter.getAttribute("hidden");
    console.log(flag)

    var mTop = 10;
    var mRight = 20;
    var mLeft = 30;
    var mBottom = 30;

    var wB = 400;
    var wH = 420;
    var margin = { top: mTop, right: mRight, bottom: mBottom, left: mLeft },
        width = wB * scaleFactor - margin.left - margin.right,
        height = wH - margin.top - margin.bottom;

    if (document.getElementById("gid")) {
        document.getElementById("gid").remove()
    }

    if (document.getElementById("pid")) {
        document.getElementById("pid").remove()
    }

    if (document.getElementById("csid")) {
        document.getElementById("csid").remove()
    }

    if (document.getElementById("lgid")) {
        document.getElementById("lgid").remove()
    }

    if (document.getElementById("bgid")) {
        document.getElementById("bgid").remove()
    }
    if (document.getElementById("sbid")) {
        document.getElementById("sbid").remove()
    }

    var svg = d3.select("#my_dataviz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "bgid")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    var x = d3.scaleBand()
        .domain(dataObject.map(function (d) { return d[catKey]; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // .padding(0.2);
    const max = d3.max(dataObject, (d) => d[numKey]);
    var y = d3.scaleLinear()
        .domain([0, max + 20])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    const radiusScale = d3.scaleSqrt()
        .domain([0, max])
        .range([0, 40])

    updateB(dataObject, svg, x, y, radiusScale, max)

    filter.setAttribute("hidden", "hidden")
    let updateF = document.querySelector('#updateFilter').removeAttribute("hidden")

}

/**
 * Updates the values in a Bubble graph
 * @param {object} data Filtered data
 * @param {element} svg SVG element reference on the canvas
 * @param {element} x x axis element
 * @param {element} y y axis element
 */

function updateB(data, svg, x, y, z) {

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr('class', 'bubbles')
        .attr("cx", function (d) { return x(d[catKey]); })
        .attr("cy", function (d) { return y(d[numKey]); })
        .attr("r", function (d) { return z(d[numKey]); })
        .style("fill", randomColor)

    svg.exit().remove()

}

/**
 * Function to Draw Line Graph
 * Calls update() to update the values in the graph
 */

function lineGrapgh() {

    dataObject = getDataObject()
    console.log(dataObject)

    keys = getkeys()
    catKey = keys[0]
    numKey = keys[1]

    let filter = document.querySelector('#filterSubmit')
    let flag = filter.getAttribute("hidden");
    console.log(flag)

    var mTop = 10;
    var mRight = 30;
    var mLeft = 60;
    var mBottom = 30;

    var wB = 460;
    var wH = 400;
    var margin = { top: mTop, right: mRight, bottom: mBottom, left: mLeft },
        width = wB - margin.left - margin.right,
        height = wH - margin.top - margin.bottom;
    if (document.getElementById("gid")) {
        document.getElementById("gid").remove()
    }

    if (document.getElementById("pid")) {
        document.getElementById("pid").remove()
    }

    if (document.getElementById("csid")) {
        document.getElementById("csid").remove()
    }

    if (document.getElementById("lgid")) {
        document.getElementById("lgid").remove()
    }

    if (document.getElementById("bgid")) {
        document.getElementById("bgid").remove()
    }
    if (document.getElementById("sbid")) {
        document.getElementById("sbid").remove()
    }

    var svg = d3.select("#my_dataviz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "lgid")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    var x = d3.scaleBand()
        .domain(dataObject.map(function (d) { return d[catKey]; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // .padding(0.2);
    const max = d3.max(dataObject, (d) => d[numKey]);
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    updateL(dataObject, svg, x, y, max, height)

    filter.setAttribute("hidden", "hidden")
    let updateF = document.querySelector('#updateFilter').removeAttribute("hidden")

}

/**
 * Updates the values in a Line graph
 * @param {object} data Filtered data
 * @param {element} svg SVG element reference on the canvas
 * @param {element} x x axis element
 * @param {element} y y axis element
 * @param {element} max maximum value element
 */

function updateL(data, svg, x, y, max) {
    svg.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(max))
        .selectAll("stop")
        .data([
            { offset: "0%", color: "blue" },
            { offset: "100%", color: "red" }
        ])
        .enter().append("stop")
        .attr("offset", function (d) { return d.offset; })
        .attr("stop-color", function (d) { return d.color; });

    // var u = svg.select("g").selectAll("rect")
    //     .data(data)
    svg.append("path")
        .datum(data)
        // .merge(svg)
        .attr("fill", "none")
        .transition()
        .duration(1000)
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function (d) { return x(d[catKey]) })
            .y(function (d) { return y(d[numKey]) })
        )

    svg.exit().remove()

}

/**
 * Function to Draw Pie Graph
 * Calls update() to update the values in the graph
 */

function pieGraph() {

    dataObject = getDataObject()
    console.log(dataObject)

    keys = getkeys()
    catKey = keys[0]
    numKey = keys[1]

    let filter = document.querySelector('#filterSubmit')

    var mTop = 50;
    var mRight = 50;
    var mLeft = 50;
    var mBottom = 50;

    var wB = 600;
    var wH = 600;

    var margin = { top: mTop, bottom: mBottom, left: mLeft, right: mRight },
        width = wB * scaleFactor - margin.left - margin.right,
        height = wH - margin.top - margin.bottom;
    radius = Math.min(width, height) / 2;

    if (document.getElementById("gid")) {
        document.getElementById("gid").remove()
    }

    if (document.getElementById("pid")) {
        document.getElementById("pid").remove()
    }

    if (document.getElementById("csid")) {
        document.getElementById("csid").remove()
    }

    if (document.getElementById("lgid")) {
        document.getElementById("lgid").remove()
    }

    if (document.getElementById("bgid")) {
        document.getElementById("bgid").remove()
    }
    if (document.getElementById("sbid")) {
        document.getElementById("sbid").remove()
    }

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("id", "pid")
        .attr("width", width)
        .attr("height", height)

    var group = svg.append('g')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var path = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 90);

    var label = d3.arc()
        .outerRadius(radius - 250)
        .innerRadius(radius);

    updateP(dataObject, group, path, label)

    filter.setAttribute("hidden", "hidden")
    let updateF = document.querySelector('#updateFilter').removeAttribute("hidden")

}

/**
 * Updates the values in a Pie graph
 * @param {object} data1 Filtered data
 * @param {element} group Group element for all partitions
 * @param {element} path path element for individual partitons
 * @param {element} label labels for partitons
 */

function updateP(data1, group, path, label) {

    var pie = d3.pie()
        .value((data1) => data1[numKey]);

    var arc = group.selectAll(".arc")
        .data(pie(data1))
        .enter()
        .append("g")
        .attr("class", "arc");


    arc.append("path")
        .attr("d", path)
        .transition()
        .duration(1000)
        .attr("fill", randomColor)
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    arc.append("text")
        .attr("transform", function (data1) { return "translate(" + label.centroid(data1) + ")"; })
        .attr("text-anchor", "middle")
        .attr("font-size", "50px")
        .text((data1) => data1.data[catKey]);

    arc.exit().remove()

}

/**
 * Returns categorical values array from the filtered data
 * @param {object} filteredData Filtered data
 * @returns Categorical values Array 
 */

function getcatArray() {

    let catValue = document.getElementById("barX").value

    let x = 0
    let i = 2
    catArr = []
    catData = []

    if (catValue.includes(".")) {
        catArr = catValue.split(".")
    }
    else {
        catArr.push(catValue)
    }


    if (catArr.length > 1) {
        while (x < filteredData[catArr[0]].length) {
            catData.push(filteredData[catArr[0]][x][catArr[1]])
            x++;
        }
    }

    let result = []

    for (x in catData) {
        if (result.includes(catData[x])) {
            result.push(catData[x] + "#" + i)
            i++;
        }
        else {
            result.push(catData[x])
        }
    }

    return result
}

/**
 * Returns numerical values array from the filtered data
 * @param {object} filteredData Filtered data
 * @returns Numerical values Array 
 */

function getnumArray() {

    let numValue = document.getElementById("barY").value

    let i = 0
    numArr = []
    numData = []

    if (numValue.includes(".")) {
        numArr = numValue.split(".")
    }
    else {
        numArr.push(numValue)
    }

    if (numArr.length > 1) {
        while (i < filteredData[numArr[0]].length) {
            numData.push(filteredData[numArr[0]][i][numArr[1]])
            i++;
        }
    }

    return numData
}

/**Maps the categorical data to numerical data
 * @param {object} catData Filtered categorical data
 * @param {object} numData Filtered numerical data
 * @returns Data object
 */

function getDataObject() {

    if (flagh > 0) {
        let catValue = document.getElementById("barX").value
        let numValue = document.getElementById("barY").value

        catArr = []
        numArr = []

        if (catValue.includes(".")) {
            catArr = catValue.split(".")
        }
        else {
            catArr.push(catValue)
        }

        if (numValue.includes(".")) {
            numArr = numValue.split(".")
        }
        else {
            numArr.push(numValue)
        }


        catData = getcatArray()
        numData = getnumArray()

        let dataObject = []
        var dataDict = {}
        let i = 1

        for (val in catData) {
            dataDict[catArr[1]] = catData[val]
            dataDict[numArr[1]] = numData[val]
            dataObject.push(dataDict)
            dataDict = {}
        }
        return dataObject
    }
    else {
        let dataObject = []
        let dataDict = {}
        let catValue = document.getElementById("barX").value
        let numValue = document.getElementById("barY").value
        let x = 0
        while (x < 9) {
            dataDict[catValue] = obj[x][catValue]
            dataDict[numValue] = obj[x][numValue]
            dataObject.push(dataDict)
            dataDict = {}
            x++
        }
        return dataObject
    }
}

/**
 * Returns the array of simplified keys
 * @returns Array of keys
 */

function getkeys() {
    let catValue = document.getElementById("barX").value
    let numValue = document.getElementById("barY").value

    if (flagh > 0) {
        catArr = []
        numArr = []

        if (catValue.includes(".")) {
            catArr = catValue.split(".")
        }
        else {
            catArr.push(catValue)
        }

        if (numValue.includes(".")) {
            numArr = numValue.split(".")
        }
        else {
            numArr.push(numValue)
        }

        result = [catArr[1], numArr[1]]

        return result
    }
    else {
        result = [catValue, numValue]
        return result
    }

}

/**
 * Increases scalefactor based on user input to change width
 * @returns {number} scalefactor
 */

function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    var scaleFactor = 1;
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;

    window.scaleFactor = scaleFactor + value / 10
    return scaleFactor

}

/**
 * Decreases scalefactor based on user input to change width
 * @returns {number} scalefactor
 */

function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    var scaleFactor = 1;
    value = isNaN(value) ? 0 : value;

    value--;
    document.getElementById('number').value = value;

    window.scaleFactor = scaleFactor + value / 10
    return scaleFactor

}