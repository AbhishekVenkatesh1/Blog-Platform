var postId;
var comment;
var handle;
var jwt;
var commentId;
var isOwner;
  
jQuery["postJSON"] = function(url,data,callback) {
  var options = {
    url:url,
    type:'POST',
    data:JSON.stringify(data),
    contentType:'application/json',
    dataType:'json',
    success: callback
  };
  // If a JWT is present, add it to the request as an Authorization header
  if(jwt) options.beforeSend = function(xhr){xhr.setRequestHeader('Authorization','Bearer '+jwt);};
  $.ajax(options);
};

function getPostHandler(){
	$.getJSON('http://cmsc106.net/Blog/api/post/'+postId, makePostHandler);
}

function makePostHandler(data){
	var topic = data.topic;
	var content = data.content;
	var newDiv = $('<div>');
	var newH3 = $('<h3>').text(topic);
	var newP = $('<p>').text(content);
	newDiv.append(newH3);
	newDiv.append(newP);
	$('div#showPosts').append(newDiv);
}

function blogTitle(){
	var title = localStorage.getItem('postTitle');
	$('.blogTitle').text(title);
}

function commentHandler(){
	$('div#commentArea').toggle();
}

function typeComment(){
	handle = localStorage.getItem('myUsername');
	comment	= $('textarea#commentText').val();
	var userObject = {post:postId,handle:handle,comment:comment}
	$.postJSON('http://cmsc106.net/Blog/api/comment',userObject,refresh);
}

function run(){
	$.getJSON('http://cmsc106.net/Blog/api/comment?post='+postId,commentSuccess);
}

function commentSuccess(data){
	for(n = 0;n<data.length;n++){
		var newDiv = $('<div>').addClass("well");
		var newHandle = $('<h4>').text(data[n].handle);
		var newComment = $('<p>').text(data[n].comment);
		var idcomment = data[n].idcomment;
		if(isOwner) {
			var newButton = $('<button>').addClass('btn btn-warning').text("Delete Comment").on('click', function () {
				deleteComment(idcomment);
			});
		}
		newDiv.append(newHandle);
		newDiv.append(newComment);
		newDiv.append(newButton);
		$('div#comments').append(newDiv);
	}
}

async function deleteComment(commentId){
	var options = {
    	url:'http://cmsc106.net/Blog/api/comment/'+commentId,
	    type:'DELETE',
    	beforeSend:function(xhr){xhr.setRequestHeader('Authorization','Bearer '+jwt)}
    };
	$.ajax(options);
	await sleep(250);
	window.location.reload();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function refresh(){
	window.location.reload();
}

function backToHome(){
	window.location.href = "Home.html";
}

function logout(){
	window.location.href = "FirstPage.html";
}

async function deletePost(){
	var options = {
    	url:'http://cmsc106.net/Blog/api/post/'+postId,
	    type:'DELETE',
    	beforeSend:function(xhr){xhr.setRequestHeader('Authorization','Bearer '+jwt)}
    };
	$.ajax(options);
	await sleep(250);
	window.location.href = "Home.html";
}

function getIsOwner(){
	$.getJSON('http://cmsc106.net/Blog/api/post/'+postId, getIsOwnerCallback);
}

function getIsOwnerCallback(data){
	if(data.blog == localStorage.getItem('myId')){
		isOwner = true;
		$('button#deletePost').on('click',deletePost);
	} else {
		isOwner = false;
		$('button#deletePost').hide();
	}
}

function setUpButtons(){
	var parts = window.location.href.split('#');
	postId = parts[1];
	getIsOwner();
	$('button#logout').on('click', logout);
	$('button#createComment').on('click',commentHandler);
	$('button#backToHome').on('click',backToHome);
	$('button#postComment').on('click',typeComment);
	$('div#commentArea').hide();
	jwt = localStorage.getItem('jwt');
	blogTitle();
	getPostHandler();
	run();
}

$(document).ready(setUpButtons);