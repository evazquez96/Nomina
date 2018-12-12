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

            //standby:null,

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


                on(this.btnCargaWidget, 'click', lang.hitch(this, function () {
                    this.cargarNomina();
                }));
                    /* function () {
                    context.cargarNomina();
                }*/

            },
            fillGrid: function (value) {

                var nominaStore = new Memory({
                    data: value,
                    //id: ['NumEmpleado', 'Fecha'].join("#")
                    idProperty: 'identifier'
                });
                /**
                 * Función que se encargara de crear el Grid.
                 **/
                
                nominaStore.forEach(function (object) {
                    object.isValid = { bandera: true, codError: "" };
                    /**Se agrega el item que servira como bandera de errores.**/
                })
                this.grid.set('collection', nominaStore);
                this.grid.renderArray(value);
                this.grid.refresh();

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
                this.standby.set("color", "RED");
                
                this.standby.show();
                when(deferred,
                    lang.hitch(this, function (value) {
                        //debugger;
                        if (value == null) {
                            //debugger
                            this.standby.set("color", "red");
                            this.standby.set("text", "Error al cargar ...");
                            setTimeout( lang.hitch(this,function () {
                                
                                this.standby.hide();
                                // Call it
                                //context.isStateChanged();
                                alert("Error al cargar ...");
                            }), 5000);
                            /**
                             * Indica que hubo un error al leer la hoja de sheets.
                             * **/
                            
                            //alert("La Hoja de sheets no es válida");
                        }
                        else {
                            //debugger;
                           
                            /**
                             * La promesa se cumplira hasta que se tenga la
                             * respuesta de consumir la hoja de GOOGLE SHEETS.
                             * **/
                            this.fillGrid(value);  
                            /**
                             * La función createGrid sera la encargada de llenar el grid
                             * de acuerdo al JSON 
                             */
                             this.standby.hide();
                        }

                    }),
                    lang.hitch(this, function (error) {
                        this.standby.hide();
                        alert("Error en el formato");
                    }));
                console.log("Se enviara el link: "+url);
            },
            _setWidgetCSS: function () {
                domStyle.set(this.txtLinkWidget.domNode, "width", "70%");
            }
        });
        parser.parse();
    });