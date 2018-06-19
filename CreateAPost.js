var blogid;
var topic;
var content;
var jwt;
var Id;

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


function postHandler(){
	blogid = localStorage.getItem('id');
	topic = $('input#topic').val();
	content = $('textarea#content').val();
	var userObject = {blog:blogid,topic:topic,content:content};
	$.postJSON('http://cmsc106.net/Blog/api/post', userObject, postSuccess);
}

function postSuccess(data){
	Id = data;
	postCallback(Id);
}

function postCallback(Id) {
	if(Id != 0){
		localStorage.setItem('id',Id);
		// Store the username for future use
		// If the account exists, open a new page
		window.location.href = "Success.html#" + Id;
	}
	else {}
}

function setupButtons(){
	$('button#post').on('click', postHandler);
	jwt = localStorage.getItem('jwt');
}


$(document).ready(setupButtons);