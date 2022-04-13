document.getElementById('import').onclick = function () {
    var files = document.getElementById('selectFiles').files
    console.log(files)
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();

    fr.onload = function (e) {
        var result = JSON.parse(e.target.result)
        var formatted = JSON.stringify(result, null, 2)
        document.getElementById('result').value = formatted
        document.getElementById("stack").removeAttribute("hidden")

        console.log(result)

        let tmpflag = 0
        for (x in result) {
            for (z in result[x]) {
                if (typeof result[x][z] == "object") {
                    tmpflag++
                }
            }
        }

        console.log(tmpflag)

        if (tmpflag > 0) {
            document.getElementById("result").removeAttribute("hidden")
            document.getElementById("labelF").removeAttribute("hidden")
            document.getElementById("barF").removeAttribute("hidden")
            document.getElementById("filterValue").removeAttribute("hidden")
            document.getElementById("filterSubmit").removeAttribute("hidden")
        }
        else {
            drawBarGraph(result, tmpflag)
        }

        let updateF = document.querySelector('#updateFilter')
        updateF.addEventListener("click", function () {
            drawBarGraph(result, tmpflag)
        })

        let filter = document.querySelector('#filterSubmit')
        filter.addEventListener("click", function () {

            Primarykeys = getPrimaryKeys(result, keyArr = [])
            SecondaryKeys = getSecondaryKeys(result, keyArr = [], primKey = "", Primarykeys)
            drawBarGraph(result, tmpflag)

        })

        document.getElementById("stack").onclick = function () {
            let formwidth = document.getElementById("widthForm").removeAttribute("hidden")
            let buttons = document.getElementById("graph")
            buttons.removeAttribute("hidden")
            document.getElementById("result").setAttribute("hidden", "hidden")
            document.getElementById("labelF").setAttribute("hidden", "hidden")
            document.getElementById("barF").setAttribute("hidden", "hidden")
            document.getElementById("filterValue").setAttribute("hidden", "hidden")
            document.getElementById("filterSubmit").setAttribute("hidden", "hidden")

            buttons.addEventListener("click", function () {
                stackedBar(result)
            })
        }
    }

    fr.readAsText(files.item(0));

};


/**
 * Returns array of primary keys
 * @param {object} obj Complex JSON Object
 * @param {array} keyArr Empty array for returning
 * @returns {array} Array of Primary Keys 
 */

function getPrimaryKeys(obj, keyArr = []) {
    for (keys in obj[0]) {
        if (typeof obj[0][keys] != "object") {
            keyArr.push(keys);
        }
    }
    return keyArr;
}

/**
 * Returns array of secondary keys
 * @param {object} obj Complex JSON Object
 * @param {array} keyArr Empty Array
 * @param {text} primKey Primary key for the secondary keys
 * @param {array} primkeyArr Primary Key array
 * @returns Array of secondary keys
 */

function getSecondaryKeys(obj, keyArr = [], primKey, primkeyArr) {
    for (keys in obj[0]) {
        if (typeof obj[0][keys] == "object") {
            getSecondaryKeys(obj[0][keys], keyArr, keys, primkeyArr)
        }
        else {
            if (!primkeyArr.includes(keys)) {
                keyArr.push(primKey + "." + keys)
            }
        }
    }
    return keyArr;
}

/**
 * Filters the nentire dataset and returns the filtered data
 * @param {object} obj Complex JSON object 
 * @param {text} filter Filter key
 * @returns JSON object of filtered data
 */

function dataFilter(obj, filter) {

    Primarykeys = getPrimaryKeys(obj, keyArr = [])
    SecondaryKeys = getSecondaryKeys(obj, keyArr = [], primKey = "", Primarykeys)

    keys = Primarykeys.concat(SecondaryKeys)

    filteredData = {}

    let x = 0

    let select = document.getElementById("barF")
    var value = select.options[select.selectedIndex].value

    let nameF = document.getElementById("nameF").value
    let idf = document.getElementById("idF").value

    if (value == idF) {
        filter = parseInt(filter)
    }

    while (x < obj.length) {
        for (y in Primarykeys) {
            if (obj[x][Primarykeys[y]] == filter) {
                filteredData = obj[x]
            }
        }
        x++;
    }
    return filteredData;

}