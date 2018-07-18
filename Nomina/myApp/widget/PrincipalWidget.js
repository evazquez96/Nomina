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
    /**
    *Inicio de modulos para ColumnSet
    **/
    "dgrid/OnDemandGrid",
    "dgrid/ColumnSet",
    "dgrid/extensions/CompoundColumns",
    'dgrid/extensions/DijitRegistry',

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
        /**
        *Inicio de modulos para ColumnSet
        **/
        OnDemandGrid,
        ColumnSet,
        CompoundColumns,
        DijitRegistry,
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
            constructor: function (arguments) {
                lang.mixin(this, arguments);
                console.log("name:" + this.name);
            },
            postCreate: function () {
                var domNode = this.domNode;
                this.inherited(arguments);
                this.createTopPane();
                this.createGrid();
                /*
                 * LLamar siempre en el postCreate 
                 */

                //this._setWidgetCSS();
                //var context = this;
                /*
                on(this.btnCargaWidget, 'click', function (evt) {

                    when(context.cargarNomina(evt), function (data) {
                        grid.set('collection', collection);
                        grid.refresh();

                    }, function (error) { });

                });*/
            },
            createTopPane: function () {
                var cargaDeLink = new CargaLinkWidget();
                //cargaDeLink.startup();
                this.TopContentPane.addChild(cargaDeLink, 0);
                
            },
            createGrid: function () {

                /*
                var CustomGrid = declare([OnDemandGrid, CompoundColumns]);
                var grid = new CustomGrid({
                    
                    columns: getCompoundColumnsHeaders() 

                });
                */

                var CustomGrid = declare([OnDemandGrid, ColumnSet, DijitRegistry]);
                //var headers = getCompoundColumnsHeaders();
                var nomina = [
                    { NoEmpleado: 1, Nombre: " Jesus Eduardo Vazquez Martinez", Antiguedad: 22, Fecha: "2018/03/09", FechaI: "2018/02/23" },
                    { NoEmpleado: 2, Nombre: " Cruz Mondragon Diego", Antiguedad: 23, Fecha: "2018/04/09", FechaI: "2018/02/23" },
                    { NoEmpleado: 3, Nombre: " Juan Orihuela", Antiguedad: 23, Fecha: "2018/04/09", FechaI: "2018/02/23"}
                ];
                var nominaStore = new Memory({ data: nomina, idProperty: 'NoEmpleado' });
                
                var grid = new CustomGrid({

                    collection: nominaStore,
                    columnSets: 
                        [
                            [
                                [
                                    { field: 'NoEmpleado', label: 'Clave', sortable:true},
                                    { field: 'Nombre', label: 'Nombre' },
                                    { field: 'Antiguedad', label: 'Antigüedad' },
                                ]
                            ],
                            [
                                [
                                    { field:'Pago',label: 'Pago', colSpan: 7 },
                                    { label: 'Sueldo', colSpan: 2 },//01
                                    { label: 'Aguinaldo', colSpan: 2 },//02
                                    { label: 'PTU', colSpan: 2 },//03
                                    { label: 'Reembolso de Gastos Médicos Dentales y Hospitalarios', colSpan: 2 },//04
                                    { label: 'Fondo de Ahorro', colSpan: 2 },//05
                                    { label: 'Caja de Ahorro', colSpan: 2 },//06
                                    { label: 'Contribuciones a Cargo del Trabajador Pagadas por el Patrón', colSpan: 2 },//09
                                    {label:'Premio de Puntualidad', colSpan:2},//10
                                    { label: 'Prima de Seguro de vida', colSpan: 2 },//11
                                    { label: 'Seguro de gastos médicos mayores', colSpan: 2 },//12
                                    { label: 'Cuotas Sindicales Pagadas por el Patrón', colSpan: 2 },//13
                                    { label: 'Subsidios por incapacidad', colSpan: 2 },//14
                                    { label: 'Becas', colSpan: 2 },//15
                                    { label: 'Horas Extra', colSpan: 2 },//19
                                    { label: 'Prima Dominical', colSpan: 2 },//20
                                    { label: 'Prima Vacacional', colSpan: 2 },//21
                                    { label: 'Prima por Antigüedad', colSpan: 2 },//22
                                    { label: 'Pagos por Separación', colSpan: 2 },//23
                                    { label: 'Seguro de Retiro', colSpan: 2 },//24
                                    { label: 'Indeminizaciones', colSpan: 2 },//25
                                    { label: 'Reembolso por funeral', colSpan: 2 },//26
                                    { label:'Cuotas de seguridad social pagadas por el patrón', colSpan:2},//27
                                    { label: 'Comisiones', colSpan: 2 },//28
                                    { label: 'Vales de despensa', colSpan: 2 },//29
                                    { label: 'Vales de restaurante', colSpan: 2 },//30
                                    { label: 'Vales de gasolina', colSpan: 2 },//31
                                    { label: 'Vales de ropa', colSpan: 2 },//32
                                    { label: 'Ayuda para renta', colSpan: 2 },//33
                                    { label: 'Ayuda para artículos escolares', colSpan: 2 },//34
                                    { label: 'Ayuda para anteojos', colSpan: 2 },//35
                                    { label: 'Ayuda para transporte', colSpan: 2 },//36
                                    { label: 'Ayuda para gastos de funeral', colSpan: 2 },//37
                                    { label: 'Otros ingresos por salario', colSpan: 2 },//38
                                    { label: 'Jubilaciones, pensiones o haberes de retiro', colSpan: 2 },//39
                                    { label: 'Jubilaciones, pensiones o haberes de retiro en parcialidades', colSpan: 2 },//44
                                    { label:'Ingresos en acciones o títulos valor que representan bienes', colSpan:2},//45
                                    { label: 'Ingresos asimilados a salarios', colSpan: 2 },//46
                                    { label: 'Alimentación', colSpan: 2 },//47
                                    { label: 'Habitación', colSpan: 2 },//48
                                    { label: 'Premios por asistencia', colSpan: 2 },//49
                                    { label: 'Total', colSpan: 2 },//50


                                    /**Deducciones**/
                                    { label: 'Seguridad Social', colSpan: 1 },//1
                                    { label: 'ISR', colSpan: 1 },//2
                                    { label:'Aportaciones a retiro, cesantía en edad avanzada y vejez', colSpan:1},//3
                                    { label: 'Otros', colSpan: 1 },//4
                                    { label: 'Descuento por incapacidad', colSpan: 1 },//6
                                    { label: 'Pensión alimenticia', colSpan: 1 },//7
                                    { label: 'Pago por crédito de vivienda', colSpan: 1 },//10
                                    { label: 'Pago de abonos INFONACOT', colSpan: 1 },//11
                                    { label: 'Anticipo de salarios', colSpan: 1 },//12
                                    { label: 'Errores', colSpan: 1 },//14
                                    { label: 'Pérdidas', colSpan: 1 },//15
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
                                    { label: 'Total'}

                                ],
                                [
                                   

                                    { field: 'Fecha', label: "Fecha" },
                                    { field: 'FechaI', label: "Fecha Inicio" },
                                    { field: 'FechaF', label: "Fecha Fin" },
                                    { field: 'DiasP', label: "Dias Pagados" },
                                    { field: 'Banco', label: "Banco" },
                                    { field: 'Clabe', label: "Clabe" },
                                    { field: 'Monto', label: "Monto" },
                                    { field: 'Sueldo_Gravado', label: "Gravado" },
                                    { field: 'Sueldo_Exento', label: "Exento" },
                                    { field: 'Aguinaldo_Gravado', label: "Gravado" },
                                    { field: 'Aguinaldo_Exento', label: "Exento" },
                                    { field: 'PTU_Gravado', label: "Gravado" },
                                    { field: 'PTU_Exento', label: "Exento" },
                                    { field: 'RGMDyH_Gravado', label: "Gravado" },
                                    { field: 'RGMDyH_Exento', label: "Exento" },
                                    { field: 'FDA_Gravado', label: "Gravado" },
                                    { field: 'FDA_Exento', label: "Exento" },
                                    { field: 'CDA_Gravado', label: "Gravado" },
                                    { field: 'CDA_Exento', label: "Exento" },
                                    { field: 'CCTPP_Gravado', label: "Gravado" },
                                    { field: 'CCTPP_Exento', label: "Exento" },
                                    { field: 'PP_Gravado', label: "Gravado" },//Premio de Puntualidad
                                    { field: 'PP_Exento', label: "Exento" },//Premio de Puntualidad
                                    { field: 'PSV_Gravado', label: "Gravado" },//Prima de Seguro de vida
                                    { field: 'PSV_Exento', label: "Exento" },//Prima de Seguro de vida
                                    { field: 'SGMM_Gravado', label: "Gravado" },//Seguro de Gastos Médicos Mayores
                                    { field: 'CCTPP_Exento', label: "Exento" },//Seguro de Gastos Médicos Mayores
                                    { field: 'CSPPP_Gravado', label: "Gravado" },//Cuotas Sindicales Pagadas por el patron
                                    { field: 'CSPPP_Exento', label: "Exento" },//Cuotas Sindicales Pagadas por el patron
                                    { field: 'SPI_Gravado', label: "Gravado" },//Subsidios por incapacidad
                                    { field: 'SPI_Exento', label: "Exento" },//Subsidios por incapacidad
                                    { field: 'Becas_Gravado', label: "Gravado" },//Becas
                                    { field: 'Becas_Exento', label: "Exento" },//Becas
                                    { field: 'HE_Gravado', label: "Gravado" },//Horas Extra
                                    { field: 'HE_Exento', label: "Exento" },//Horas Extra
                                    { field: 'PrimaD_Gravado', label: "Gravado" },//Prima Dominical
                                    { field: 'PrimaD_Exento', label: "Exento" },//Prima Dominical
                                    { field: 'PrimaV_Gravado', label: "Gravado" },//Prima Vacacional
                                    { field: 'PrimaV_Exento', label: "Exento" },//Prima Vacacional
                                    { field: 'PrimaA_Gravado', label: "Gravado" },//Prima Antigüead
                                    { field: 'PrimaA_Exento', label: "Exento" },//Prima Antigüedad
                                    { field: 'PPS_Gravado', label: "Gravado" },//Pagos por Separación
                                    { field: 'PPS_Exento', label: "Exento" },//Pagos por Separación
                                    { field: 'SDR_Gravado', label: "Gravado" },//Seguro de retiro
                                    { field: 'SDR_Exento', label: "Exento" },//Seguro de retiro
                                    { field: 'Indeminizaciones_Gravado', label: "Gravado" },//Indeminizaciones
                                    { field: 'Indeminizaciones_Exento', label: "Exento" },//Indeminizaciones
                                    { field: 'RPF_Gravado', label: "Gravado" },//Reembolso por funeral
                                    { field: 'RPF_Exento', label: "Exento" },//Reembolso por funeral
                                    { field: 'CDSSPPP_Gravado', label: "Gravado" },//Cuotas de seguridad social pagadas por el patrón
                                    { field: 'CDSSPPP_Exento', label: "Exento" },//Cuotas de seguridad social pagadas por el patrón
                                    { field: 'Comisiones_Gravado', label: "Gravado" },//Comisiones
                                    { field: 'Comisiones_Exento', label: "Exento" },//Comisiones
                                    { field: 'ValesD_Gravado', label: "Gravado" },//Vales de Despensa
                                    { field: 'ValesD_Exento', label: "Exento" },//Vales de Despensa
                                    { field: 'ValesR_Gravado', label: "Gravado" },//Vales de restaurante
                                    { field: 'ValesR_Exento', label: "Exento" },//Vales de restaurante
                                    { field: 'ValesG_Gravado', label: "Gravado" },//Vales de gasolina
                                    { field: 'ValesG_Exento', label: "Exento" },//Vales de gasolina
                                    { field: 'ValesRopa_Gravado', label: "Gravado" },//Vales de ropa
                                    { field: 'ValesRopa_Exento', label: "Exento" },//Vales de ropa
                                    { field: 'AyudaRenta_Gravado', label: "Gravado" },//Ayuda para renta
                                    { field: 'AyudaRenta_Exento', label: "Exento" },//Ayuda para renta
                                    { field: 'AyudaEscolar_Gravado', label: "Gravado" },//Ayuda para Articulos escolares
                                    { field: 'AyudaEscolar_Exento', label: "Exento" },//Ayuda para Articulos escolares
                                    { field: 'AyudaAnteojos_Gravado', label: "Gravado" },//Ayuda para Anteojos
                                    { field: 'AyudaAnteojos_Exento', label: "Exento" },//Ayuda para Anteojos
                                    { field: 'AyudaTransporte_Gravado', label: "Gravado" },//Ayuda para Transporte
                                    { field: 'AyudaTransporte_Exento', label: "Exento" },//Ayuda para Transporte
                                    { field: 'AyudaGF_Gravado', label: "Gravado" },//Ayuda para Gastos de funeral
                                    { field: 'AyudaGF_Exento', label: "Exento" },//Ayuda para Gasto de funeral
                                    { field: 'OIPS_Gravado', label: "Gravado" },//Otros ingresos por salario
                                    { field: 'OIPS_Exento', label: "Exento" },//Otros ingresos por salario 
                                    { field: 'JPHDR_Gravado', label: "Gravado" },//Jubilaciones, pensiones o haberes de retiro
                                    { field: 'JPHDR_Exento', label: "Exento" },//Jubilaciones, pensiones o haberes de retiro
                                    { field: 'JPHDRParciales_Gravado', label: "Gravado" },//Jubilaciones, pensiones o haberes de retiro parciales
                                    { field: 'JPHDRParciales_Exento', label: "Exento" },//Jubilaciones, pensiones o haberes de retiro parciales
                                    { field: 'IEAOTV_Gravado', label: "Gravado" },//Ingresos en acciones o títulos valor que representan bienes
                                    { field: 'IEAOTV_Exento', label: "Exento" },//Ingresos en acciones o títulos valor que representan bienes
                                    { field: 'IAAS_Gravado', label: "Gravado" },//Ingresos asimilados a salarios
                                    { field: 'IAAS_Exento', label: "Exento" },//Ingresos asimilados a salarios
                                    { field: 'Alimentacion_Gravado', label: "Gravado" },//Alimentacion
                                    { field: 'Alimentacion_Exento', label: "Exento" },//Alimentacion
                                    { field: 'Habitacion_Gravado', label: "Gravado" },//Habitacion
                                    { field: 'Habitacion_Exento', label: "Exento" },//Habitacion
                                    { field: 'PAsistecia_Gravado', label: "Gravado" },//Premios por asistencia
                                    { field: 'PAsistencia_Exento', label: "Exento" },//Premios por asistencia
                                    { field: 'TotalPercepciones', label: "", colSpan: 2 },//Total

                                    { field: 'ImporteSeguridadSocial', label: 'importe' },//ImporteSeguridadSocial
                                    { field: 'ImporteISR', label: 'importe' },//ImporteISR
                                    { field: 'ImporteARCEAV', label: 'importe' },//Aportaciones a retiro, cesantía en edad avanzada y vejez
                                    { field: 'ImporteOtros', label: 'importe' },//Otros
                                    { field: 'ImporteDPI', label: 'importe' },//Importe Descuento por incapacidad
                                    { field: 'ImportePA', label: 'importe' },//Importe pensión alimenticia
                                    { field: 'ImportePPCDV', label: 'importe' },//Importe Pago Por Credito De Vivienda
                                    { field: 'ImporteINFONACOT', label: 'importe' },//Importe de Pago de abonos INFONACOT
                                    { field: 'ImporteADS', label: 'importe' },//Importe anticipo de Salarios
                                    { field: 'ImporteErrores', label: 'importe' },//Importe Errores
                                    { field: 'ImportePerdidas', label: 'importe' },//Importe Perdidas
                                    { field: 'ImporteAverias', label: 'importe' },//Importe Averías
                                    { field: 'ImporteAdquisicionArticulos', label: 'importe' },//Importe Adquisición de articulos
                                    { field: 'ImporteCuotasConstitucion', label: 'importe' },//Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro
                                    { field: 'ImporteCuotasSindicales', label: 'importe' },//Importe Cuotas Sindicales
                                    { field: 'ImporteAusencia', label: 'importe' },//Importe Ausencia
                                    { field: 'ImporteObreroP', label: 'importe' },//Importe cutoas obrero patronales
                                    { field: 'ImporteImpuestosL', label: 'importe' },//Importe impuestos locales
                                    { field: 'ImporteAportacionesV', label: 'importe' },//Importe aportaciones voluntarias
                                    { field: 'TotalDeducciones', label: "", colSpan: 2 },//Total

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
                                    { field: 'TotalHE', label: "Importe" }//Total Horas Extra
                                ]
                            ]
                        ]


                },"grid");
                //
                //grid.renderArray(nomina);
                //grid.renderArray(nomina);
                this.CenterContentPane.addChild(grid);

                //grid.startup();
                //this.CenterContentPane.startup();

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
                /*
                var deferred = request.get(url, {
                    handleAs: "json"
                });
                this.deferred = deferred.promise;
                */
                /*
                request(url, {
                    handleAs: "json"
                }
                ).then(
                    function (text) {
                        console.log(text);
                    }, function (error) {
                        console.log(error);
                    }
                );
                */
                console.log("Se enviara el link: " + url);
            },
            _setWidgetCSS: function () {
                //domStyle.set(this.txtLinkWidget.domNode, "width", "70%");
            }
        });
        parser.parse();
    });