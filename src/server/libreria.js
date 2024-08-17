import $ from "jquery";

"use strict";

const urlBase = "http://localhost:8000/";

export function inviaRichiesta(method, url, parameters={}) {

	let config = {
        url : urlBase + url,
		data : parameters,
		type : method,   
		dataType: 'json',
		xhrFields: {withCredentials: true}
    }

	if(parameters instanceof FormData){
		config["processData"] = false;
		config["contentType"] = false;
	}

    return $.ajax(config);	
}


export function errore(err) {
	// if(!err.response) 
	// 	alert("Connection Refused or Server timeout");	
	// else if (err.response.status == 200)
    //     alert("Formato dei dati non corretto : " + err.response.data);
	// else if(err.response.status == 403){
	// 	//alert(err.response.data);
	// 	//window.location.href="login.html";
	// 	alert("Utente non autorizzato");
	// }
    // else{
    //     alert("Server Error: " + err.response.status + " - " + err.response.data);
	// }
}

