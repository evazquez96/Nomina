function validarAntiguedad(text) {
    return true;
}

function pintarError(td) {
    td.style.setProperty("background-color", "red", "important");
};

function limpiarCadenaMontos(monto) {
    var d = monto.replace(",", "");
    d = d.replace(" ", "");
    return d;
}

function validarMontos(monto) {
    //var d = limpiarCadenaMontos(monto);
    /**Las líneas anteriores limpian la cadena de espacios en blanco y ,**/
    var aux = Math.sign(monto);
    return aux == -1 || aux == -0 ? false : true;
    //return monto > 0 ? true : false;
}

function validarCampo(columna,td, data) {
    /**
     * td es table data en este caso es la celda que se edito.
     **/
    var rango;
    if (columna >= 9 && columna <=91)
        rango = 0;
    switch (rango) {
        case 0:
            /**Si entra en el case 0 indica que se tiene que validar un Monto*/
            if (!validarMontos(data))
                pintarError(td);
            break;
        default:
            break;
    }
}