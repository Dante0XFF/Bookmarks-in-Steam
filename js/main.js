'use strict';

window.addEventListener('DOMContentLoaded', start);

function start(){

	// To prevent to submit forms
	let form_list = document.getElementsByTagName('form');

	for (let i = 0; i < form_list.length; i++) {
		form_list[i].addEventListener('submit', (event) => event.preventDefault());
	}

	// To open tab in background
	function openTabBackground(url) {
		if (url !== null && url !== '') {
			// Source: https://stackoverflow.com/questions/10812628/open-a-new-tab-in-the-background
			let anchor = document.createElement("a");
			anchor.href = url;
			let evt = document.createEvent("MouseEvents");
			//The tenth parameter of initMouseEvent sets ctrl key
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
				true, false, false, false, 0, null);
			anchor.dispatchEvent(evt);
		}
	}

	/*
		Notes
	*/

	// To autoload notes
	if (localStorage.getItem('notes') !== null) {
		document.getElementById('notes').value = localStorage.getItem('notes');
		document.getElementById('notes').style.height = localStorage.getItem('height_notes');
	}else{
		// To create a default note
		localStorage.setItem('notes', '');
		document.getElementById('notes').value = localStorage.getItem('notes');
		document.getElementById('notes').style.height = "150px";
	}

	// To save notes
	function saveNotes() {
		localStorage.setItem('notes', document.getElementById('notes').value);
		localStorage.setItem('height_notes', document.getElementById('notes').style.height);
		document.getElementById('note_status').innerHTML='Saved.';
	}

	document.getElementById('buttonsavenotes').addEventListener('click', () => {
		saveNotes();
	});

	/*
		URLs
	*/

	// To autoload favorite URLs
	for (let i = 1; i <= 5; i++) {
		if (localStorage.getItem('favoriteurl'+i) !== null) {
			document.getElementById('favoriteurl'+i).value = localStorage.getItem('favoriteurl'+i);
		}
	}

	// To save-update favorite URLs
	function saveFavoriteUrls() {
		for (let i = 1; i <= 5; i++) {
			let url = document.getElementById('favoriteurl'+i).value;
			if (url !== null && url !== '') {
				localStorage.setItem('favoriteurl'+i, document.getElementById('favoriteurl'+i).value);
			}
		}
		document.getElementById('url_status').innerHTML='Saved.';
	}

	document.getElementById('buttonsaveall').addEventListener('click', function(){
		saveFavoriteUrls();
	});

	for (let i = 1; i <= 5; i++) {
		document.getElementById('favoriteurl'+i).addEventListener('change', () => document.getElementById('url_status').innerHTML='Changed.');
	}

	// 'Go to' buttons
	document.getElementById('buttongoto').addEventListener('click', function(event){
		let open_mode_value = document.getElementById('open_mode').selectedIndex;
		let url = document.getElementById('url').value;
		if ((open_mode_value === 1 || open_mode_value === 0) && url !== null) {
			openTabBackground(url);
		} else {
			if (open_mode_value === 2 && url !== null) {
				window.open(url, '_self');
			} else {
				if (open_mode_value === 3 && url !== null) {
					window.open(url, '_blank');
				}
			}
		}
	});

	// Anchors of the Navbar
	document.getElementById('anchor1').addEventListener('click', function(event){
		openTabBackground('https://encrypted.google.com/webhp?hl=en&gl=en');
	});

	document.getElementById('anchor2').addEventListener('click', function(event){
		openTabBackground('https://encrypted.google.com/webhp?hl=en&gl=en');
	});

	// To go to a favorite URL
	document.getElementById('buttongoto1').addEventListener('click', function(event){
		openTabBackground(document.getElementById('favoriteurl1').value);
	});

	document.getElementById('buttongoto2').addEventListener('click', function(event){
		openTabBackground(document.getElementById('favoriteurl2').value);
	});

	document.getElementById('buttongoto3').addEventListener('click', function(event){
		openTabBackground(document.getElementById('favoriteurl3').value);
	});

	document.getElementById('buttongoto4').addEventListener('click', function(event){
		openTabBackground(document.getElementById('favoriteurl4').value);
	});

	document.getElementById('buttongoto5').addEventListener('click', function(event){
		openTabBackground(document.getElementById('favoriteurl5').value);
	});

	/*
		To save notes and urls with a shortcut
	*/

	document.onkeydown = function(e){
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault();
			saveNotes();
			document.getElementById('note_status').innerHTML='Saved.';
		} else if(e.ctrlKey && e.key === 'd') {
			e.preventDefault();
			saveFavoriteUrls();
			document.getElementById('url_status').innerHTML='Saved.';
		}
	};

}