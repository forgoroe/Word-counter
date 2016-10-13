var text;
var keys = [];
var frequencyDictionary = {};
var poemText;

window.onload = function() {

    document.getElementById('analyse').onclick = function() {
        var text = document.getElementById('pastedText').value;
        text = text.toLowerCase();
        if (text !== "") {
            countWords(text);
            printResults();
        }
    };

    document.getElementById('empty').onclick = function(){
      document.getElementById('pastedText').value = '';
    }

    function countWords(textArg) {
        frequencyDictionary = {};
        keys = [];
        var textArray;
        textArray = textArg.split(/\W+/);

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

        if (listCountDiv.hasChildNodes()) { //
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
        }

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
