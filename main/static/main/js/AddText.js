let done = document.getElementById("done");

done.onclick = function startWork (e) {
	e. preventDefault();
	mymap.clear();
	group_number = 1;
	vocub_map.clear();
	vocab_key = "";
	let original_text = document.getElementById("original_text");
	let translation_text = document.getElementById("translation_text");
	original = original_text.value;
	translation = translation_text.value;
	let original_words = original.split(String.fromCharCode(32)).join('$').split(String.fromCharCode(12288)).join('$').split('\n').join('$').split('$');
	let translation_words = translation.split(String.fromCharCode(32)).join('$').split(String.fromCharCode(12288)).join('$').split('\n').join('$').split('$');
	let work_original = document.getElementById("work_original");
	let work_translation = document.getElementById("work_translation");
	let new_words_original = document.querySelectorAll('.original_word');
	new_words_original.forEach(word => {
		word.remove();
	});
	let original_words_counter = 0;
	original_words.forEach(function (word) {
		original_words_counter += 1;
		let new_word = document.createElement("DIV");
		new_word.innerHTML = "<span>"+word+"</span>"
		new_word.className = "original_word";
		new_word.id = `original_${original_words_counter}`;
		work_original.appendChild(new_word);
	});
	let new_words_translation = document.querySelectorAll('.translation_word');
	new_words_translation.forEach(word => {
		word.remove();
	});
	let translation_words_counter = 0;
	translation_words.forEach(function (word) {
		translation_words_counter += 1;
		let new_word = document.createElement("DIV");
		new_word.innerHTML = "<span>"+word+"</span>"
		new_word.className = "translation_word";
		new_word.id = `translation_${translation_words_counter}`;
		work_translation.appendChild(new_word);
	});
	e.preventDefault();
	let words_original = document.querySelectorAll('.original_word');
	words_original.forEach(word => {
		let choosen = false;
		word.addEventListener("click",()=>{
			choosen = !choosen;
			if (choosen) {
				word.style.backgroundColor = "red";
				origine.push(word.id);
			} else {
				word.style.backgroundColor = "grey";
				origine.splice(origine.indexOf(word.id),1);
			}
		});
	});
	let words_translation = document.querySelectorAll('.translation_word');
	words_translation.forEach(word => {
		let choosen = false;
		word.addEventListener("click",()=>{
			choosen = !choosen;
			if (choosen) {
				word.style.backgroundColor = "red";
				translate.push(word.id);
			} else {
				word.style.backgroundColor = "grey";
				translate.splice(translate.indexOf(word.id),1);
			}
		});
	});
	words_original = document.querySelectorAll('.original_word');
	words_original.forEach(word => {
		word.addEventListener("contextmenu",()=>{
			event.preventDefault();
			showAddTranslation(event.pageX,event.pageY);
			let target_word = document.querySelector("#word");
			target_word.value = word.textContent;
			vocab_key = '"_'+word.id+'"';
		});
	});
}

var origine = [];
var translate = [];

let save = document.getElementById("save");

var mymap = new Map();
var group_number = 1;

save.onclick = function save (e) {
	e. preventDefault();
	for (let i = 0; i < origine.length; i++) {
		mymap.set("_"+origine[i],`group_${group_number}`);
		console.log("_"+origine[i]+`group_${group_number}`);
	}
	for (let i = 0; i < translate.length; i++) {
		mymap.set("_"+translate[i],`group_${group_number}`);
		console.log("_"+translate[i]+`group_${group_number}`);
	}
	let clear = origine.slice(); //копия массива а не ссылка
	clear.forEach(function(id){
		console.log(id)
		document.querySelector(`#${id}`).click();
	});
	clear=[];
	clear = translate.slice(); //копия массива а не ссылка
	clear.forEach(function(id){
		console.log(id)
		document.querySelector(`#${id}`).click();
	});
	clear=[];
	group_number += 1;
	console.log(origine);
	console.log(translate)
}

let test = document.getElementById("test");

test.onclick = function test (e) {
	e. preventDefault();
	let words_original = document.querySelectorAll('.original_word');
	let final_original_text = document.getElementById("final_original_text");
	final_original_text.innerHTML = '';
	words_original.forEach(word => {
		final_original_text.innerHTML += ` <span class="${mymap.get(word.id)} text" id="_${word.id}">`+word.textContent+"</span>";
	});
	let words_translation = document.querySelectorAll('.translation_word');
	let final_translation_text = document.getElementById("final_translation_text");
	final_translation_text.innerHTML = '';
	words_translation.forEach(word => {
		final_translation_text.innerHTML += ` <span class="${mymap.get(word.id)} text" id="_${word.id}">`+word.textContent+"</span>";
	});
	let text_words = document.querySelectorAll('.text');
	text_words.forEach(word => {
		word.addEventListener('mouseover',()=>{
			if (vocub_map.has('"'+word.id+'"')) {
				console.log("yes");
				console.log(`{"${word.id}"${vocub_map.get('"'+word.id+'"')}}`);
				let word_from_vocab =  JSON.parse(`{"${word.id}"${vocub_map.get('"'+word.id+'"')}}`);
				showHelper (event.pageX,event.pageY,word_from_vocab[word.id].word,word_from_vocab[word.id].reading,word_from_vocab[word.id].meaning);
			} else {
				console.log("no");
			}
			let group = mymap.get(word.id);
			//console.log(word.textContent);
			text_words.forEach(word => {
				let check = mymap.get(word.id);
				if (check==group && check != undefined) {
					console.log(group);
					word.style.backgroundColor = "red";
				}
			})
		})
	});
	text_words.forEach(word => {
		word.addEventListener('mouseout',()=>{
			hideHelper ();
			let group = mymap.get(word.id);
			//console.log(word.textContent);
			text_words.forEach(word => {
				let check = mymap.get(word.id);
				if (check==group && check != undefined) {
					word.style.backgroundColor = "white";
				}
			})
		})
	});
}

