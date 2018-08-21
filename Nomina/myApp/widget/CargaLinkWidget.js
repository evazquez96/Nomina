define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dijit/form/TextBox",
    "dijit/form/Button",
    "dijit/Dialog",//Dialog que mostrar los registros que tienen errores.
    "dojo/text!/myApp/widget/templates/CargaLinkWidget.html",
    "dojo/on",
    "dojo/parser",
    "dojo/dom-style",
    "dojo/request",
    "dojo/when",
    "dojo/Deferred",
    "dstore/Memory",
    "dgrid/OnDemandGrid",
    "dgrid/ColumnSet",
    "dgrid/extensions/DijitRegistry"
    ],
    function (
        declare,
        lang,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        ContentPane,
        TextBox,
        Button,
        Dialog,
        template,
        on,
        parser,
        domStyle,
        request,
        when,
        Deferred,
        Memory,
        OnDemandGrid,
        ColumnSet,
        DijitRegistry
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

            constructor: function (arguments) {
                lang.mixin(this, arguments);
                /**
                La línea anterior permite manipular los objetos que se
                pasan como argumentos en el constructo.
                */
            },

            getNomina: function () {
                return this.deferred.promise
            },

            templateString: template,

            postCreate: function () {
                var domNode = this.domNode;
                this.inherited(arguments);
                this._setWidgetCSS();

                var context = this;

                on(this.btnCargaWidget, 'click', function () {
                    context.cargarNomina();
                });

            },
            createGrid: function (value) {

                var nomina = [
                    { NumEmpleado: 1, Nombre: " Jesus Eduardo Vazquez Martinez", Antiguedad: 22, Fecha: "2018/03/09", FechaI: "2018/02/23" },
                    { NumEmpleado: 2, Nombre: " Cruz Mondragon Diego", Antiguedad: 23, Fecha: "2018/04/09", FechaI: "2018/02/23" },
                    { NumEmpleado: 3, Nombre: " Juan Orihuela", Antiguedad: 23, Fecha: "2018/04/09", FechaI: "2018/02/23" }
                ];
                var nominaStore = new Memory({ data: value, idProperty: 'NumEmpleado' });
                /**
                 * Función que se encargara de crear el Grid.
                 **/
                this.grid.set('collection', nominaStore);
                this.grid.renderArray(value);

            }
            ,
            _getSpreadSheetId: function () {
                /*
                 * Obtiene el SpreadSheetId que corresponde
                 * a la Google Sheet.
                 */
                var url=this.txtLinkWidget.value;
                var token = url.split("/");
                //console.log(token[5]);
                return token[5];
            },
            cargarNomina: function () {
                
                var SpreadSheetId = this._getSpreadSheetId();
                var url = "nomina/"+SpreadSheetId;

                var deferred=request.get(url, {
                    handleAs: "json"
                });
                var context = this;
                when(deferred, function (value) {
                    
                    //console.log(context.grid);
                    dialog = new Dialog({
                        title: "Registros con errores",
                        content: "Test content.",
                        style: "width: 300px"
                    });
                    dialog.show();
                });
                console.log("Se enviara el link: "+url);
            },
            _setWidgetCSS: function () {
                domStyle.set(this.txtLinkWidget.domNode, "width", "70%");
            }
        });
        parser.parse();
    });