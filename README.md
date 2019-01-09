# pactesttool
Simple web application to test and debug Proxy Auto-Config scripts.

Tool written in python3 and requires Flask.
Running the tool is as simple as 'python pactesttool.py' and then using http://localhost:1234 in a browser.

This is not quite packaged up very well for UWSGI deployment... I guess that will come.

The tool is based on a tool https://app.thorsen.pm/proxyforurl by Jan Henning Thorsen.  

Jan's implementation was done in Perl and has some limitations relative to DNS resolution (for my particular needs/use case)... as well deployment of Perl based app was not in the cards for my need so this re-implementation is in Python and implements the simple web services for DNS resolution and subnet membership via Flask routes and the client side utilizes JavaScript and bootstrap.  The PAC class is mostly the same as Jan's implementation with additions for console debugging during PAC evaluation (which is was another need) as this tool is inteded to be used by folks that may not have a good understanding of JavaScript but need enough telemtry to know if the PAC file is working as intended or how a particular URL/Host is being evaluated.
