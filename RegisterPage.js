//Global Variables
var username;
var password;
var confirmpassword;
var bio;
var title;
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

function registerSuccess(data) {
	Id = data;
	registerCallback(Id);
}

function registerHandler(){
	username = $('input#user').val();
	password = $('input#password').val();
	confirmpassword = $('input#confirmpassword').val();
	bio = $('textarea#bio').val();
	title = $('input#title').val();
	var userObject = {user:username,password:password,title:title,bio:bio,tag:"jerryrocks"};
	$.postJSON('http://cmsc106.net/Blog/api/blog', userObject, registerSuccess);

}

function setupButtons(){
	$('button#register').on('click', registerHandler);
}

function registerCallback(Id) {
	if(Id != 0){
		localStorage.setItem('id',Id);
		// Store the username for future use
		localStorage.setItem('username', $('#user').val());
		localStorage.setItem('password', $('#password').val());
		localStorage.setItem('bio', $('#bio').val());
		localStorage.setItem('title', $('#title').val());
		// If the account exists, open a new page
		window.location.href = "LoginPage.html#" + Id;
	}
	else {}
}

$(document).ready(setupButtons);