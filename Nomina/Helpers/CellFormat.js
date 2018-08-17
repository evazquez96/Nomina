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
    var div = document.createElement("div");
    div.innerHTML = data;
    div.style.setProperty("text-align", "center", "important");
    return div;
}


function formatoDivTotal(data,td, bandera) {
    var div = document.createElement('div');
    div.className = "renderedCell";
    div.innerHTML = data;
    div.style.setProperty("text-align", "center", "important");
    if (bandera == true)
        td.style.setProperty("background-color", "#9ACD32", "important");//Color para los Gravados
    else
        td.style.setProperty("background-color", "YELLOW", "important");//Color para los Exentos
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