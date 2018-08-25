define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dijit/layout/BorderContainer",
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
    "dgrid/Keyboard",
    "dojo/regexp",
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
],
    function (
        declare,
        lang,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        ContentPane,
        BorderContainer,
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
        Keyboard,
        regex,
        /**
        *Fin de modulos para ColumnSet
        **/
        Memory,
        parser,
        domStyle,
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

            templateString: template,
            name: "",
            store: null,
            grid:null,
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
            createTopPane: function () {
                var context = this;
                var cargaDeLink = new CargaLinkWidget({ grid: context.grid });//Se pasara el grid 
                this.TopContentPane.addChild(cargaDeLink, 0);
                
            },
            createBottomPane: function () {
                var context = this;
                btn = new Button({
                    label:"Emitir"
                });
                domStyle.set(context.BottomContentPane, "text-align", "right");
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
                            style: "width: 300px"
                        });
                        dialog.show();
                    } else {
                        /**Aquí se realizaran todas las validaciones de las celdas
                         * que se requieren para emitir la nomina.**/
                        //var collection = context.grid.get("collection");
                        validarContenidoDeCeldas(context.grid);
                    }
                })
                context.BottomContentPane.addChild(btn);
            }
            ,
            createGrid: function () {

                var CustomGrid = declare([OnDemandGrid, ColumnSet, DijitRegistry, Selection, Editor, Keyboard]);
                //var d = editorDate(DateTextBox);
                this.grid = new CustomGrid({

                    //collection: nominaStore,
                    cellNavigation: false,
                    columnSets: 
                        [
                            [
                                [
                                    {
                                        field: 'NumEmpleado',
                                        label: 'Clave',
                                        sortable: true,
                                        renderCell: function (object, data, td, options) {
                                            return formatoCentrarContenido(data);
                                        },
                                        renderHeaderCell: function (node) {
                                            var div = document.createElement('div');
                                            div.innerHTML = "Clave";
                                            domStyle.set(div, "text-align", "center");
                                            //domStyle.set(div, "background-color", "#ffffab");
                                            //domStyle.set(node, "background-color", "#ffff12");
                                            return div;
                                        }
                                    },
                                    {
                                        field: 'Nombre',
                                        label: 'Nombre',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCentrarContenido(data);
                                        }
                                    },
                                    {
                                        field: 'Antiguedad',
                                        label: 'Antigüedad',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCentrarContenido(data);
                                        },
                                        editor: 'text',
                                        editOn:'dblclick'
                                    },
                                ]
                            ],
                            [
                               
                                [
                                   

                                    {
                                        field: 'FechaPago',
                                        label: "Fecha",
                                        /*editor: DateTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        */
                                        editorArgs: {
                                            style: "width:100px;",
                                            constraints: { datePattern: 'yyyy/MM/dd' }
                                        },
                                        renderCell: function (object, data, td, options) {
                                            /**
                                             * Dentro del renderCell es donde se realizaran las validaciones
                                             * al inicio, cuando se lee el archivo de GoogleSheets y se llena
                                             * el grid.
                                             ***/
                                            return formatoCentrarContenido(data);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 1, "Fecha", domStyle);
                                        }/*,
                                        set: function (object) {
                                            console.log(Date.parse(object.FechaPago));
                                            return moment((Date.parse(object.FechaPago)));
                                        }*/
                                    },
                                    {
                                        field: 'FechaInicialPago',
                                        label: "Fecha Inicio",
                                        renderCell: function (object, data, td, options) {
                                            return formatoCentrarContenido(data);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 1, "Fecha Inicio", domStyle);
                                        }
                                    },
                                    {
                                        field: 'FechaFinalPago',
                                        label: "Fecha Fin",
                                        renderCell: function (object, data, td, options) {
                                            return formatoCentrarContenido(data);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 1, "Fecha Fin", domStyle);
                                        }
                                    },
                                    {
                                        field: 'NumDiasPagados',
                                        label: "Dias Pagados",
                                        renderCell: function (object, data, td, options) {
                                            return formatoCentrarContenido(data);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 1, "Dias Pagados", domStyle);
                                        }
                                    },
                                    {
                                        field: 'Banco',
                                        label: "Banco",
                                        renderCell: function (object, data, td, options) {
                                            return formatoCentrarContenido(data);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 1, "Banco", domStyle);
                                        }
                                    },
                                    {
                                        field: 'Clabe',
                                        label: "Clabe",
                                        renderCell: function (object, data, td, options) {
                                            return formatoCentrarContenido(data);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 1, "Clabe", domStyle);
                                        }
                                        
                                    },
                                    {
                                        field: 'Monto',
                                        label: "Monto",
                                        renderCell: function (object, data, td, options) {
                                            validarCampo(9, td, data);
                                            return formatoCentrarContenido(data);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 1, "Monto", domStyle);
                                        }
                                    },
                                    {//Inicio de los Gravado
                                        field: 'Sueldo_Gravado', 
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave:true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        label: "Sueldo Gravado",
                                        renderCell: function (object, data, td, options) {
                                            //data=getTotalPercepcionesGravado(object);
                                            if (!validarCelda(data, 0)) {
                                                object.isValid.bandera = false;
                                                var regex = new RegExp("Sueldo_Gravado");
                                                if (!regex.test(object.isValid.codError))
                                                    object.isValid.codError += "|Sueldo_Gravado"
                                            } else {
                                                object.isValid.codError += "valido"
                                            }
                                            //console.log(object)
                                            return formatoDivTotal(data,td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Sueldo <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'Sueldo_Exento',
                                        label: "Sueldo Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data,td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Sueldo <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'Aguinaldo_Gravado',
                                        label: " Aguinaldo Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Aguinaldo <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'Aguinaldo_Exento',
                                        label: "Aguinaldo Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Aguinaldo <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'PTU_Gravado',
                                        label: "PTU Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "PTU <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'PTU_Exento',
                                        label: "PTU Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "PTU <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'RGMDyH_Gravado',
                                        label: "Reembolso de Gastos Médicos Dentales y Hospitalarios Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Reembolso de Gastos Médicos Dentales y Hospitalarios Gravado <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'RGMDyH_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Reembolso de Gastos Médicos Dentales y Hospitalarios Gravado <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'FDA_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Fondo de ahorro <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'FDA_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Fondo de ahorro <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'CDA_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Caja de ahorro <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'CDA_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Caja de ahorro <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'CCTPP_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Contribuciones a Cargo del Trabajador Pagadas por el Patrón <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'CCTPP_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Contribuciones a Cargo del Trabajador Pagadas por el Patrón <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'PP_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Premio Puntualidad <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Premio de Puntualidad
                                    {
                                        field: 'PP_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Premio Puntualidad <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Premio de Puntualidad
                                    {
                                        field: 'PSV_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Prima de seguro de vida <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Prima de Seguro de vida
                                    {
                                        field: 'PSV_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Prima de seguro de vida <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Prima de Seguro de vida
                                    {
                                        field: 'SGMM_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Seguro de gastos médicos mayores <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Seguro de Gastos Médicos Mayores
                                    {
                                        field: 'SGMM_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Seguro de gastos médicos mayores <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Seguro de Gastos Médicos Mayores
                                    {
                                        field: 'CSPPP_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Cuotas Sindicales Pagadas por el Patrón <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Cuotas Sindicales Pagadas por el patron
                                    {
                                        field: 'CSPPP_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Cuotas Sindicales Pagadas por el Patrón <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Cuotas Sindicales Pagadas por el patron
                                    {
                                        field: 'SPI_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Subsidios por incapacidad <br/>  Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Subsidios por incapacidad
                                    {
                                        field: 'SPI_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Subsidios por incapacidad <br/>  Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Subsidios por incapacidad
                                    {
                                        field: 'Becas_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Becas <br/>  Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Becas
                                    {
                                        field: 'Becas_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Becas <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Becas
                                    {
                                        field: 'HE_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas Extra <br/>  Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extra
                                    {
                                        field: 'HE_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas Extra <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extra
                                    {
                                        field: 'PrimaD_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Prima Dominical <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Prima Dominical
                                    {
                                        field: 'PrimaD_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Prima Dominical <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Prima Dominical
                                    {
                                        field: 'PrimaV_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Prima vacacional <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Prima Vacacional
                                    {
                                        field: 'PrimaV_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Prima vacacional <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Prima Vacacional
                                    {
                                        field: 'PrimaA_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Prima por Antigüedad <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Prima Antigüead
                                    {
                                        field: 'PrimaA_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Prima por Antigüedad <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Prima Antigüedad
                                    {
                                        field: 'PPS_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Pagos por separación <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Pagos por Separación
                                    {
                                        field: 'PPS_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Pagos por separación <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Pagos por Separación
                                    {
                                        field: 'SDR_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Seguro de retiro <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Seguro de retiro
                                    {
                                        field: 'SDR_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Seguro de retiro <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Seguro de retiro
                                    {
                                        field: 'Indeminizaciones_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Indeminizaciones <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Indeminizaciones
                                    {
                                        field: 'Indeminizaciones_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Indeminizaciones <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Indeminizaciones
                                    {
                                        field: 'RPF_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Reembolso por funeral <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Reembolso por funeral
                                    {
                                        field: 'RPF_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Reembolso por funeral <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Reembolso por funeral
                                    {
                                        field: 'CDSSPPP_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Cuotas de seguridad social pagadas por el patrón <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Cuotas de seguridad social pagadas por el patrón
                                    {
                                        field: 'CDSSPPP_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Cuotas de seguridad social pagadas por el patrón <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Cuotas de seguridad social pagadas por el patrón
                                    {
                                        field: 'Comisiones_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Comisiones <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Comisiones
                                    {
                                        field: 'Comisiones_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Comisiones <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Comisiones
                                    {
                                        field: 'ValesD_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Vales de despensa <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Vales de Despensa
                                    {
                                        field: 'ValesD_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Vales de despensa <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Vales de Despensa
                                    {
                                        field: 'ValesR_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Vales de Restaurante <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Vales de restaurante
                                    {
                                        field: 'ValesR_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Vales de restaurante <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Vales de restaurante
                                    {
                                        field: 'ValesG_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Vales de gasolina <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Vales de gasolina
                                    {
                                        field: 'ValesG_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Vales de gasolina <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Vales de gasolina
                                    {
                                        field: 'ValesRopa_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Vales de ropa  <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Vales de ropa
                                    {
                                        field: 'ValesRopa_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Vales de ropa  <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Vales de ropa
                                    {
                                        field: 'AyudaRenta_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para renta  <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para renta
                                    {
                                        field: 'AyudaRenta_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para renta  <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para renta
                                    {
                                        field: 'AyudaEscolar_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para artículos escolares  <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para Articulos escolares
                                    {
                                        field: 'AyudaEscolar_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para artículos escolares  <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para Articulos escolares
                                    {
                                        field: 'AyudaAnteojos_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para anteojos  <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para Anteojos
                                    {
                                        field: 'AyudaAnteojos_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para anteojos  <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para Anteojos
                                    {
                                        field: 'AyudaTransporte_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para transporte  <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para Transporte
                                    {
                                        field: 'AyudaTransporte_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para transporte  <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para Transporte
                                    {
                                        field: 'AyudaGF_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para gastos de funeral  <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para Gastos de funeral
                                    {
                                        field: 'AyudaGF_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ayuda para gastos de funeral  <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ayuda para Gasto de funeral
                                    {
                                        field: 'OIPS_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Otros ingresos por salario  <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Otros ingresos por salario
                                    {
                                        field: 'OIPS_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Otros ingresos por salarios  <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Otros ingresos por salario 
                                    {
                                        field: 'JPHDR_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Jubilaciones, pensiones o haberes de retiro <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Jubilaciones, pensiones o haberes de retiro
                                    {
                                        field: 'JPHDR_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Jubilaciones, pensiones o haberes de retiro <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Jubilaciones, pensiones o haberes de retiro
                                    {
                                        field: 'JPHDRParciales_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Jubilaciones, pensiones o haberes de retiro en parcialidades <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Jubilaciones, pensiones o haberes de retiro parciales
                                    {
                                        field: 'JPHDRParciales_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Jubilaciones, pensiones o haberes de retiro en parcialidades <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Jubilaciones, pensiones o haberes de retiro parciales
                                    {
                                        field: 'IEAOTV_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ingresos en acciones o títulos valor que representan bienes <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ingresos en acciones o títulos valor que representan bienes
                                    {
                                        field: 'IEAOTV_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ingresos en acciones o títulos valor que representan bienes <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ingresos en acciones o títulos valor que representan bienes
                                    {
                                        field: 'IAAS_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ingresos asimilados a salarios <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ingresos asimilados a salarios
                                    {
                                        field: 'IAAS_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ingresos asimilados a salarios <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Ingresos asimilados a salarios
                                    {
                                        field: 'Alimentacion_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Alimentación <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Alimentacion
                                    {
                                        field: 'Alimentacion_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Alimentación <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Alimentacion
                                    {
                                        field: 'Habitacion_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Habitación <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Habitacion
                                    {
                                        field: 'Habitacion_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Habitación <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Habitacion
                                    {
                                        field: 'PAsistecia_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Premios por asistencia <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Premios por asistencia
                                    {
                                        field: 'PAsistecia_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Premios por asistencia <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Premios por asistencia
                                    {
                                        field: 'TotalPercepcionesGravado',
                                        label: "Gravado",
                                        //autoSave:true,
                                        renderCell: function (object, data, td, options) {
                                            //data = getTotalPercepcionesGravado(object);
                                            return formatoDivTotal(data, td, true);
                                        }
                                        ,
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Total <br/> Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                        ,/*
                                        get: function (object) {
                                            //console.log(object);
                                            return a(object);
                                        },*/
                                        set: function (object) {
                                            //console.log(object);
                                            return a(object);
                                        }
                                    },//Total
                                    {
                                        field: 'TotalPercepcionesExento',
                                        label: "Exento",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Total <br/> Exento", domStyle);//Bandera 2 para deducciones
                                        },
                                        set: function (object) {
                                            return getTotalPercepcionesExento(object);
                                        }
                                    },//Total


                                    {
                                        field: 'ImporteSeguridadSocial',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Seguridad social <br/> Importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//ImporteSeguridadSocial
                                    {
                                        field: 'ImporteISR',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "ISR <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//ImporteISR
                                    {
                                        field: 'ImporteARCEAV',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Aportaciones a retiro, cesantía en edad avanzada y vejez. <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Aportaciones a retiro, cesantía en edad avanzada y vejez
                                    {
                                        field: 'ImporteOtros',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Otros <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }

                                    },//Otros
                                    {
                                        field: 'ImporteDPI',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Descuento por incapacidad <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe Descuento por incapacidad
                                    {
                                        field: 'ImportePA',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Pensión alimenticia <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe pensión alimenticia
                                    {
                                        field: 'ImportePPCDV',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Pago por crédito de vivienda <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe Pago Por Credito De Vivienda
                                    {
                                        field: 'ImporteINFONACOT',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Pago de abonos INFONACOT <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe de Pago de abonos INFONACOT
                                    {
                                        field: 'ImporteADS',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Anticipo de salarios <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe anticipo de Salarios
                                    {
                                        field: 'ImporteErrores',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Errores <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe Errores
                                    {
                                        field: 'ImportePerdidas',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Pérdidas <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe Perdidas
                                    {
                                        field: 'ImporteAverias',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Averías <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe Averías
                                    {
                                        field: 'ImporteAdquisicionArticulos',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Adquisición de artículos producidos por la empresa o establecimiento <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe Adquisición de articulos
                                    {
                                        field: 'ImporteCuotasConstitucion',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro
                                    {
                                        field: 'ImporteCuotasSindicales',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Cuotas sindicales <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe Cuotas Sindicales
                                    {
                                        field: 'ImporteAusencia',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Ausencia (Ausetismo) <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe Ausencia
                                    {
                                        field: 'ImporteObreroP',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Cuotas obrero patronales <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe cutoas obrero patronales
                                    {
                                        field: 'ImporteImpuestosL',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Impuestos locales <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe impuestos locales
                                    {
                                        field: 'ImporteAportacionesV',
                                        label: 'importe',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+(\.[0-9]{1,3}))?'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Aportaciones voluntarias <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Importe aportaciones voluntarias
                                    {
                                        field: 'TotalDeducciones',
                                        label: "", colSpan: 2,
                                        autoSave: true,
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Total deducciones <br/> importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Total

                                    /**Incapacidades**/
                                    {
                                        field: 'RiesgoTrabajoDias',
                                        label: "Dias",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Riesgo de Trabajo <br/> Dias", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Riesgo de trabajo dias
                                    {
                                        field: 'RiesgoTrabajoDescuento',
                                        label: "Descuento",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Riesgo de Trabajo <br/> Descuento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Riesgo de trabajo Descuento
                                    {
                                        field: 'RiesgoEnfermedadDias',
                                        label: "Dias",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Enfermedad en general <br/> Dias", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Riesgo Enfermedades en General dias.
                                    {
                                        field: 'RiesgoEnfermedadDescuento',
                                        label: "Descuento",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Enfermedad en general <br/> Descuento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Riesgo Enferemedades en General Descuento.
                                    {
                                        field: 'MaternidadDias',
                                        label: "Dias",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Maternidad <br/> Dias", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Maternidad dias.
                                    {
                                        field: 'MaternidadDescuento',
                                        label: "Descuento",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Maternidad <br/> Descuento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Maternidad Descuento.
                                    {
                                        field: 'TotalIncapacidadesDias',
                                        label: "",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Incapacidades Dias <br/> Total", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Total de las incapacidades Dias
                                    {
                                        field: 'TotalIncapacidadesDescuento',
                                        label: "",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Incapacidades Descuento <br/> Total", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Total de las incapacidades Descuento

                                    /**Horas Extra**/
                                    {
                                        field: 'HorasExD_Dias',
                                        label: "Dias",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra dobles <br/> Dias", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//HorasExtraDobles dias.
                                    {
                                        field: 'HorasExD_Horas',
                                        label: "Horas",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra dobles <br/> Horas", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extra Dobles horas.
                                    {
                                        field: 'HorasExD_Importe',
                                        label: "Importe",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra dobles <br/> Importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extras Dobles importe

                                    {
                                        field: 'HorasExT_Dias',
                                        abel: "Dias",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra triples <br/> Dias", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//HorasExtra Triples dias.
                                    {
                                        field: 'HorasExT_Horas',
                                        label: "Horas",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra triples <br/> Horas", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extra Triples horas.
                                    {
                                        field: 'HorasExT_Importe',
                                        label: "Importe",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra triples <br/> Importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extras Triples importe

                                    {
                                        field: 'HorasExS_Dias',
                                        label: "Dias",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra simples <br/> Dias", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extra Simples dias.
                                    {
                                        field: 'HorasExS_Horas',
                                        label: "Horas",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra dobles <br/> Horas", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extra Simples horas.
                                    {
                                        field: 'HorasExS_Importe',
                                        label: "Importe",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra dobles <br/> Importe", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Horas Extras Simples importe
                                    {
                                        field: 'TotalHE',
                                        label: "Importe",
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Horas extra <br/> Total", domStyle);//Bandera 2 para deducciones
                                        }
                                    },//Total Horas Extra

                                    {
                                        field: 'checkRegistro',
                                        label: 'isValid',
                                        editor: CheckBox,
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "valido<br/>", domStyle);//Bandera 2 para deducciones
                                        },
                                        editorArgs: {
                                            value: "checked"
                                        }
                                    }
                                ]
                            ]
                        ]


                });
                var context = this;
                /*
                this.grid.on('.dgrid-cell:click', function (event) {
                    var cell = context.grid.cell(event);
                    console.log(cell.element);
                    console.log(cell.column);
                    console.log(cell.row);

                });*/
                /*
                this.grid.on('dgrid-datachange', function (event) {
                    var cell = event.cell;
                    var test = cell.column.renderCell;
                    //context.grid.cell(event).element.style.setProperty("background-color", "red", "important");
                    //cell.style.setProperty("background-color", "red", "important");
                    //Investigar el metodo refresh(cell).
                    var z = context.grid.cell(cell);
                    //console.log(event);
                    var row = context.grid.row(event);
                    var grid = context.grid;
                    //console.log(row.element);
                    //console.log(z);
                    actualizarValoresDgrid(event,grid);
                });*/
                //this.grid.styleColumn("Nombre", "display: none;");

                this.grid.on('dgrid-editor-hide', function (event) {
                    /*
                    var cell = event.cell;
                    var test = cell.column.renderCell;
                    //context.grid.cell(event).element.style.setProperty("background-color", "red", "important");
                    //cell.style.setProperty("background-color", "red", "important");
                    //Investigar el metodo refresh(cell).
                    var z = context.grid.cell(cell);
                    var row = context.grid.row(event);*/
                    var grid = context.grid;
                    grid.save();
                    grid.refresh();
                    //actualizarValoresDgrid(event, grid);
                });

                this.grid.on('dgrid-editor-show', function (event) {
                    /*
                    var cell = event.cell;
                    var test = cell.column.renderCell;
                    //context.grid.cell(event).element.style.setProperty("background-color", "red", "important");
                    //cell.style.setProperty("background-color", "red", "important");
                    //Investigar el metodo refresh(cell).
                    var z = context.grid.cell(cell);
                    var row = context.grid.row(event);*/
                    console.log(context.grid.row(event));
                    //console.log(context.grid)
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