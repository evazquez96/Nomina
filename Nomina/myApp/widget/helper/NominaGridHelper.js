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
                }
                else {
                    domStyle.set(div, "background-color", "red");
                }
                return div;
            }
            column.renderHeaderCell = function (node) {
                var div = document.createElement('div');
                div.innerHTML = column.label;
                domStyle.set(div, "text-align", "center");
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
                return div;
            }
            return column;
        }


    }

    });