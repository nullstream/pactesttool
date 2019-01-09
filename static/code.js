function httpGetAsync(url,callback) {
	var xmlHTTP = new XMLHttpRequest();
	xmlHTTP.onreadystatechange = function() {
		if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
			callback(xmlHTTP.responseText);
		}
	} 
	xmlHTTP.open("GET",url,true);
	xmlHTTP.send(null);
}

var getLocation = function(href) {
	var result = document.createElement("a");
	result.href = href;
	return result;
};
