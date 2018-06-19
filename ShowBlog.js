function logout(){
	window.location.href = "FirstPage.html";
}

function backToHome(){
	window.location.href = "Home.html";
}

function getTitleHandler(){
	var getTitle = localStorage.getItem('title');
	$('.blogTitle').text(getTitle);
}


function getPosts(){
	$.getJSON('http://cmsc106.net/Blog/api/post?blog='+blogId,getPostHandler);
}

function getPostHandler(data){
	for(var n=0; n<data.length; n++){
		$.getJSON('http://cmsc106.net/Blog/api/post/'+data[n].post, getPostsCallback);
	}
}


function getPostsCallback(data){
	var newDiv = $('<div>');
		var newH3 = $('<h3>');
		var newA = $('<a>').text(data.topic).attr('href','ShowPost.html#'+data.idpost);
		newA.on('click',setTitle);
		newH3.append(newA);
		newDiv.append(newH3);
		$('div#posts').append(newDiv);
}


function setTitle() {
	localStorage.setItem('postTitle',$(this).text());
}

function setUpButtons(){
	$('button#logout').on('click', logout);
	$('button#backToHome').on('click', backToHome);	
	var parts = window.location.href.split('#');
	blogId = parts[1];
	getTitleHandler();
	getPosts();
}

$(document).ready(setUpButtons);