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
                console.log("Column field:" + column.field)
                concatenarError(object, value, 0, column.field);//Se manda un 0 que corresponde a una celda de monto.
                return formatoCentrarContenido(value);
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