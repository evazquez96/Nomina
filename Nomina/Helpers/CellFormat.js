function centerText(div) {
    div.style.setProperty("display", "flex", "important");
    div.style.setProperty("justify-content", "center", "important");
    div.style.setProperty("align-items", "center", "important");
}

function formatoCeldasVacias(td) {
    var div = document.createElement('div');
    div.className = "renderedCell";
    td.style.setProperty("background-color", "#e2d8e4", "important");
    return div;
}

function formatoCentrarContenido(data) {
    var div = document.createElement("div");//Crea un nuevo div donde se insertara el valor leído.
    div.innerHTML = data;//Inserta el valor de la celda dentro del div.
    div.style.setProperty("text-align", "center", "important");//Centra el contendio del div.
    div.style.setProperty("height", "100%", "important");//Cambia la altura del div al 100%.
    div.style.setProperty("width", "106%", "important");//Cambia el ancho del div a 106% para que sea más grande el relleno.
    return div;//Regresa el div creado anteriormente.
}

function validarCellFormat(object, value, cell, options, headers,column) {
    var o = object;
    var v = value;
    var c = cell;
    var op = options;
    var col = column;
    var h = headers;
}


function formatoDivTotal(data,td) {
    var div = document.createElement('div');
    div.className = "renderedCell";
    div.innerHTML = data;
    div.style.setProperty("text-align", "center", "important");
    return div;
}

function formatoHeader(node, bandera,text,domStyle) {
    var div = document.createElement("div");
    div.innerHTML = text;
    domStyle.set(div, "text-align", "center");
    domStyle.set(div, "font-size", "70%");

    switch (bandera) {
        case 1://Headers para Pago
            break;
        case 2:
            break;
        default:
            break;
    }
    return div;
}