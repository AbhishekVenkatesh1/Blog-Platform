function getBlogs(){
	$.getJSON('http://cmsc106.net/Blog/api/blog/all?tag=jerryrocks',getBlogsCallback);
}

function getBlogsCallback(data){
	for(n=0;n<data.length;n++){
		var newDiv = $('<div>');
		var newH3 = $('<h3>');
		var newA = $('<a>').text(data[n].title).attr('href','ShowBlog.html#'+data[n].idblog);
		newA.on('click',setTitle);
		newH3.append(newA);
		newDiv.append(newH3);
		$('div#blogs').append(newDiv);
	}

}

function setTitle() {
	localStorage.setItem('idBlog',$);
	localStorage.setItem('title',$(this).text());
}

function logout(){
	window.location.href = "FirstPage.html";
}

function backToHome(){
	window.location.href = "Home.html";
}

function setUpButtons(){
	$('button#logout').on('click', logout);
	$('button#backToHome').on('click', backToHome);
	getBlogs();
}

$(document).ready(setUpButtons);