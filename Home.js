var Id;

function getBlog(){
	var blogid = localStorage.getItem('myId');
	$.getJSON('http://cmsc106.net/Blog/api/post?blog='+blogid,getPostHandler);
}

function getPostHandler(data){
	for(var n=0; n<data.length; n++){
		$.getJSON('http://cmsc106.net/Blog/api/post/'+data[n].post, makePostHandler);
	}
}

function makePostHandler(data){
	var topic = data.topic;
	var content = data.content;
	var newDiv = $('<div>');
	var newH3 = $('<h3>');
	var newA = $('<a>').text(topic).attr('href','ShowPost.html#'+data.idpost);
	newH3.append(newA);
	newDiv.append(newH3);
	$('div#showPosts').append(newDiv);
}

function viewOtherBlogs(){
	window.location.href = "ViewBlogs.html";
}

function blogDetails(){
	$('.blogTitle').text(localStorage.getItem('myTitle'));
	$('#bio').text(localStorage.getItem('bio'));
}

function createPost(){
	window.location.href = "CreateAPost.html";
}

function logout(){
	window.location.href = "FirstPage.html";
}

function setUpButtons(){
	$('button#createPost').on('click',createPost);
	$('button#logout').on('click', logout);
	$('button#viewOtherBlogs').on('click', viewOtherBlogs);
	blogDetails();
	getBlog();
}

$(document).ready(setUpButtons);
