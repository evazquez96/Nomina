function centerText(div) {
    div.style.setProperty("display", "flex", "important");
    div.style.setProperty("justify-content", "center", "important");
    div.style.setProperty("align-items", "center", "important");
}

function formatoDivTotal(data,td, bandera) {
    var div = document.createElement('div');
    div.className = "renderedCell";
    div.innerHTML = data;
    if (bandera == true)
        td.style.setProperty("background-color", "#9ACD32", "important");//Color para los Gravados
    else
        td.style.setProperty("background-color", "YELLOW", "important");//Color para los Exentos
    return div;
}