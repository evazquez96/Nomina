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
    "dojo/dom-style",
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
        domStyle,
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
                                        field: 'Pago',
                                        label: 'Pago',
                                        colSpan: 7,
                                        value: '',
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 1, "Pago", domStyle);
                                        }
                                    },
                                    {
                                        field: 'Sueldo',
                                        label: 'Sueldo',
                                        colSpan: 2,
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//01
                                    {
                                        field: 'Aguinaldo',
                                        label: 'Aguinaldo',
                                        colSpan: 2,
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//02
                                    {
                                        label: 'PTU',
                                        colSpan: 2,
                                        field: 'PTU',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//03
                                    {
                                        label: 'Reembolso de Gastos Médicos Dentales y Hospitalarios',
                                        colSpan: 2,
                                        field: 'Reembolso de Gastos Médicos Dentales y Hospitalarios',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//04
                                    {
                                        label: 'Fondo de Ahorro',
                                        colSpan: 2,
                                        field: 'Fondo de ahorro',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//05
                                    {
                                        label: 'Caja de Ahorro',
                                        colSpan: 2,
                                        field: 'Caja de ahorro',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//06
                                    {
                                        label: 'Contribuciones a Cargo del Trabajador Pagadas por el Patrón',
                                        colSpan: 2,
                                        field: 'Contribuciones a Cargo del Trabajador Pagadas por el Patrón',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//09
                                    {
                                        label: 'Premio de Puntualidad',
                                        colSpan: 2,
                                        field: 'Premio de puntualidad',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//10
                                    {
                                        label: 'Prima de Seguro de vida',
                                        colSpan: 2,
                                        field: 'Prima de Seguro de vida',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//11
                                    {
                                        label: 'Seguro de gastos médicos mayores',
                                        colSpan: 2,
                                        field: 'Seguro de gastos medicos',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//12
                                    {
                                        label: 'Cuotas Sindicales Pagadas por el Patrón',
                                        colSpan: 2,
                                        field: 'Cuotas sindicales pagadas por el patron',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//13
                                    {
                                        label: 'Subsidios por incapacidad',
                                        colSpan: 2,
                                        field: 'subsidios por incapacidad',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//14
                                    {
                                        label: 'Becas',
                                        colSpan: 2,
                                        field: 'Becas',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//15
                                    {
                                        label: 'Horas Extra',
                                        colSpan: 2,
                                        field: 'Horas Extra',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//19
                                    {
                                        label: 'Prima Dominical',
                                        colSpan: 2,
                                        field: 'Prima Dominical',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//20
                                    {
                                        label: 'Prima Vacacional',
                                        colSpan: 2,
                                        field: 'Prima Vacacional',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//21
                                    {
                                        label: 'Prima por Antigüedad',
                                        colSpan: 2,
                                        field: 'Prima por antiguedad',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//22
                                    {
                                        label: 'Pagos por Separación',
                                        colSpan: 2,
                                        field: 'Pagos por separacion',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//23
                                    {
                                        label: 'Seguro de Retiro',
                                        colSpan: 2,
                                        field: 'Seguro de retiro',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//24
                                    {
                                        label: 'Indeminizaciones',
                                        colSpan: 2,
                                        field: 'Indeminizaciones',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//25
                                    {
                                        label: 'Reembolso por funeral',
                                        colSpan: 2,
                                        field: 'Reembolso por funeral',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//26
                                    {
                                        label: 'Cuotas de seguridad social pagadas por el patrón',
                                        colSpan: 2,
                                        field: 'Cuotas de seguridad social pagadas por el patron',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//27
                                    {
                                        label: 'Comisiones',
                                        colSpan: 2,
                                        field: 'Comisiones',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//28
                                    {
                                        label: 'Vales de despensa',
                                        colSpan: 2,
                                        field: 'Vales de despensa',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//29
                                    {
                                        label: 'Vales de restaurante',
                                        colSpan: 2,
                                        field: 'Vales de restaurante',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//30
                                    {
                                        label: 'Vales de gasolina',
                                        colSpan: 2,
                                        field: 'Vales de gasolina',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//31
                                    {
                                        label: 'Vales de ropa',
                                        colSpan: 2,
                                        field: 'Vales de ropa',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//32
                                    {
                                        label: 'Ayuda para renta',
                                        colSpan: 2,
                                        field: 'Ayuda para renta',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//33
                                    {
                                        label: 'Ayuda para artículos escolares',
                                        colSpan: 2,
                                        field: 'Ayuda para articulos escolares',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//34
                                    {
                                        label: 'Ayuda para anteojos',
                                        colSpan: 2,
                                        field: 'Ayuda para anteojos',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//35
                                    {
                                        label: 'Ayuda para transporte',
                                        colSpan: 2,
                                        field: 'Ayuda para transporte',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//36
                                    {
                                        label: 'Ayuda para gastos de funeral',
                                        colSpan: 2,
                                        field: 'Ayuda para gastos de funeral',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//37
                                    {
                                        label: 'Otros ingresos por salario',
                                        colSpan: 2,
                                        field: 'Otros ingresas por salario',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//38
                                    {
                                        label: 'Jubilaciones, pensiones o haberes de retiro',
                                        colSpan: 2,
                                        field: 'Jubilaciones, pensiones o haberes de retiro',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//39
                                    {
                                        label: 'Jubilaciones, pensiones o haberes de retiro en parcialidades',
                                        colSpan: 2,
                                        field: 'Jubilaciones, pensiones o haberes de retiro en parcialidades',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//44
                                    {
                                        label: 'Ingresos en acciones o títulos valor que representan bienes',
                                        colSpan: 2,
                                        field: 'Ingresos en acciones o titulos valor que representan bienes',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//45
                                    {
                                        label: 'Ingresos asimilados a salarios',
                                        colSpan: 2,
                                        field: 'Ingresos asimilados a salarios',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//46
                                    {
                                        label: 'Alimentación',
                                        colSpan: 2,
                                        field: 'Alimentacion',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//47
                                    {
                                        label: 'Habitación',
                                        colSpan: 2,
                                        field: 'Habitacion',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//48
                                    {
                                        label: 'Premios por asistencia',
                                        colSpan: 2,
                                        field: 'Premios por asistencia',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//49
                                    {
                                        label: 'Total',
                                        colSpan: 2,
                                        field: 'Total',
                                        renderCell: function (object, data, td, options) {
                                            return formatoCeldasVacias(td);
                                        }
                                    },//50


                                    /**Deducciones**/
                                    {
                                        label: 'Seguridad Social',
                                        field: 'Seguridad_Social',
                                        colSpan: 1
                                    },//1
                                    {
                                        label: 'ISR',
                                        field: 'ISR',
                                        colSpan: 1
                                    },//2
                                    {
                                        label: 'Aportaciones a retiro, cesantía en edad avanzada y vejez',
                                        colSpan: 1,
                                        field: 'ARCEAV'
                                    },//3
                                    {
                                        label: 'Otros',
                                        colSpan: 1,
                                        field:'otros'
                                    },//4
                                    {
                                        label: 'Descuento por incapacidad',
                                        colSpan: 1,
                                        field:'Descuento por incapacidad'
                                    },//6
                                    {
                                        label: 'Pensión alimenticia',
                                        colSpan: 1,
                                        field: 'Pension alimenticia'
                                    },//7
                                    {
                                        label: 'Pago por crédito de vivienda',
                                        colSpan: 1,
                                        field:'Pago credito vivienda'
                                    },//10
                                    {
                                        label: 'Pago de abonos INFONACOT',
                                        colSpan: 1,
                                        field: 'Abono INFONACOT'
                                    },//11
                                    {
                                        label: 'Anticipo de salarios',
                                        colSpan: 1,
                                        field:  'Anticipo de salarios'
                                    },//12
                                    {
                                        label: 'Errores',
                                        colSpan: 1,
                                        field: 'Errores'
                                    },//14
                                    {
                                        label: 'Pérdidas',
                                        colSpan: 1,
                                        field: 'Perdidas'
                                    },//15
                                    { label: 'Averías', colSpan: 1 },//16
                                    { label: 'Adquisición de artículos producidos por la empresa o establecimiento', colSpan: 1 },//17
                                    { label: 'Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro', colSpan: 1 },//18
                                    { label: 'Cuotas sindicales', colSpan: 1 },//19
                                    { label: 'Ausencia (Ausentismo)', colSpan: 1 },//20
                                    { label: 'Cuotas obrero patronales', colSpan: 1 },//21
                                    { label: 'Impuestos Locales', colSpan: 1 },//22
                                    { label: 'Aportaciones voluntarias', colSpan: 1 },//23
                                    { label: 'Total', colSpan: 2 },//24


                                    /**Incapacidades**/
                                    { label: 'Riesgo de Trabajo', colSpan: 2 },
                                    { label: 'Enfermedad en General', colSpan: 2 },
                                    { label: 'Maternidad', colSpan: 2 },
                                    { label: 'Total', colSpan: 2 },

                                    /**Horas Extra**/
                                    { label: 'Horas Extras: Dobles', colSpan: 3 },
                                    { label: 'Horas Extras: Triples', colSpan: 3 },
                                    { label: 'Horas Extras: Simples', colSpan: 3 },
                                    { label: 'Total' },
                                    {label:'isValid'}//Fin

                                ],
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
                                    {//Inicio de los Gravados
                                        field: 'Sueldo_Gravado',
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave:true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        label: "Gravado",
                                        renderCell: function (object, data, td, options) {
                                            //data=getTotalPercepcionesGravado(object);
                                            return formatoDivTotal(data,td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'Sueldo_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data,td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'Aguinaldo_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'Aguinaldo_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'PTU_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'PTU_Exento',
                                        label: "Exento",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
                                        }
                                    },
                                    {
                                        field: 'RGMDyH_Gravado',
                                        label: "Gravado",
                                        editor: ValidationTextBox,
                                        editOn: 'dblclick',
                                        autoSave: true,
                                        editorArgs: {
                                            style: "width:110px",
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td,false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, true);
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
                                            regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                                        },
                                        renderCell: function (object, data, td, options) {
                                            return formatoDivTotal(data, td, false);
                                        },
                                        renderHeaderCell: function (node) {
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
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
                                            return formatoHeader(node, 2, "Exento", domStyle);//Bandera 2 para deducciones
                                        },
                                        set: function (object) {
                                            return getTotalPercepcionesExento(object);
                                        }
                                    },//Total


                                    {
                                        field: 'ImporteSeguridadSocial',
                                        label: 'importe'
                                    },//ImporteSeguridadSocial
                                    {
                                        field: 'ImporteISR',
                                        label: 'importe'
                                    },//ImporteISR
                                    {
                                        field: 'ImporteARCEAV',
                                        label: 'importe'
                                    },//Aportaciones a retiro, cesantía en edad avanzada y vejez
                                    {
                                        field: 'ImporteOtros',
                                        label: 'importe'
                                    },//Otros
                                    {
                                        field: 'ImporteDPI',
                                        label: 'importe'
                                    },//Importe Descuento por incapacidad
                                    {
                                        field: 'ImportePA',
                                        label: 'importe'
                                    },//Importe pensión alimenticia
                                    {
                                        field: 'ImportePPCDV',
                                        label: 'importe'
                                    },//Importe Pago Por Credito De Vivienda
                                    {
                                        field: 'ImporteINFONACOT',
                                        label: 'importe'
                                    },//Importe de Pago de abonos INFONACOT
                                    {
                                        field: 'ImporteADS',
                                        label: 'importe'
                                    },//Importe anticipo de Salarios
                                    {
                                        field: 'ImporteErrores',
                                        label: 'importe'
                                    },//Importe Errores
                                    {
                                        field: 'ImportePerdidas',
                                        label: 'importe'
                                    },//Importe Perdidas
                                    {
                                        field: 'ImporteAverias',
                                        label: 'importe'
                                    },//Importe Averías
                                    {
                                        field: 'ImporteAdquisicionArticulos',
                                        label: 'importe'
                                    },//Importe Adquisición de articulos
                                    {
                                        field: 'ImporteCuotasConstitucion',
                                        label: 'importe'
                                    },//Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro
                                    {
                                        field: 'ImporteCuotasSindicales',
                                        label: 'importe'
                                    },//Importe Cuotas Sindicales
                                    {
                                        field: 'ImporteAusencia',
                                        label: 'importe'
                                    },//Importe Ausencia
                                    {
                                        field: 'ImporteObreroP',
                                        label: 'importe'
                                    },//Importe cutoas obrero patronales
                                    {
                                        field: 'ImporteImpuestosL',
                                        label: 'importe'
                                    },//Importe impuestos locales
                                    {
                                        field: 'ImporteAportacionesV',
                                        label: 'importe'
                                    },//Importe aportaciones voluntarias
                                    {
                                        field: 'TotalDeducciones',
                                        label: "", colSpan: 2
                                    },//Total

                                    /**Incapacidades**/
                                    { field: 'RiesgoTrabajoDias', label: "Dias" },//Riesgo de trabajo dias
                                    { field: 'RiesgoTrabajoDescuento', label: "Descuento" },//Riesgo de trabajo Descuento
                                    { field: 'RiesgoEnfermedadDias', label: "Dias" },//Riesgo Enfermedades en General dias.
                                    { field: 'RiesgoEnfermedadDescuento', label: "Descuento" },//Riesgo Enferemedades en General Descuento.
                                    { field: 'MaternidadDias', label: "Dias" },//Maternidad dias.
                                    { field: 'MaternidadDescuento', label: "Descuento" },//Maternidad Descuento.
                                    { field: 'TotalIncapacidades', label: "", colSpan: 2 },//Total de las incapacidades

                                    /**Horas Extra**/
                                    { field: 'HorasExD_Dias', label: "Dias" },//HorasExtraDobles dias.
                                    { field: 'HorasExD_Horas', label: "Horas" },//Horas Extra Dobles horas.
                                    { field: 'HorasExD_Importe', label: "Importe" },//Horas Extras Dobles importe

                                    { field: 'HorasExT_Dias', label: "Dias" },//HorasExtra Triples dias.
                                    { field: 'HorasExT_Horas', label: "Horas" },//Horas Extra Triples horas.
                                    { field: 'HorasExT_Importe', label: "Importe" },//Horas Extras Triples importe

                                    { field: 'HorasExS_Dias', label: "Dias" },//Horas Extra Simples dias.
                                    { field: 'HorasExS_Horas', label: "Horas" },//Horas Extra Simples horas.
                                    { field: 'HorasExS_Importe', label: "Importe" },//Horas Extras Simples importe
                                    { field: 'TotalHE', label: "Importe" },//Total Horas Extra

                                    { field:'checkRegistro', label: 'isValid' }
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