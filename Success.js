function successHandler(){
	window.location.href = "Home.html";
}

function setUpButtons(){
	$('#viewBlog').on('click',successHandler);
}

$(document).ready(setUpButtons);