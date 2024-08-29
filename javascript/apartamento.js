var luz,ipControl,accion,lectura;
var urlescritura,urllectura;
var estadoOscar,estadoAlba,estadoSala
var objetojs;
$(document).ready(function(){
    $("button").hover(function(){
        $(this).addClass("grande");
    },function(){
        $(this).removeClass("grande")
    });
    mostrarEstado(1873264,'IRGVIGA8WSXXEMOW');
});

function conmutar(channel,readAPIKey,writeAPIKey,field) {
	//url para lectura de json "https://api.thingspeak.com/channels/1873264/fields/1,2,3.json?api_key=IRGVIGA8WSXXEMOW&results=50";
	//url para escritura de json "https://api.thingspeak.com/update?api_key=QG1H40ZLLQ8XG9ZF&field1="
	urllectura = "https://api.thingspeak.com/channels/" + channel + "/fields/1,2,3.json?api_key=" + readAPIKey + "&results=99";
	urlescritura = "https://api.thingspeak.com/update?api_key=" + writeAPIKey + "&field" + field + "=";
	//fetch(urllectura).then(response => response.json()).then(data => console.log(data));
	fetch(urllectura).then(
			function(response){
				return response.json();
			}
		).then(
			function(data){
				//console.log(data.channel.last_entry_id)
				var i = 98;
					if (field == 1) {
						while(data.feeds[i].field1 == null){
							i--;
						}
						lectura = data.feeds[i].field1;
					}
					else if (field == 2) {
						while(data.feeds[i].field2 == null){
							i--;
						}
						lectura = data.feeds[i].field2;
					}else if (field == 3) {
						while(data.feeds[i].field3 == null){
							i--;
						}
						lectura = data.feeds[i].field3;
					}
				if(lectura == 0){
					urlescritura = urlescritura + "1";
					luz = window.open(urlescritura);
				}else if(lectura == 1){
					urlescritura = urlescritura + "0";
					luz = window.open(urlescritura);
				}else{
					alert("intente de nuevo.")
				}
				//console.log(urllectura,urlescritura,lectura);
				setTimeout(cerrarVentanas,300);
				for (var a = 0;a < 5;a++) {
					setInterval(mostrarEstado,3000,channel,readAPIKey);
				}
			}
		);
}

function mostrarEstado(channel,readAPIKey) {
	urllectura = "https://api.thingspeak.com/channels/" + channel + "/fields/1,2,3.json?api_key=" + readAPIKey + "&results=99";
	var lamparaOscar = document.getElementById("oscar");
	var lamparaAlba = document.getElementById("alba");
	var lamparaSala = document.getElementById("sala");
	fetch(urllectura).then(
			function(response){
				return response.json();
			}
		).then(
			function(data){
				//console.log(data.channel.last_entry_id)
				var i = 98;
				while(data.feeds[i].field1 == null){
					i--;
				}
				estadoOscar = data.feeds[i].field1;
				i = 98;
				while(data.feeds[i].field2 == null){
					i--;
				}
				estadoAlba = data.feeds[i].field2;
				i = 98;
				while(data.feeds[i].field3 == null){
					i--;
				}
				estadoSala = data.feeds[i].field3;
				if (estadoOscar == 1) {
					lamparaOscar.className = "amarillo";
				}else{
					lamparaOscar.className = "";
				}
				if (estadoAlba == 1) {
					lamparaAlba.className = "amarillo";
				}else{
					lamparaAlba.className = "";
				}
				if (estadoSala == 1) {
					lamparaSala.className = "amarillo";
				}else{
					lamparaSala.className = "";
				}
				//console.log(channel,readAPIKey,estadoOscar,estadoAlba,estadoSala);							
			}
		);
}

function cerrarVentanas() {
	luz.close();
}

function irAPagina(pagina) {
	ipControl = window.open(pagina);
}