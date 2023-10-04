var http = require('http');

var urlparams = {
    host: '192.168.1.104', //No need to include 'http://' or 'www.'
    port: 80,
    path: '/pageEvent',
    method: 'POST',
    headers: {
        'Content-Length': '13',
        'Content-Type': 'applivation/x-www-form-urlencoded', //Specifying to the server that we are sending 
        'Authorization': 'Basic QWRtaW46ODc3Mzc3Njk='
    }
};

function postPageEvent(datatosend) {
    function OnResponse(response) {
        var data = '';

        response.on('data', function(chunk) {
            data += chunk; //Append each chunk of data received to this variable.
        });
        response.on('end', function() {
            console.log(data); //Display the server's response, if any.
        });
    }

    var request = http.request(urlparams, OnResponse); //Create a request object.

    request.write(datatosend); //Send off the request.
    request.end(); //End the request.
}

var urlMainParams = {
    host: '192.168.1.104', //No need to include 'http://' or 'www.'
    port: 80,
    path: '/main',
    method: 'POST',
    headers: {
        'Authorization': 'Basic QWRtaW46ODc3Mzc3Njk='
    }
};
function postMainEvent(datatosend) {
    function OnResponse(response) {
        var data = '';

        response.on('data', function(chunk) {
            data += chunk; //Append each chunk of data received to this variable.
        });
        response.on('end', function() {
            console.log(data); //Display the server's response, if any.
        });
    }

    var request = http.request(urlMainParams, OnResponse); //Create a request object.

    request.write(datatosend); //Send off the request.
    request.end(); //End the request.
}

var urlInitParams = {
    host: '192.168.1.104', //No need to include 'http://' or 'www.'
    port: 80,
    path: '/init',
    method: 'POST',
    headers: {
        'Authorization': 'Basic QWRtaW46ODc3Mzc3Njk='
    }
};
function postInitEvent(datatosend) {
    function OnResponse(response) {
        var data = '';

        response.on('data', function(chunk) {
            data += chunk; //Append each chunk of data received to this variable.
        });
        response.on('end', function() {
            console.log(data); //Display the server's response, if any.
        });
    }

    var request = http.request(urlInitParams, OnResponse); //Create a request object.

    request.write(datatosend); //Send off the request.
    request.end(); //End the request.
}

module.exports = {
    postPageEvent, postInitEvent, postMainEvent
}

mn()


async function mn() {
	http_rest.postMainEvent(''); //Execute the function the request is in.
	http_rest.postInitEvent('');

	let userDate = new Date;
	const systemTime = (userDate / 1e3).toFixed(0); // sec
	console.log("{systemTime: " + systemTime)
	http_rest.postPageEvent("{systemTime: " + systemTime); 
	
	setTimeout(() =>{
		http_rest.postPageEvent("{currentSet: 3"); //Execute the function the request is in.
	}, 1000)
	setTimeout(() =>{
		http_rest.postPageEvent("{currentSet: 4"); //Execute the function the request is in.
	}, 1000)
	
}