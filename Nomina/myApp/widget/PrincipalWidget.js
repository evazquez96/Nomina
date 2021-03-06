﻿define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Stateful",
    "dojox/widget/Standby",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dijit/layout/BorderContainer",
    "dijit/layout/AccordionContainer",
    "myApp/widget/CargaLinkWidget.js",
    "dojo/text!/myApp/widget/templates/PrincipalWidget.html",
    "dijit/form/Button",
    "dijit/form/ValidationTextBox",
    "dijit/form/NumberTextBox",
    "dijit/form/DateTextBox",
    "dijit/form/CheckBox",
    "dojo/dom-style",
    "dojo/on",
    "dijit/Dialog",
    "myApp/widget/helper/NominaGridHelper.js",
    /**
    *Inicio de modulos para ColumnSet
    **/
    "dgrid/OnDemandGrid",
    "dgrid/ColumnSet",
    "dgrid/extensions/CompoundColumns",
    'dgrid/extensions/DijitRegistry',
    "dgrid/extensions/Pagination",
    "dgrid/Selection",
    "dgrid/Editor",
    "dojo/regexp",
    "dojo/aspect",
     /**
     *Fin de modulos para ColumnSet
     **/
    /**
     Inicio de los Modulos requeridos para el uso de memoria
    **/
    "dstore/Memory",
    /**
    *Fin de los modulos para el uso de memoria
    **/
    "dojo/parser",

    "dojo/dom-style",
    "myApp/widget/myGrid.js",
    "myApp/widget/EmpleadoValidoWidget.js",
    "dijit/Fieldset",
    "dojo/domReady!"
],
    function (
        declare,
        lang,
        Stateful,
        Standby,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        ContentPane,
        BorderContainer,
        AccordionContainer,
        CargaLinkWidget,
        template,
        Button,
        ValidationTextBox,
        NumberTextBox,
        DateTextBox,
        CheckBox,
        domStyle,
        on,
        Dialog,
        NominaGridHelper,
        /**
        *Inicio de modulos para ColumnSet
        **/
        OnDemandGrid,
        ColumnSet,
        CompoundColumns,
        DijitRegistry,
        Pagination,
        Selection,
        Editor,
        regex,
        aspect,
        /**
        *Fin de modulos para ColumnSet
        **/
        Memory,
        parser,
        domStyle,
        CustomGrid,
        EmpleadoValidoWidget
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

            templateString: template,//Indica el template de este Widget.
            name: "",
            store: null,
            grid: null,
            standby: null,
            _standbyGetter: function () { return this.standby },
            constructor: function (arguments) {
                lang.mixin(this, arguments);
                console.log("name:" + this.name);
            },

            postCreate: function () {
                var domNode = this.domNode;
                this.inherited(arguments);
                //this.createTopPane();
                //this.createGrid();

            },
            _displayRightPaneValidos: function () {
                /***
                 * Esa función sera la encargada de crear e inicilizar los objetos
                 * del panel derecho, que corresponden a Validos y no validos.
                 * **/
            },
            _displayRightPaneValidos: function () {
                /***
                 * Esa función sera la encargada de crear e inicilizar los objetos
                 * del panel derecho, que corresponden a Validos y no validos.
                 * **/
            },
            createTopPane: function () {
                var context = this;
                var cargaDeLink = new CargaLinkWidget({
                    grid: context.grid,
                    standby: context.standby
                });//Se pasara el grid 
                this.TopContentPane.addChild(cargaDeLink, 0);
                
            },
            createBottomPane: function () {
                var context = this;
                btn = new Button({
                    label:"Validar"
                });
                /**
                 * El boton anterior sera el encargado de realizar el check al grid
                 * para validar que todos los campos dentro sean validos, de acuerdo a las
                 * expresiones regulares puestas en el data-dojo-props.
                 * **/
                domStyle.set(context.BottomContentPane, "text-align", "right");
                /**
                 * Alínea el boton a la derecha del panel de abajo.
                 * **/
                on(btn, "click", function (event) {
                    if (context.grid.get("collection") == null) {
                        /**
                         * En el evento se verificara que no el grid ya
                         * se encuentre llenado cuando se de click en el 
                         * boton, de lo contrario se mostrara un DijitDialog.
                         * **/
                        console.log("error");
                        dialog = new Dialog({
                            title: "No se a cargado el formato de Nomina.",
                            content: "Cargar el link",
                            style: {
                                width: "300px"
                                
                            }
                        });
                        dialog.show();
                    } else {
                        /**Aquí se realizaran todas las validaciones de las celdas
                         * que se requieren para emitir la nomina.**/
                        //var collection = context.grid.get("collection");
                        context.grid.validarContenidoDeCeldas();

                        /***
                         * En esta función se mandara a llenar los Paneles de la derecha.
                         * ***/
                        
                        context.contentPaneValidos.resize();
                    }
                })
                context.BottomContentPane.addChild(btn);
            }
            ,
            createGrid: function () {

                this.standby = new Standby({
                    target: "borderContainer",
                    text:"Cargando ..."
                });
                document.body.appendChild(this.standby.domNode);
                //document.body.appendChild(standby.domNode);
                //standby.show();
                var context = this;
                this.grid = new CustomGrid({
                    principal: this,
                    /**Le pasamos como argumento todo el contexto actual i.e el objeto***/
                    original:null
                });
                
                this.grid.on('dgrid-datachange', function (event) {
                    var cell = event.cell;
                    var test = cell.column.renderCell;
                    context.grid.cell(event).element.style.setProperty("background-color", "red", "important");
                    cell.style.setProperty("background-color", "red", "important");
                    //Investigar el metodo refresh(cell).
                    var z = context.grid.cell(cell);
                    //console.log(event);
                    var row = context.grid.row(event);
                    var grid = context.grid;
                    console.log("Se hizo un cambio");
                    grid.save();
                    //grid.refresh();
                });
                //this.grid.styleColumn("Nombre", "display: none;");
                
                this.grid.on('dgrid-editor-hide', function (event) {
                    var grid = context.grid;
                    var cell = context.grid.row(event);
                    var aux = context.grid.cell(event);
                    switch (aux.column.field) {
                        case "abc":
                            break;
                        default:
                            cell=NominaGridHelper.formatoMontoColumn(cell);
                            break;
                    }
                    grid.save();
                    grid.refresh();
                    //actualizarValoresDgrid(event, grid);
                });

                
                this.grid.startup();

                this.CenterContentPane.addChild(this.grid);
            },
            _getSpreadSheetId: function () {
                /*
                 * Obtiene el SpreadSheetId que corresponde
                 * a la Google Sheet.
                 */
                var url = this.txtLinkWidget.value;
                console.log(url);
                var token = url.split("/");
                //console.log(token[5]);
                return token[5];
            },
            cargarNomina: function (evt) {

                var SpreadSheetId = this._getSpreadSheetId();
                var url = "nomina/" + SpreadSheetId;
                console.log("Se enviara el link: " + url);
            },
            _setWidgetCSS: function () {
                //domStyle.set(this.txtLinkWidget.domNode, "width", "70%");
            }
        });
        parser.parse();
    });