var buttons = document.getElementsByClassName("button");
var tables = document.getElementsByClassName("ChaptersList");

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