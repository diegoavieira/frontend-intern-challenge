//topScrollFixed
function topScrollFixed() {
	var top = document.getElementById('top');
	
	if (document.body.scrollTop > 100) {
		top.classList.add('top-fixed');
	} else {
		top.classList.remove('top-fixed');
	}
}

window.onscroll = function() {
	topScrollFixed();
};

//urlShorten
var btnShorten = document.getElementById('btnShorten');
var btnCopy = document.getElementById('btnCopy');
var clean = document.getElementById('clean');
var input = document.getElementById('input');
var message = document.getElementById('message');
var url;

function urlShorten() {
	url = input.value;
	urlShort = jsonUrls[5].shortUrl;
	input.value = urlShort;
	input.classList.toggle('input-bold');
	message.innerHTML = 'Copie seu link encurtado!';
}

function formShorten() {
	if (input.value === '') {
		message.innerHTML = 'Cole ou digite um link para encurtar!';
	} else {
		urlShorten();
		btnShorten.classList.toggle('hide');
		btnCopy.classList.toggle('hide');
		clean.classList.toggle('hide');
	}
}

function copyUrl() {
	input.select();
	document.execCommand('copy');
	message.innerHTML = 'Seu link <a href="'+ urlShort +'" target="_blank">' + urlShort + '</a> curto foi copiado!';
}

function messageClean() {
	message.innerHTML = '';
}

input.onfocus = function() {
	messageClean();
};

btnShorten.onclick = function() {
	formShorten();
};

btnCopy.onclick = function() {
	copyUrl();
};

clean.onclick = function() {
	messageClean();
	input.value = '';
	btnShorten.classList.toggle('hide');
	btnCopy.classList.toggle('hide');
	clean.classList.toggle('hide');
	input.classList.toggle('input-bold');
};

//topFiveList
function topFiveList(value) {
	var topList = document.getElementById('topList');

	jsonUrls.sort(function (a, b) {
		if (a.hits < b.hits) {
			return 1;
		}
		if (a.hits > b.hits) {
			return -1;
		}
		return 0;
	});

	for (var i = 0; i < 5; i++) {
		topList.innerHTML += '<div class="group-item"><a href="' + value[i].shortUrl + '" target="_blank">' + value[i].shortUrl + '</a><span>' + value[i].hits + '</span></div>';
	}
}

topFiveList(jsonUrls);
