var text;
var keys = [];
var frequencyDictionary = {};
var poemText;
var chartEntry;

window.onload = function() {

    openFile = function(event) {

        var input = event.target;
        var reader = new FileReader();
        reader.readAsText(input.files[0]);
        reader.onload = function() {
            var text = reader.result;
            document.getElementById('pastedText').value = text;
        };
        document.getElementById('uploadedFile').value = null;
    };

    document.getElementById('analyse').onclick = function() {
        var text = document.getElementById('pastedText').value;
        text = text.toLowerCase();
        if (text !== "") {
            countWords(text);
            printResults();
        }
    };

    document.getElementById('empty').onclick = function() {
        document.getElementById('pastedText').value = '';
        var listCountDiv = document.getElementById('listCount');
        while (listCountDiv.firstChild) {
            listCountDiv.removeChild(listCountDiv.firstChild);
        }

        var chartElements = document.getElementById("chartStuff");
        while (chartElements.firstChild) {
            chartElements.removeChild(chartElements.firstChild);
        }

        var tableBody = document.getElementById('listCount');
        var tableRow = document.createElement('tr');
        var wordCell = document.createElement('td');
        var countCell = document.createElement('td');

        var word = document.createTextNode('...');
        var count = document.createTextNode('...');

        tableBody.appendChild(tableRow);
        tableRow.appendChild(wordCell);
        tableRow.appendChild(countCell);
        wordCell.appendChild(word);
        countCell.appendChild(count);

        var chartStuffDiv = document.getElementById('chartStuff');
        var chartTitle = document.createElement('h2');
        var chartSubtitle = document.createElement('h4');
        var chartDiv = document.createElement('div');
        chartDiv.setAttribute('id', 'chartdiv');
        chartDiv.style.width = '640px';
        chartDiv.style.height = '700px';

        var chartTitleText = document.createTextNode('Word Chart');
        var chartSubtitleText = document.createTextNode('Visual representation of word count by amCharts');

        chartStuffDiv.appendChild(chartTitle);
        chartTitle.appendChild(chartTitleText);
        chartStuffDiv.appendChild(chartSubtitle);
        chartSubtitle.appendChild(chartSubtitleText);
        chartStuffDiv.appendChild(chartDiv);

        chartStuffDiv.style.visibility = 'hidden';
    };

    function countWords(textArg) {
        frequencyDictionary = {};
        keys = [];
        var textArray;
        textArray = textArg.split(/\W+/g);
        for (var i = 0; i < textArray.length; i++) {
            var word = textArray[i];
            if (frequencyDictionary[word]) {
                frequencyDictionary[word]++;
            } else {
                frequencyDictionary[word] = 1;
                keys.push(word);
            }
        }
        //sorting by word count descending
        keys.sort(function compare(a, b) {
            var countA = frequencyDictionary[a];
            var countB = frequencyDictionary[b];
            return countB - countA;
        });

    }

    function printResults() {
        var listCountDiv = document.getElementById('listCount');

        if (listCountDiv.hasChildNodes()) {
            while (listCountDiv.firstChild) {
                listCountDiv.removeChild(listCountDiv.firstChild);
            }



            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var tableBody = document.getElementById('listCount');
                var tableRow = document.createElement('tr');
                var wordCell = document.createElement('td');
                var countCell = document.createElement('td');


                var word = document.createTextNode(keys[i]);
                var count = document.createTextNode(frequencyDictionary[key]);

                tableBody.appendChild(tableRow);
                tableRow.appendChild(wordCell);
                tableRow.appendChild(countCell);

                wordCell.appendChild(word);
                countCell.appendChild(count);

            }
            constructChart(frequencyDictionary);
        }

    }

    function constructChart(freqDictionary) {
        var arrayForChart = [];
        for (var prop in freqDictionary) {
            arrayForChart.push({ 'word': prop, 'count': freqDictionary[prop] });
        }

        arrayForChart.sort(function compare(a, b) {
            var countA = a.count;
            var countB = b.count;
            return countB - countA;
        });

        AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "rotate": true,
            "dataProvider": arrayForChart,
            "categoryField": "word",
            "graphs": [{
                "valueField": "count",
                "type": "column",
                "fillAlphas": 0.8,
                "angle": 30,
                //"depth3D": 1
            }],
            "categoryAxis": {
                "autoGridCount": false,
                "gridCount": arrayForChart.length,
                "gridPosition": "start",
            }

        });

        var divsToShow = document.getElementById("chartStuff");

        divsToShow.style.visibility = "visible";

    }

    document.getElementById('poem').onclick = function() {
        var copiedText = '';
        poemText = document.getElementById('poem').getElementsByTagName('p');

        for (i = 0; i < poemText.length; i++) {
            copiedText += poemText[i].innerText;
        }

        document.getElementById('pastedText').value = copiedText;
    }

}
