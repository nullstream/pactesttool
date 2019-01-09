import socket,ipaddress
from flask import Flask, request, render_template

HTTP_400_BAD_REQUEST=400
HTTP_200_OK=200

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("lookup.html")

@app.route('/favicon.ico')
def send_favicon():
    return "",HTTP_200_OK

@app.route('/static/<path:filename>')
def send_static(filename):
    return Flask.send_from_directory('./static',filename)

@app.route('/host/<string:name>/')
def resolveHost(name):
    response = HTTP_200_OK
    try:
        result =  socket.gethostbyname(name)
    except socket.gaierror as error:
        result = "Cannot resolve host: %s"%error
        response = HTTP_400_BAD_REQUEST
    return result,response

@app.route('/in_subnet/<string:ip>/<string:network>/<string:mask>')
def ip_in_subnet(ip,network,mask):
    response = HTTP_200_OK
    try:
        result =  ipaddress.ip_address(ip) in ipaddress.ip_network(("%s/%s"%(network,mask)));
    except ValueError as error:
        result = "Cannot parse address: %s"%error
        response = HTTP_400_BAD_REQUEST
    return "%s"%result,response
 
app.run(port=1234,debug=True)
