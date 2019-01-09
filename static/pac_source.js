// Implements many of https://findproxyforurl.com/pac-functions/
// Original implementation obtained from: https://app.thorsen.pm/proxyforurl by Jan Henning Thorsen
(function(window) {
  var pac = function() {};
  var proto = pac.prototype;
  var pacFunctions = [
    'alert',
    'dateRange',
    'dnsDomainIs',
    'dnsDomainLevels',
    'dnsResolve',
    'isInNet',
    'isPlainHostName',
    'isResolvable',
    'localHostOrDomainIs',
    'myIpAddress',
    'shExpMatch',
    'timeRange',
    'weekdayRange'
  ];

  var TODO = function() { console.log("Function not implemented yet."); return true; }

  proto.test = function(_code, url, host) {
    var i, re, code = _code.replace(/\bFindProxyForURL\b/, '');

    for (i = 0; i < pacFunctions.length; i++) {
      re = new RegExp('\\b' + pacFunctions[i] + '\\s*\\(', 'g');
      code = code.replace(re, 'this.' + pacFunctions[i] + '(');
    }

    code = code.replace(/\b(new\s|document\.|window\.|cookie\b)/, 'ILLEGAL');
    code = eval('(' + code + ');');

	console.log("FindProxyForURL("+url+","+host+")")
    result = code.call(this, url, host);
	return result;
  };

  proto.alert = function(str) {
	console.log("alert("+str+")")
    alert(str);
  };

  proto.dateRange = TODO;

  proto.dnsDomainIs = function(host, domain) {
    result = host.length >= domain.length && host.substring(host.length - domain.length) == domain;
	console.log("dnsDomainIs("+host+","+domain+"):"+result)
	return result
  };

  proto.dnsDomainLevels = function(host) {
    var m = host.match(/\./g);
    result = m ? m.length - 1 : 0;
	console.log("dnsDomainLevels("+host+"):"+result)
	return result
  };

  proto.dnsResolve = function(host) {
    var xhr = new XMLHttpRequest();
	result = false;
	console.log("dnsResolve("+host+")");
	console.log("\tRequesting DNS resolution of: ",host)
    xhr.open('GET', '/host/' + host, false);
    xhr.send(null);
	console.log("\tResult: "+xhr.responseText)
    //if(xhr.status == 200) 
	//	result = parseInt(xhr.responseText) ? true : false;
  	return xhr.responseText
  };

  proto.isInNet = function(ip, net, mask) {
    var xhr = new XMLHttpRequest();
	console.log("isInNet("+ip+","+net+","+mask+")")
	console.log("\tResolving if "+ip+" is in "+net+"/"+mask+".")
    xhr.open('GET', "/in_subnet/"+ip+"/"+net+"/"+mask, false);
    xhr.send(null);
	console.log("\tResult: "+xhr.responseText)
  	return xhr.responseText
  };

  proto.isResolvable = function(host) {
	console.log("Invoking dnsresolve("+host+")")
    result = dnsResolve(host) ? true : false;
	console.log("Result: dnsresolve("+host+")",result)
    return result
  }

  proto.isPlainHostName = function(str) {
    result = str.match(/\./) ? false : true;
	console.log("isPlainHostName("+str+"):",result)
    return result
  };

  proto.localHostOrDomainIs = function(host, str) {
    result = str.match(/^\./) ? dnsDomainIs(host, str) : host == str ? true : host == host.split('.')[0];
	console.log("localHostOrDomainIs("+str+"):"+result)
    return result
  };

  proto.myIpAddress = function() {
	ip = '192.168.3.14';
	console.log("myIpAddress():"+ip)
    return ip;
  };

  proto.shExpMatch = function(str, re) {
    result = str.match(new RegExp(re.replace(/\*/, '.*?'), 'i'));
	console.log("shExpMatch("+str+","+re+"):"+result)
    return result
  };

  proto.timeRange = TODO;
  proto.weekdayRange = TODO;

  window.Pac = pac;
})(window);