let add_translation_to_word_menu = document.getElementById("add_translation_to_word_menu");

add_translation_to_word_menu.style.display="none";

function showAddTranslation (x,y) {
	add_translation_to_word_menu.style.display = "block";
	add_translation_to_word_menu.style.position = "absolute";
	add_translation_to_word_menu.style.left = x+"px";
	add_translation_to_word_menu.style.top = y+"px";
}

let add_translation_to_word = document.getElementById("add_translation_to_word");

var vocub_map = new Map();
var vocab_key = "";

let save_translation = document.getElementById("save_translation");

save_translation.onclick = function save_translation (e) {
	e. preventDefault();
	let target_word = document.querySelector("#word").value;
	let target_reading = document.querySelector("#reading").value;
	let target_translation = document.querySelector("#translation").value;
	let vocab_article = `: {"word": "${target_word}", "reading": "${target_reading}", "meaning": "${target_translation}"}`;
	vocub_map.set(vocab_key,vocab_article);
	console.log(vocab_key+vocab_article);
	add_translation_to_word_menu.style.display="none";
}

const helper = document.getElementById("helper");
hideHelper ();

function showHelper (x,y,wrd,rdng,mnng) {
	helper.style.display = "block";
	helper.style.position = "absolute";
	helper.style.left = x+"px";
	helper.style.top = y+"px";
	let this_word = document.getElementById("v_word");
	this_word.innerHTML=wrd;
	let this_reading = document.getElementById("v_reading");
	this_reading.innerHTML=rdng;
	let this_meaning = document.getElementById("v_meaning");
	this_meaning.innerHTML=mnng;
}

function hideHelper () {
	helper.style.display = "none";
	let this_word = document.getElementById("v_word");
	this_word.innerHTML="";
	let this_reading = document.getElementById("v_reading");
	this_reading.innerHTML="";
	let this_meaning = document.getElementById("v_meaning");
	this_meaning.innerHTML="";
}

let sendToServer = document.getElementById("sendToServer");
sendToServer.onclick = function send_To_Server(e) {
	e. preventDefault();
	myJson = DataToJson ();
	console.log(myJson);
	const request = new XMLHttpRequest();
	const url = "/ShowText";
	request.open("POST", url, true);
	let csrftoken = '{{ csrf_token }}'
	request.setRequestHeader("X-CSRFToken", csrftoken); 
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
			console.log("sent");
			alert("Спасибо! Ваш пример будет добавлен после проверки.");
			window.location.href = "/reading";
		} else if (request.readyState === 4 && request.status >= 500) {
			alert("Упс! Что-то пошло не так... Возможно вы не добавили соответствия или перевод слов. Для публикации должно быть хотябы одно соответствие и один перевод слова. Или вы данные в неправильном формате");
		}
	};
	request.send(myJson);
}

function DataToJson () {
	let TextName = document.querySelector('#input_1').value;
	TextName = '"TextName":'+`"${TextName}"`;
	let original_to_json = '"original":{';
	let words_original = document.querySelectorAll('.original_word');
	words_original.forEach(word => {
		original_to_json += `"_${word.id}": "${word.textContent}",`;
	});
	original_to_json = original_to_json.substring(0, original_to_json.length - 1)+"}";
	let translation_to_json = '"translation":{';
	let words_translation = document.querySelectorAll('.translation_word');
	words_translation.forEach(word => {
		translation_to_json += `"_${word.id}": "${word.textContent}",`;
	});
	translation_to_json = translation_to_json.substring(0, translation_to_json.length - 1)+"}";
	let map_parallel_text = '"map_parallel_text":{';
	for (let key of mymap.keys()) {
		map_parallel_text += `"${key}": "${mymap.get(key)}",`;
	}
	map_parallel_text = map_parallel_text.substring(0, map_parallel_text.length - 1)+"}";
	let vocab_map_parallel_text = '"vocab_map_parallel_text":{';
	for (let key of vocub_map.keys()) {
		vocab_map_parallel_text += `${key} ${vocub_map.get(key)},`;
	}
	vocab_map_parallel_text = vocab_map_parallel_text.substring(0, vocab_map_parallel_text.length - 1)+"}";
	return `{${TextName},${original_to_json},${translation_to_json},${map_parallel_text},${vocab_map_parallel_text}}`;
}