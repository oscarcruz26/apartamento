var valor= "";
var pagina;
var ipControl = "http://192.168.3.109";//192.168.3.102
let cadena = [];
//los botones se ven mas grandes al paso del mouse con jquery
$(document).ready(function(){
    $("button").hover(function(){
        $(this).addClass("grande");
    },function(){
        $(this).removeClass("grande")
    });
});

//recibe el numero del boton pulsado y lo va mostrando como numero de canal antes de pulsar ir
function boton(digito){
     var numero = document.getElementById("numerocanal");
     valor = valor + digito;
     numero.value = valor;
}

//abre una pastaña adicional con la ip del esp8266 y envia los comandos IR, despues de 200 milisegundos la cierra
function ejecutar(comando){
    pagina = window.open(ipControl+comando);
   setTimeout(cerrarVentanas, 200);
}

function cerrarVentanas() {
    pagina.close();
}
//funcion no utilizada con la nueva programacion del esp8266 y el arduino
/*function canal() {
    pagina = window.open(ipControl+"/="+valor);
    setTimeout(cerrarVentanas, 200);
    valor= "";
}*/
//envia los codigos de cada digito del canal seleccionado y los separa con coma en la url
function canal(){
    for (var i = 0; i < valor.length; i++) {
        if (valor[i] == "1") {
            cadena[i] = "$NEC&3782901887?32";        
        }else if (valor[i] == "2") {
            cadena[i] = "$NEC&3782885567?32"; 
        }else if (valor[i] == "3") {
            cadena[i] = "$NEC&3782918207?32"; 
        }else if (valor[i] == "4") {
            cadena[i] = "$NEC&3782877407?32"; 
        }else if (valor[i] == "5") {
            cadena[i] = "$NEC&3782910047?32"; 
        }else if (valor[i] == "6") {
            cadena[i] = "$NEC&3782893727?32"; 
        }else if (valor[i] == "7") {
            cadena[i] = "$NEC&3782926367?32"; 
        }else if (valor[i] == "8") {
            cadena[i] = "$NEC&3782873327?32"; 
        }else if (valor[i] == "9") {
            cadena[i] = "$NEC&3782905967?32"; 
        }else if (valor[i] == "0") {
            cadena[i] = "$NEC&3782869247?32"; 
        }
    }
    pagina = window.open(ipControl+"/"+cadena+",");
    setTimeout(cerrarVentanas, 200);
    cadena.shift();//borra la cadena despues de usarla
    valor = "";
}
