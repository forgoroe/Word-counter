var text;
var keys = [];
var frequencyDictionary = {};

window.onload = function() {

    document.getElementById('analyse').onclick = function() {
        var text = document.getElementById('pastedText').value;
        text = text.toLowerCase();
        if (text !== "") {
            countWords(text);
            printResults();
        }
    };

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
                var pageSectionId = document.getElementById('listCount');
                var paragraph = document.createElement('P');
                var paragraphContent = document.createTextNode(keys[i] + ' ' + frequencyDictionary[key]);

                paragraph.appendChild(paragraphContent);
                pageSectionId.appendChild(paragraph);
            }
        }

    }

}
