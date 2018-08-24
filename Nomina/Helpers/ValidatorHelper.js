function validarCelda(value, bandera) {

    var pattern = null;
    var match = null;
    var regex = "";

    switch (bandera)
    {
        /**
         * La bandera que se pase como parametro sera la que
         * indice que tipo de celda es, esto es para validarla
         * con la expresión regular correspondiente.
         ***/
        case 0:
            /**Entra para validar celdas que corresponden a montos.**/
            regex = "(^[0-9]+(\.[0-9]{1,3}))?";
            break;
        case 1:
            break;
        case 2:
            break;

        default:
            break;
    }
    pattern = new RegExp(regex);
    match = pattern.exec(value);
    var coincidencia = match[0];//La primer coincidencia, en teoría solo debe de haber una coincidencia y debe ser como tal el valor de la celda.

    if (coincidencia.length == value.length)
        return true;
    else
        return false;
}

function pintarError(td) {
    td.style.setProperty("background-color", "red", "important");
};

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
