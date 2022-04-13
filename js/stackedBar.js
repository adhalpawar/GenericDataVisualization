

/**
 * Draws a stacked Bar Graph
 * @param {object} obj Complete data set object
 */

function stackedBar(obj) {


    res = flattenJSON(obj)
    data = getStackedData(obj)
    var subgroups = []

    var Primarykeys = getPrimaryKeys(obj, keyArr = [])

    for (g in data[0]) {
        if (!Primarykeys.includes(g)) {
            subgroups.push(g)
        }
    }
    var mTop = 10;
    var mRight = 30;
    var mLeft = 50;
    var mBottom = 20;

    var wB = 1000;
    var wH = 400;

    var margin = { top: mTop, right: mRight, bottom: mBottom, left: mLeft },
        width = wB * scaleFactor - margin.left - margin.right,
        height = wH - margin.top - margin.bottom;
    if (document.getElementById("sbid")) {
        document.getElementById("sbid").remove()
    }

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("id", "sbid")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    var groups = d3.map(data, function (d) { return (d[Primarykeys[0]]) }).keys()

    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    var y = d3.scaleLinear()
        .domain([0, 400])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#C7EFCF', '#FE5F55', '#EEF5DB', '#EFE5DB'])

    var stackedData = d3.stack()
        .keys(subgroups)
        (data)

    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    var mouseover = function (d) {
        var subgroupName = d3.select(this.parentNode).datum().key;
        var subgroupValue = d.data[subgroupName];
        tooltip
            .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        tooltip
            .style("left", (d3.mouse(this)[0] + 90) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
    }

    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter().append("g")
        .attr("fill", randomColor)
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data[Primarykeys[0]]); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .attr("stroke", "grey")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
}

/**
 * Returns flat json objects
 * @param {object} obj entire dataset
 * @param {object} res object to push flatten data
 * @param {text} extraKey temporary key
 * @returns {object} Flat json object
 */

const flattenJSON = (obj = {}, res = {}, extraKey = '') => {
    for (key in obj) {
        if (typeof obj[key] !== 'object') {
            res[extraKey + key] = obj[key];
        } else {
            flattenJSON(obj[key], res, `${extraKey}${key}.`);
        };
    };
    return res;
}

/**
 * Returns data object that can be used for draw graph
 * @param {object} obj Entire dataset object
 * @returns {object} Usable data object
 */

function getStackedData(obj) {
    let dataObj = []
    let tmpDict = {}

    let x = 0
    let m = 0
    let n = 0

    let secMain = []
    let secSub = []
    let tmpArr = []

    var Primarykeys = getPrimaryKeys(obj, keyArr = [])
    var SecondaryKeys = getSecondaryKeys(obj, keyArr = [], primKey = "", Primarykeys)

    for (tmp in SecondaryKeys) {
        if (SecondaryKeys[tmp].includes(".")) {
            tmpArr = SecondaryKeys[tmp].split(".")
        }

        if (!secMain.includes(tmpArr[0])) {
            secMain.push(tmpArr[0])
        }

        if (!secSub.includes(tmpArr[1])) {
            secSub.push(tmpArr[1])
        }
    }

    while (x < obj.length) {

        for (m in Primarykeys) {
            tmpDict[Primarykeys[m]] = obj[x][Primarykeys[m]]
        }

        for (n in secMain) {
            let l = 0
            while (l < obj[x][secMain[n]].length) {
                if (!tmpDict[obj[x][secMain[n]][l][secSub[0]]]) {
                    tmpDict[obj[x][secMain[n]][l][secSub[0]]] = obj[x][secMain[n]][l][secSub[1]]
                }
                else {
                    tmpDict[obj[x][secMain[n]][l][secSub[0]] + "#2"] = obj[x][secMain[n]][l][secSub[1]]
                }

                l++;
            }
        }

        dataObj.push(tmpDict)
        tmpDict = {}
        x++
    }
    console.log(dataObj)
    return dataObj
}