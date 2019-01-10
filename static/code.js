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

function show_ui_alert(message,alerttype) {
    $('#alert_placeholder').append('<div id="alerts" class="alert ' +  alerttype + '"><a class="close" data-dismiss="alert">x</a><span>'+message+'</span></div>')
    setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
      $("#alertdiv").remove();
    }, 5000);
}
