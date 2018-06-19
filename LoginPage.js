//Global Variables
var username;
var password;
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

function loginSuccess(data) {
  jwt = data;
  localStorage.setItem('jwt',jwt);
  username = $('input#user').val();
  $.getJSON('http://cmsc106.net/Blog/api/blog?user='+username, getBlog);
}
  
function getBlog(data) {
  Id = data.idblog;
  localStorage.setItem('myTitle', data.title);		
  loginCallback(Id);
}

function loginHandler() {
  username = $('input#user').val();
  password = $('input#password').val();
  confirmpassword = $('input#confirmpassword').val();
  var userObject = {user:username,password:password};
  $.postJSON('http://cmsc106.net/Blog/api/blog/login',userObject,loginSuccess);
  
}

function setupButtons(){
	$('button#login').on('click', loginHandler);
	// Fetch the user name and password back from localStorage
	var user = localStorage.getItem('username');
	if(user) {
	// Log in here
	}
}

function loginCallback(Id) {
	if(Id != 0){
		localStorage.setItem('myId',Id);
		// Store the username for future use
		localStorage.setItem('myUsername', $('#user').val());
		localStorage.setItem('myPassword', $('#password').val());
		// If the account exists, open a new page
		window.location.href = "Home.html#" + Id;
	}
	else {}
}

$(document).ready(setupButtons);