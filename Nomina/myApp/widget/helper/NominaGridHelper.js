define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    "dojo/dom-style",
    "dojo/domReady!"
], function (
    declare,
    lang,
    domStyle,
    ) {

    return {

        centrarContenido: function (value) {
            var div = document.createElement("div");
            div.innerHTML = value;
            div.style.setProperty("text-align", "center", "important");
            return div;
        },

        formatoMontoColumn: function (column) {

            column.renderCell = function (object, value, cell, options, headers) {
                //console.log("Column field:" + column.field)//Utilizar el Column.field para hacer las validaciones y limpiar la cadena que verifica si es válida.
                isValid = concatenarError(object, value, 0, column.field);//Se manda un 0 que corresponde a una celda de monto.
                div = formatoCentrarContenido(value)

                if (isValid) {
                    /**
                     * Se tiene que limpiar el valor. Y actualizar la cadena para quitar
                     * el valor invalido.
                     * */
                    var old = object.isValid.codError;
                    /**
                     * Obtiene la cadena con el código anterior, si es válido el valor
                     * entonces debe de eliminar la subcadena |nombre .
                     * **/
                    var eliminar = "|" + column.field;//Concatena la cadena a eliminar con el | 

                    var nueva = old.replace(eliminar, "");
                    //La nueva cadena de error sera, eliminando de la cadena vieja la subcadena llamada eliminar.

                    if (nueva == "")
                        object.isValid.bandera = true;//Implica que ya no se tiene error

                    object.isValid.codError = nueva;
                    //console.log("Error anterior: " + old);
                    //console.log("Error actual: " + nueva);

                    //Object { bandera: true, codError: "" }
                    //debugger;
                }
                else {
                    domStyle.set(div, "background-color", "red");
                    /***
                     * Cambia el color a rojo del div, indicando que se tiene un 
                     * error en el valor del grid.
                     ***/
                }
                return div;
            }
            column.renderHeaderCell = function (node) {
                var div = document.createElement('div');
                div.innerHTML = column.label;
                domStyle.set(div, "text-align", "center");
                domStyle.set(div, "background-color", "#5A748F");
                domStyle.set(div, "width", "100%");
                domStyle.set(div, "height", "100%");
                domStyle.set(div, "color", "white");
                domStyle.set(div, "font-weight", "bold");
                domStyle.set(div, "font-family", "Geneva, Arial, Helvetica, sans-serif");
                domStyle.set(div, "padding-top", "20px");

                return div;
            }
            return column;
        },

        formatoColumn:function (column) {
            column.renderCell = function (object, value, cell, options, headers) {
                return formatoCentrarContenido(value);
            }
            column.renderHeaderCell = function (node) {
                var div = document.createElement('div');
                div.innerHTML = column.label;
                domStyle.set(div, "text-align", "center");
                domStyle.set(div, "background-color", "#5A748F");
                domStyle.set(div, "width", "100%");
                domStyle.set(div, "height", "100%");
                domStyle.set(div, "color", "white");
                domStyle.set(div, "font-weight", "bold");
                domStyle.set(div, "font-family", "Geneva, Arial, Helvetica, sans-serif");
                domStyle.set(div, "padding-top", "20px");

                return div;
            }
            return column;
        }


    }

    });