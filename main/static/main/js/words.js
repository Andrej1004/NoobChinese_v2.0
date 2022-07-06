var buttons = document.getElementsByClassName("button");
var tables = document.getElementsByClassName("wordsList");

for (var i=0; i< tables.length; i++) {
	tables[i].style.display="none";
}

function getButtonID(el) {
	clickedButton = el.id;
	for (var i=0; i<buttons.length; i++){
		if (buttons[i].id == clickedButton) {
			if (tables[i].style.display=="none") {
				tables[i].style.display="block";
			} else {
				tables[i].style.display="none";
			}
		}
	}
}

var words = document.getElementsByClassName("word");
var examples = document.getElementsByClassName("example");

for (var i=0; i< examples.length; i++) {
	examples[i].style.display="none";
}

function getWordID(el) {
	clickedWord = el.id;
	for (var i=0; i<words.length; i++){
		if (words[i].id == clickedWord) {
			if (examples[i].style.display=="none") {
				examples[i].style.display="table-row";
			} else {
				examples[i].style.display="none";
			}
		}
	}
}

var Show = false;

function ShowOrHide() {
	Show = !Show;
	for (var i=0; i<examples.length; i++){
		if (Show) {
			examples[i].style.display="table-row";
		} else {
			examples[i].style.display="none";
		}
	}
}