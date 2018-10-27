define([
    "dojo/_base/declare",
    "dojo/Stateful",
    "dgrid/OnDemandGrid",
    "dgrid/ColumnSet",
    'dgrid/extensions/DijitRegistry',
    "dgrid/Selection",
    "dgrid/Editor",
    "dgrid/Keyboard",
    "dojo/dom-style",
    "dijit/form/ValidationTextBox",
    "dijit/form/CheckBox",
    "dijit/form/DateTextBox",
    "myApp/widget/helper/NominaGridHelper.js",
   "dojo/domReady!"
], function (
    declare,
    Stateful,
    OnDemandGrid,
    ColumnSet,
    DijitRegistry,
    Selection,
    Editor,
    Keyboard,
    domStyle,
    ValidationTextBox,
    CheckBox,
    DateTextBox,
    NominaGridHelper
) {
    return declare([OnDemandGrid, ColumnSet, DijitRegistry, Selection, Editor, Keyboard], {

        collection: null,//Al inicio la collection sera null.
        invalidCollection: null,//Contendra los registros que sean invalidos
        auxCollection:null,//Colección que utilizare posteriormente si es necesario.
        columnSets://Esta propiedad se encarga de crear las columnSets dentro del grid.
            [
                [
                    [
                        NominaGridHelper.formatoColumn({ field: 'NumEmpleado', label: 'Clave' }),
                        NominaGridHelper.formatoColumn({ field: 'Nombre', label: 'Nombre' }),
                        NominaGridHelper.formatoMontoColumn({ field: 'Antiguedad', label: 'Antigüedad', editor: 'text', editOn: 'dblclick' }),
                    ]
                ],
                [

                    [//Inicio del segundo ColumnSet
                        NominaGridHelper.formatoColumn({ field: 'FechaPago', label: "Fecha", editor: DateTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:100px;", constraints: { datePattern: 'yyyy/MM/dd' } } }),

                        NominaGridHelper.formatoColumn({ field: 'FechaInicialPago', label: "Fecha Inicio" }),

                        NominaGridHelper.formatoColumn({ field: 'FechaFinalPago', label: "Fecha Fin" }),

                        NominaGridHelper.formatoColumn({ field: 'NumDiasPagados', label: "Dias Pagados" }),

                        NominaGridHelper.formatoColumn({ field: 'Banco', label: "Banco", }),

                        NominaGridHelper.formatoColumn({ field: 'Clabe', label: "Clabe" }),

                        NominaGridHelper.formatoColumn({ field: 'Monto', label: "Monto", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } })

                        ,

                        NominaGridHelper.formatoMontoColumn({ field: 'Sueldo_Gravado', editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' }, label: "Gravado" }),// Sueldo Gravado

                        NominaGridHelper.formatoMontoColumn({ field: 'Sueldo_Exento', label: "Exento", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//Sueldo Exento

                        NominaGridHelper.formatoMontoColumn({field: 'Aguinaldo_Gravado',label: "Gravado",editor: ValidationTextBox,editOn: 'dblclick',autoSave: true,editorArgs: {style: "width:110px",regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'}}),//Aguinaldo_Gravado

                        NominaGridHelper.formatoMontoColumn({ field: 'Aguinaldo_Exento', label: "Exento", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//Aguinaldo Exento

                        NominaGridHelper.formatoMontoColumn({ field: 'PTU_Gravado', label: "Gravado", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//PTU Gravado

                        NominaGridHelper.formatoMontoColumn({ field: 'PTU_Exento', label: "Exento", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//PTU_Exento


                        NominaGridHelper.formatoMontoColumn({ field: 'RGMDyH_Gravado', label: "Gravado", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//Reembolso de Gastos Medicos dentales y hospitalarios Gravado.

                        NominaGridHelper.formatoMontoColumn({ field: 'RGMDyH_Exento', label: "Exento", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),

                        NominaGridHelper.formatoMontoColumn({
                            field: 'FDA_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoMontoColumn(
                        {
                            field: 'FDA_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                            }),

                        NominaGridHelper.formatoMontoColumn({
                            field: 'CDA_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),

                        NominaGridHelper.formatoMontoColumn({
                            field: 'CDA_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),

                        NominaGridHelper.formatoMontoColumn({
                            field: 'CCTPP_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoMontoColumn({
                            field: 'CCTPP_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PP_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Premio de Puntualidad
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PP_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Premio de Puntualidad
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PSV_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima de Seguro de vida
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PSV_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima de Seguro de vida
                        NominaGridHelper.formatoMontoColumn({
                            field: 'SGMM_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Seguro de Gastos Médicos Mayores
                        NominaGridHelper.formatoMontoColumn({
                            field: 'SGMM_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Seguro de Gastos Médicos Mayores

                        NominaGridHelper.formatoMontoColumn({
                            field: 'CSPPP_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas Sindicales Pagadas por el patron
                        NominaGridHelper.formatoMontoColumn({
                            field: 'CSPPP_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas Sindicales Pagadas por el patron
                        NominaGridHelper.formatoMontoColumn({
                            field: 'SPI_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Subsidios por incapacidad
                        NominaGridHelper.formatoMontoColumn({
                            field: 'SPI_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Subsidios por incapacidad
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Becas_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Becas
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Becas_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Becas
                        NominaGridHelper.formatoMontoColumn({
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
                                concatenarError(object, data, 0, "HE_Gravado");
                                return formatoDivTotal(data, td);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Gravado", domStyle);//Bandera 2 para deducciones
                            }
                        }),//Horas Extra
                        NominaGridHelper.formatoMontoColumn({
                            field: 'HE_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Horas Extra
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PrimaD_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Dominical
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PrimaD_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Dominical
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PrimaV_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Vacacional
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PrimaV_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Vacacional
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PrimaA_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Antigüead
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PrimaA_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Antigüedad
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PPS_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Pagos por Separación
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PPS_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Pagos por Separación
                        NominaGridHelper.formatoMontoColumn({
                            field: 'SDR_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Seguro de retiro
                        NominaGridHelper.formatoMontoColumn({
                            field: 'SDR_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Seguro de retiro
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Indeminizaciones_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Indeminizaciones
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Indeminizaciones_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Indeminizaciones
                        NominaGridHelper.formatoMontoColumn({
                            field: 'RPF_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Reembolso por funeral
                        NominaGridHelper.formatoMontoColumn({
                            field: 'RPF_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Reembolso por funeral
                        NominaGridHelper.formatoMontoColumn({
                            field: 'CDSSPPP_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas de seguridad social pagadas por el patrón
                        NominaGridHelper.formatoMontoColumn({
                            field: 'CDSSPPP_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas de seguridad social pagadas por el patrón
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Comisiones_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Comisiones
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Comisiones_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Comisiones
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ValesD_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de Despensa
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ValesD_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de Despensa
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ValesR_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de restaurante
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ValesR_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de restaurante
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ValesG_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de gasolina
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ValesG_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de gasolina
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ValesRopa_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de ropa
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ValesRopa_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de ropa
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaRenta_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para renta
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaRenta_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para renta
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaEscolar_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Articulos escolares
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaEscolar_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Articulos escolares
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaAnteojos_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Anteojos
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaAnteojos_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Anteojos
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaTransporte_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Transporte
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaTransporte_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Transporte
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaGF_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Gastos de funeral
                        NominaGridHelper.formatoMontoColumn({
                            field: 'AyudaGF_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Gasto de funeral
                        NominaGridHelper.formatoMontoColumn({
                            field: 'OIPS_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Otros ingresos por salario
                        NominaGridHelper.formatoMontoColumn({
                            field: 'OIPS_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Otros ingresos por salario 
                        NominaGridHelper.formatoMontoColumn({
                            field: 'JPHDR_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Jubilaciones, pensiones o haberes de retiro
                        NominaGridHelper.formatoMontoColumn({
                            field: 'JPHDR_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Jubilaciones, pensiones o haberes de retiro
                        NominaGridHelper.formatoMontoColumn({
                            field: 'JPHDRParciales_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Jubilaciones, pensiones o haberes de retiro parciales
                        NominaGridHelper.formatoMontoColumn({
                            field: 'JPHDRParciales_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Jubilaciones, pensiones o haberes de retiro parciales
                        NominaGridHelper.formatoMontoColumn({
                            field: 'IEAOTV_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ingresos en acciones o títulos valor que representan bienes
                        NominaGridHelper.formatoMontoColumn({
                            field: 'IEAOTV_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ingresos en acciones o títulos valor que representan bienes
                        NominaGridHelper.formatoColumn({
                            field: 'IAAS_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ingresos asimilados a salarios
                        NominaGridHelper.formatoMontoColumn({
                            field: 'IAAS_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ingresos asimilados a salarios
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Alimentacion_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Alimentacion
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Alimentacion_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Alimentacion
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Habitacion_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Habitacion
                        NominaGridHelper.formatoMontoColumn({
                            field: 'Habitacion_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Habitacion
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PAsistecia_Gravado',
                            label: "Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Premios por asistencia
                        NominaGridHelper.formatoMontoColumn({
                            field: 'PAsistecia_Exento',
                            label: "Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Premios por asistencia
                        {
                            field: 'TotalPercepcionesGravado',
                            label: "Gravado",
                            autoSave:true,
                            set: function (object) {
                                console.log(object);
                                return a(object);
                            }
                        },//Total
                        {
                            field: 'TotalPercepcionesExento',
                            label: "Exento",
                            autoSave: true,
                            set: function (object) {
                                return getTotalPercepcionesExento(object);
                            }
                        },//Total

                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteSeguridadSocial',
                            label: 'Seguridad Social',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//ImporteSeguridadSocial
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteISR',
                            label: 'ISR',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//ImporteISR
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteARCEAV',
                            label: 'Aportaciones a Retiro, Cesantía en Edad Avanzada y Vejez',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Aportaciones a retiro, cesantía en edad avanzada y vejez
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteOtros',
                            label: 'Otros',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Otros
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteDPI',
                            label: 'Descuento por Incapacidad',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Descuento por incapacidad
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImportePA',
                            label: 'Pensión Alimenticia',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe pensión alimenticia
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteRenta',
                            label: 'Renta',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//ImporteRenta
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImportePPFNDLVPLT',
                            label: 'Préstamos Provenientes del Fondo Nacional de la Vivienda para los Trabajadores',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Préstamos provenientes del Fondo nacional de la vivienda para los trabajadores
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImportePPCDV',
                            label: 'Pago por Crédito de Vivienda',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Pago Por Credito De Vivienda
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteINFONACOT',
                            label: 'Pago de Abonos INFONACOT',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe de Pago de abonos INFONACOT
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteADS',
                            label: 'Anticipo de Salarios',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe anticipo de Salarios
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImportePHCEAT',
                            label: 'Pagos Hechos con Exceso al Trabajador',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Pagos Hechos con Exceso al Trabajador importe
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteErrores',
                            label: 'ERRORES',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Errores
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImportePerdidas',
                            label: 'Pérdidas',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Perdidas
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteAverias',
                            label: 'Averías',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Averías
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteAdquisicionArticulos',
                            label: 'Adquisición de Artículos',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Adquisición de articulos
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteCuotasConstitucion',
                            label: 'Cuotas para la Constitución y Fomento de Sociedades Cooperativas y de Cajas de Ahorro',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteCuotasSindicales',
                            label: 'Cuotas Sindicales',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Cuotas Sindicales
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteAusencia',
                            label: 'Ausencia',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Ausencia
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteObreroP',
                            label: 'Cuotas Obrero Patronales',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe cutoas obrero patronales
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteImpuestosL',
                            label: 'Impuestos Locales',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe impuestos locales
                        NominaGridHelper.formatoMontoColumn({
                            field: 'ImporteAportacionesV',
                            label: 'Aportaciones Voluntarias',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe aportaciones voluntarias
                        {
                            field: 'TotalDeducciones',
                            label: "Deducciones", colSpan: 2,
                            autoSave: true,
                            set: function (object) {
                                return getTotalDeducciones(object);
                            }
                        },//Total Deducciones
                        
                        NominaGridHelper.formatoColumn({
                            field: 'RiesgoTrabajoDias',
                            label: "Dias"
                        }),//Riesgo de trabajo dias

                        NominaGridHelper.formatoColumn({
                            field: 'RiesgoTrabajoDescuento',
                            label: "Descuento"
                        }),//Riesgo de trabajo Descuento

                        NominaGridHelper.formatoColumn({
                            field: 'RiesgoEnfermedadDias',
                            label: "Dias"
                        }),//Riesgo Enfermedades en General dias.
                        NominaGridHelper.formatoColumn({
                            field: 'RiesgoEnfermedadDescuento',
                            label: "Descuento"
                        }),//Riesgo Enferemedades en General Descuento.
                        NominaGridHelper.formatoColumn({
                            field: 'MaternidadDias',
                            label: "Dias"
                        }),//Maternidad dias.
                        NominaGridHelper.formatoColumn({
                            field: 'MaternidadDescuento',
                            label: "Descuento"
                        }),//Maternidad Descuento.
                        NominaGridHelper.formatoColumn({
                            field: 'TotalIncapacidadesDias',
                            label: "Días"
                        }),//Total de las incapacidades Dias
                        NominaGridHelper.formatoColumn({
                            field: 'TotalIncapacidadesDescuento',
                            label: "Descuento"
                        }),//Total de las incapacidades Descuento

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExD_Dias',
                            label: "Dias"
                        }),//HorasExtraDobles dias.

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExD_Horas',
                            label: "Horas"
                        }),//Horas Extra Dobles horas.

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExD_Importe',
                            label: "Importe"
                        }),//Horas Extras Dobles importe

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExT_Dias',
                            label: "Dias"
                        }),//HorasExtra Triples dias.
                        NominaGridHelper.formatoColumn({
                            field: 'HorasExT_Horas',
                            label: "Horas"
                        }),//Horas Extra Triples horas.
                        NominaGridHelper.formatoColumn({
                            field: 'HorasExT_Importe',
                            label: "Importe"
                        }),//Horas Extras Triples importe

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExS_Dias',
                            label: "Dias"
                        }),//Horas Extra Simples dias.

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExS_Horas',
                            label: "Horas"
                        }),//Horas Extra Simples horas.

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExS_Importe',
                            label: "Importe"
                        }),//Horas Extras Simples importe
                        NominaGridHelper.formatoColumn({
                            field: 'TotalHE',
                            label: "Total Horas Extra"
                        }),//Total Horas Extra

                        NominaGridHelper.formatoColumn({//Reintegro de ISR pagado en exeso
                            field: 'Reintegro_ISR',
                            label: 'Reintegro de ISR pagado en exceso (siempre que no haya sido enterado al SAT).',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoColumn({//Subsidio para el empleo efectivamente entregado
                            field: 'SubsidioEmpleoEfecEntregado',
                            label: 'Subsidio para el Empleo Efectivamente Entregado',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoColumn({//Viáticos (entregados al trabajador).
                            field: 'ViaticosEntregadosTrabajador',
                            label: 'Viáticos (Entregados al trabajador).',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoColumn({//Aplicación de saldo a favor por compensación anual.
                            field: 'AplicacionSaldoAFavorCompensacionAnual',
                            label: 'Aplicación de Saldo a Favor por Compensación Anual  Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoColumn({//Pagos distintos a los listados y que no deben considerarse como ingreso por sueldos, salarios o ingresos asimilados..
                            field: 'PagosDistintosALosListados',
                            label: 'Pagos Distintos a los Listados y que no Deben Considerarse como Ingreso por Sueldos, Salarios o Ingresos Asimilados.',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        })/*
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
                        }*/
                    ],
                    [
                        NominaGridHelper.formatoColumn({ field: 'totalGAB', label: 'Total', colSpan: 7 }),
                        NominaGridHelper.formatoColumn({ field: 'sueldoH', label: 'Sueldo', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'aguinaldoH', label: 'Aguinaldo', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'PTUH', label: 'PTU', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'RDGMDYHH', label: 'Reembolso de Gastos Médicos Dentales y Hospitalarios', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'FONDODEAHORROH', label: 'Fondo de ahorro', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'CAJADEAHORROH', label: 'Caja de ahorro', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'CONTRIBUCIONESACARGODELTRABAJADORPAGADASPORELPATRON', label: 'Contribuciones a cargo del trabajador pagadas por el patrón', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'PREMIOPUNTURALIDADH', label: 'Premio puntualidad', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'PRIMADESEGURODEVIDAH', label: 'Prima de seguro de vida', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'SEGURODEGASTOSMEDICOSMAYORESH', label: 'Seguro de gastos médicos mayores', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'CUOTASSINDICALESPAGADASPORELPATRONH', label: 'Cuotas sindicales pagadas por el patrón', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'SUBSIDIOSPORINCAPACIDADH', label: 'Subsidios por incapacidad', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'BECASH', label: 'Becas', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'HORASEXTRAH', label: 'Horas extra', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'PRIMADOMINICALH', label: 'Prima dominical', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'PRIMAVACACIONALH', label: 'Prima vacacional', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'PRIMAANTIGUEDADH', label: 'Prima antigüedad', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'PAGOSPORSEPARACIONH', label: 'Pagos por separación', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'SEGURODERETIROH', label: 'Seguro de retiro', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'INDEMINIZACIONESH', label: 'Indeminizaciones', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'REEMBOLSOPORFUNERALH', label: 'Reembolso por funeral', colSpan: 2 }), 
                        NominaGridHelper.formatoColumn({ field: 'CUOTASDESEGURIDADSOCIALPAGADDASPORELPATRONH', label: 'Cuotas de seguridad social pagadas por el patrón', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'ComisioenesH', label: 'Comisiones', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'VALESDEDESPENSAH', label: 'Vales de despensa', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'VALESDERESTAURANTEH', label: 'Vales de restaurante', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'VALESDEGASOLINAH', label: 'Vales de gasolina', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'VALESROPAH', label: 'Vales de ropa', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'AYUDAPARARENTAH', label: 'Ayuda para renta', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'AYUDAPARAARTICULOSESCOLARESH', label: 'Ayuda para artículos escolares', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'ANTEOJOSH', label: 'Ayuda para anteojos', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'TRANSPORTEH', label: 'Ayuda para transporte', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'AYUDAPARAGASTOSDEFUNERALH', label: 'Ayuda para gastos de funeral', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'OTROSINGRESOSPORSALARIOSH', label: 'Otros ingresos por salarios', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'JUBILACIONESPENSIONESOHABERESDERETIROH', label: 'Jubilaciones, pensiones o haberes de retiro', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'JUBILACIONESPENSIONESOHABERESDERETIROENPARCIALIDADESH', label: 'Jubilaciones, pensiones o haberes de retiro en parcialidades', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'INGRESOSENACCIONESOTITULOSH', label: 'Ingresos en Acciones o Títulos Valor que Representen Bienes', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'INGRESOSASIMILADOSASALARIOSH', label: 'Ingresos Asimilados a Salarios', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'ALIMENTACIONH', label: 'Alimentación', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'HABITACIONH', label: 'Habitación', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'PREMIOSPORASISTENCIAH', label: 'Premios por asistencia', colSpan: 2 }),

                        NominaGridHelper.formatoColumn({ field: 'TOTALPERCEPCIONESH', label: 'Total Percepciones', colSpan: 2 }),

                        NominaGridHelper.formatoColumn({ field: 'ImporteSeguridadSocialH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ISRH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ISRH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ISRH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ISRH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ImporteSeguridadSocialH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ISRH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ISRH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ISRH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'ISRH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'APORTACIONESARETIROEDADAVANZADA', label: 'Total', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'RIESGODETRABAJOH', label: 'Riesgo de trabajo', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'RIESGOENFERMEDADESENGENERALH', label: 'Riesgo enfermedades en general', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'MATERNIDADH', label: 'Maternidad', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'TOTALINCAPACIDADESH', label: 'Total incapacidades', colSpan: 2 }),
                        NominaGridHelper.formatoColumn({ field: 'HORASEXTRADOBLESH', label: 'Horas extra dobles', colSpan: 3 }),
                        NominaGridHelper.formatoColumn({ field: 'HORASEXTRATRIPLESH', label: 'Horas extra triples', colSpan: 3 }),
                        NominaGridHelper.formatoColumn({ field: 'HORASEXTRASIMPLESH', label: 'Horas extra simples', colSpan: 3 }),
                        NominaGridHelper.formatoColumn({ field: 'IMPORTEHHH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'IMPORTEHHH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'IMPORTEHHH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'IMPORTEHHH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'IMPORTEHHH', label: 'Importe', colSpan: 1 }),
                        NominaGridHelper.formatoColumn({ field: 'IMPORTEHHH', label: 'Importe', colSpan: 1 })
                    ]
                ]//Fin del Segundo ColumnSet
            ]


    });
});