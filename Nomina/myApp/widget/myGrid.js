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

        columnSets:
            [
                [
                    [
                        NominaGridHelper.formatoColumn({ field: 'NumEmpleado', label: 'Clave' }),
                        NominaGridHelper.formatoColumn({ field: 'Nombre', label: 'Nombre' }),
                        NominaGridHelper.formatoColumn({ field: 'Antiguedad', label: 'Antigüedad', editor: 'text', editOn: 'dblclick' }),
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

                        NominaGridHelper.formatoColumn({ field: 'Monto', label: "Monto", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),

                        NominaGridHelper.formatoColumn({ field: 'Sueldo_Gravado', editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' }, label: "Sueldo Gravado" }),// Sueldo Gravado

                        NominaGridHelper.formatoColumn({ field: 'Sueldo_Exento', label: "Sueldo Exento", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//Sueldo Exento

                        NominaGridHelper.formatoColumn({field: 'Aguinaldo_Gravado',label: " Aguinaldo Gravado",editor: ValidationTextBox,editOn: 'dblclick',autoSave: true,editorArgs: {style: "width:110px",regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'}}),//Aguinaldo_Gravado

                        NominaGridHelper.formatoColumn({ field: 'Aguinaldo_Exento', label: "Aguinaldo Exento", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//Aguinaldo Exento

                        NominaGridHelper.formatoColumn({ field: 'PTU_Gravado', label: "PTU Gravado", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//PTU Gravado

                        NominaGridHelper.formatoColumn({ field: 'PTU_Exento', label: "PTU Exento", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//PTU_Exento
                        NominaGridHelper.formatoColumn({ field: 'RGMDyH_Gravado', label: "Reembolso de Gastos Médicos Dentales y Hospitalarios Gravado", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),//Reembolso de Gastos Medicos dentales y hospitalarios Gravado.

                        NominaGridHelper.formatoColumn({ field: 'RGMDyH_Exento', label: "Reembolso de Gastos Médicos Dentales y Hospitalarios Exento", editor: ValidationTextBox, editOn: 'dblclick', autoSave: true, editorArgs: { style: "width:110px", regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' } }),

                        NominaGridHelper.formatoColumn({
                            field: 'FDA_Gravado',
                            label: "Fondo de ahorro Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoColumn(
                        {
                            field: 'FDA_Exento',
                            label: "Fondo de ahorro Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                            }),

                        NominaGridHelper.formatoColumn({
                            field: 'CDA_Gravado',
                            label: "Caja de ahorro Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),

                        NominaGridHelper.formatoColumn({
                            field: 'CDA_Exento',
                            label: "Caja de ahorro Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),

                        NominaGridHelper.formatoColumn({
                            field: 'CCTPP_Gravado',
                            label: "Contribuciones a Cargo del Trabajador Pagadas por el Patrón  Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoColumn({
                            field: 'CCTPP_Exento',
                            label: "Contribuciones a Cargo del Trabajador Pagadas por el Patrón  Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),
                        NominaGridHelper.formatoColumn({
                            field: 'PP_Gravado',
                            label: "Premio Puntualidad Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Premio de Puntualidad
                        NominaGridHelper.formatoColumn({
                            field: 'PP_Exento',
                            label: "Premio Puntualidad Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Premio de Puntualidad
                        NominaGridHelper.formatoColumn({
                            field: 'PSV_Gravado',
                            label: "Prima de Seguro de Vida Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima de Seguro de vida
                        NominaGridHelper.formatoColumn({
                            field: 'PSV_Exento',
                            label: "Prima de Seguro de Vida Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima de Seguro de vida
                        NominaGridHelper.formatoColumn({
                            field: 'SGMM_Gravado',
                            label: "Seguro de Gastos Médicos Mayores Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Seguro de Gastos Médicos Mayores
                        NominaGridHelper.formatoColumn({
                            field: 'SGMM_Exento',
                            label: "Seguro de Gastos Médicos Mayores Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Seguro de Gastos Médicos Mayores

                        NominaGridHelper.formatoColumn({
                            field: 'CSPPP_Gravado',
                            label: "Cuotas Sindicales Pagadas por el Patrón  Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas Sindicales Pagadas por el patron
                        NominaGridHelper.formatoColumn({
                            field: 'CSPPP_Exento',
                            label: "Cuotas Sindicales Pagadas por el Patrón  Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas Sindicales Pagadas por el patron
                        NominaGridHelper.formatoColumn({
                            field: 'SPI_Gravado',
                            label: "Subsidios por Incapacidad Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Subsidios por incapacidad
                        NominaGridHelper.formatoColumn({
                            field: 'SPI_Exento',
                            label: "Subsidios por Incapacidad Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Subsidios por incapacidad
                        NominaGridHelper.formatoColumn({
                            field: 'Becas_Gravado',
                            label: "Becas Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Becas
                        NominaGridHelper.formatoColumn({
                            field: 'Becas_Exento',
                            label: "Becas Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Becas
                        NominaGridHelper.formatoColumn({
                            field: 'HE_Gravado',
                            label: "Horas Extra Gravado",
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
                                return formatoHeader(node, 2, "Horas Extra <br/>  Gravado", domStyle);//Bandera 2 para deducciones
                            }
                        }),//Horas Extra
                        NominaGridHelper.formatoColumn({
                            field: 'HE_Exento',
                            label: "Horas Extra Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Horas Extra
                        NominaGridHelper.formatoColumn({
                            field: 'PrimaD_Gravado',
                            label: "Prima Dominical Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Dominical
                        NominaGridHelper.formatoColumn({
                            field: 'PrimaD_Exento',
                            label: "Prima Dominical Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Dominical
                        NominaGridHelper.formatoColumn({
                            field: 'PrimaV_Gravado',
                            label: "Prima Vacacional Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Vacacional
                        NominaGridHelper.formatoColumn({
                            field: 'PrimaV_Exento',
                            label: "Prima Vacacional Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Vacacional
                        NominaGridHelper.formatoColumn({
                            field: 'PrimaA_Gravado',
                            label: "Prina Antigüedad Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Antigüead
                        NominaGridHelper.formatoColumn({
                            field: 'PrimaA_Exento',
                            label: "Prima Antigüedad Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Prima Antigüedad
                        NominaGridHelper.formatoColumn({
                            field: 'PPS_Gravado',
                            label: "Pagos por Separación Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Pagos por Separación
                        NominaGridHelper.formatoColumn({
                            field: 'PPS_Exento',
                            label: "Pagos por Separación Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Pagos por Separación
                        NominaGridHelper.formatoColumn({
                            field: 'SDR_Gravado',
                            label: "Seguro de Retiro Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Seguro de retiro
                        NominaGridHelper.formatoColumn({
                            field: 'SDR_Exento',
                            label: "Seguro de Retiro Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Seguro de retiro
                        NominaGridHelper.formatoColumn({
                            field: 'Indeminizaciones_Gravado',
                            label: "Indeminizaciones Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Indeminizaciones
                        NominaGridHelper.formatoColumn({
                            field: 'Indeminizaciones_Exento',
                            label: "Indeminizaciones Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Indeminizaciones
                        NominaGridHelper.formatoColumn({
                            field: 'RPF_Gravado',
                            label: "Reembolso por Funeral Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Reembolso por funeral
                        NominaGridHelper.formatoColumn({
                            field: 'RPF_Exento',
                            label: "Reembolso por Funeral Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Reembolso por funeral
                        NominaGridHelper.formatoColumn({
                            field: 'CDSSPPP_Gravado',
                            label: "Cuotas de seguridad social pagadas por el patrón Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas de seguridad social pagadas por el patrón
                        NominaGridHelper.formatoColumn({
                            field: 'CDSSPPP_Exento',
                            label: "Cuotas de seguridad social pagadas por el patrón Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas de seguridad social pagadas por el patrón
                        NominaGridHelper.formatoColumn({
                            field: 'Comisiones_Gravado',
                            label: "Comisiones Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Comisiones
                        NominaGridHelper.formatoColumn({
                            field: 'Comisiones_Exento',
                            label: "Comisiones Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Comisiones
                        NominaGridHelper.formatoColumn({
                            field: 'ValesD_Gravado',
                            label: "Vales de Despensa Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de Despensa
                        NominaGridHelper.formatoColumn({
                            field: 'ValesD_Exento',
                            label: "Vales de Despensa Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de Despensa
                        NominaGridHelper.formatoColumn({
                            field: 'ValesR_Gravado',
                            label: "Vales de Restaurante Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de restaurante
                        NominaGridHelper.formatoColumn({
                            field: 'ValesR_Exento',
                            label: "Vales de Restaurante Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de restaurante
                        NominaGridHelper.formatoColumn({
                            field: 'ValesG_Gravado',
                            label: "Vales de Gasolina Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de gasolina
                        NominaGridHelper.formatoColumn({
                            field: 'ValesG_Exento',
                            label: "Vales de Gasolina Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de gasolina
                        NominaGridHelper.formatoColumn({
                            field: 'ValesRopa_Gravado',
                            label: "Vales de Ropa Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de ropa
                        NominaGridHelper.formatoColumn({
                            field: 'ValesRopa_Exento',
                            label: "Vales de Ropa Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Vales de ropa
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaRenta_Gravado',
                            label: "Ayuda para Renta Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para renta
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaRenta_Exento',
                            label: "Ayuda para Renta Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para renta
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaEscolar_Gravado',
                            label: "Ayuda para Artículos Escolares Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Articulos escolares
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaEscolar_Exento',
                            label: "Ayuda para Artículos Escolares Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Articulos escolares
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaAnteojos_Gravado',
                            label: "Ayuda para Anteojos Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Anteojos
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaAnteojos_Exento',
                            label: "Ayuda para Anteojos Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Anteojos
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaTransporte_Gravado',
                            label: "Ayuda para Transporte Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Transporte
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaTransporte_Exento',
                            label: "Ayuda para Transporte Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Transporte
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaGF_Gravado',
                            label: "Ayuda para Gastos de Funeral Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Gastos de funeral
                        NominaGridHelper.formatoColumn({
                            field: 'AyudaGF_Exento',
                            label: "Ayuda para Gastos de Funeral Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ayuda para Gasto de funeral
                        NominaGridHelper.formatoColumn({
                            field: 'OIPS_Gravado',
                            label: "Otros Ingresos por Salario Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Otros ingresos por salario
                        NominaGridHelper.formatoColumn({
                            field: 'OIPS_Exento',
                            label: "Otros Ingresos por Salario Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Otros ingresos por salario 
                        NominaGridHelper.formatoColumn({
                            field: 'JPHDR_Gravado',
                            label: "Jubilaciones, Pensiones o Haberes de Retiro Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Jubilaciones, pensiones o haberes de retiro
                        NominaGridHelper.formatoColumn({
                            field: 'JPHDR_Exento',
                            label: "Jubilaciones, Pensiones o Haberes de Retiro Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Jubilaciones, pensiones o haberes de retiro
                        NominaGridHelper.formatoColumn({
                            field: 'JPHDRParciales_Gravado',
                            label: "Jubilaciones, Pensiones o Haberes de Retiro en Parcialidades Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Jubilaciones, pensiones o haberes de retiro parciales
                        NominaGridHelper.formatoColumn({
                            field: 'JPHDRParciales_Exento',
                            label: "Jubilaciones, Pensiones o Haberes de Retiro en Parcialidades Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Jubilaciones, pensiones o haberes de retiro parciales
                        NominaGridHelper.formatoColumn({
                            field: 'IEAOTV_Gravado',
                            label: "Ingresos en Acciones o Títulos Valor que Representen Bienes Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ingresos en acciones o títulos valor que representan bienes
                        NominaGridHelper.formatoColumn({
                            field: 'IEAOTV_Exento',
                            label: "Ingresos en Acciones o Títulos Valor que Representen Bienes Exento",
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
                            label: "Ingresos Asimilados a Salarios Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ingresos asimilados a salarios
                        NominaGridHelper.formatoColumn({
                            field: 'IAAS_Exento',
                            label: "Ingresos Asimilados a Salarios Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Ingresos asimilados a salarios
                        NominaGridHelper.formatoColumn({
                            field: 'Alimentacion_Gravado',
                            label: "Alimentación Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Alimentacion
                        NominaGridHelper.formatoColumn({
                            field: 'Alimentacion_Exento',
                            label: "Alimentación Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Alimentacion
                        NominaGridHelper.formatoColumn({
                            field: 'Habitacion_Gravado',
                            label: "Habitación Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Habitacion
                        NominaGridHelper.formatoColumn({
                            field: 'Habitacion_Exento',
                            label: "Habitación Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Habitacion
                        NominaGridHelper.formatoColumn({
                            field: 'PAsistecia_Gravado',
                            label: "Premios por Asistencia Gravado",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Premios por asistencia
                        NominaGridHelper.formatoColumn({
                            field: 'PAsistecia_Exento',
                            label: "Premios por Asistencia Exento",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Premios por asistencia
                        NominaGridHelper.formatoColumn({
                            field: 'TotalPercepcionesGravado',
                            label: "Total Percepciones Gravado",
                            autoSave:true,
                            set: function (object) {
                                console.log(object);
                                return a(object);
                            }
                        }),//Total
                        NominaGridHelper.formatoColumn({
                            field: 'TotalPercepcionesExento',
                            label: "Exento",
                            autoSave: true,
                            set: function (object) {
                                return getTotalPercepcionesExento(object);
                            }
                        }),//Total

                        NominaGridHelper.formatoColumn({
                            field: 'ImporteSeguridadSocial',
                            label: 'Seguridad Social Importe ',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//ImporteSeguridadSocial
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteISR',
                            label: 'ISR Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//ImporteISR
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteARCEAV',
                            label: 'Aportaciones a Retiro, Cesantía en Edad Avanzada y Vejez importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Aportaciones a retiro, cesantía en edad avanzada y vejez
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteOtros',
                            label: 'Otros Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Otros
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteDPI',
                            label: 'Descuento por Incapacidad Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Descuento por incapacidad
                        NominaGridHelper.formatoColumn({
                            field: 'ImportePA',
                            label: 'Pensión Alimenticia Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe pensión alimenticia
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteRenta',
                            label: 'Renta Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//ImporteRenta
                        NominaGridHelper.formatoColumn({
                            field: 'ImportePPFNDLVPLT',
                            label: 'Préstamos Provenientes del Fondo Nacional de la Vivienda para los Trabajadores Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Préstamos provenientes del Fondo nacional de la vivienda para los trabajadores
                        NominaGridHelper.formatoColumn({
                            field: 'ImportePPCDV',
                            label: 'Pago por Crédito de Vivienda Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Pago Por Credito De Vivienda
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteINFONACOT',
                            label: 'Pago de Abonos INFONACOT Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe de Pago de abonos INFONACOT
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteADS',
                            label: 'Anticipo de Salarios Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe anticipo de Salarios
                        NominaGridHelper.formatoColumn({
                            field: 'ImportePHCEAT',
                            label: 'Pagos Hechos con Exceso al Trabajador importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Pagos Hechos con Exceso al Trabajador importe
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteErrores',
                            label: 'ERRORES Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Errores
                        NominaGridHelper.formatoColumn({
                            field: 'ImportePerdidas',
                            label: 'Pérdidas Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Perdidas
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteAverias',
                            label: 'Averías Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Averías
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteAdquisicionArticulos',
                            label: 'Adquisición de Artículos Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Adquisición de articulos
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteCuotasConstitucion',
                            label: 'Cuotas para la Constitución y Fomento de Sociedades Cooperativas y de Cajas de Ahorro Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteCuotasSindicales',
                            label: 'Cuotas Sindicales Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Cuotas Sindicales
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteAusencia',
                            label: 'Ausencia Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe Ausencia
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteObreroP',
                            label: 'Cuotas Obrero Patronales Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe cutoas obrero patronales
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteImpuestosL',
                            label: 'Impuestos Locales Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe impuestos locales
                        NominaGridHelper.formatoColumn({
                            field: 'ImporteAportacionesV',
                            label: 'Aportaciones Voluntarias Importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            }
                        }),//Importe aportaciones voluntarias
                        NominaGridHelper.formatoColumn({
                            field: 'TotalDeducciones',
                            label: "Total Deducciones", colSpan: 2,
                            autoSave: true,
                            set: function (object) {
                                return getTotalDeducciones(object);
                            }
                        }),//Total Deducciones
                        
                        NominaGridHelper.formatoColumn({
                            field: 'RiesgoTrabajoDias',
                            label: "Riesgo de trabajo Dias"
                        }),//Riesgo de trabajo dias

                        NominaGridHelper.formatoColumn({
                            field: 'RiesgoTrabajoDescuento',
                            label: "Riesgo de Trabajo Descuento"
                        }),//Riesgo de trabajo Descuento

                        NominaGridHelper.formatoColumn({
                            field: 'RiesgoEnfermedadDias',
                            label: "Riesgo Enfermedades en General Dias"
                        }),//Riesgo Enfermedades en General dias.
                        NominaGridHelper.formatoColumn({
                            field: 'RiesgoEnfermedadDescuento',
                            label: "Riesgo Enfermedades en General Descuento"
                        }),//Riesgo Enferemedades en General Descuento.
                        NominaGridHelper.formatoColumn({
                            field: 'MaternidadDias',
                            label: "Maternidad Dias"
                        }),//Maternidad dias.
                        NominaGridHelper.formatoColumn({
                            field: 'MaternidadDescuento',
                            label: "Maternidad Descuento"
                        }),//Maternidad Descuento.
                        NominaGridHelper.formatoColumn({
                            field: 'TotalIncapacidadesDias',
                            label: "Total Incapacidades Días"
                        }),//Total de las incapacidades Dias
                        NominaGridHelper.formatoColumn({
                            field: 'TotalIncapacidadesDescuento',
                            label: "Total Incapacidades Descuento"
                        }),//Total de las incapacidades Descuento

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExD_Dias',
                            label: "Horas Extra Dobles Dias"
                        }),//HorasExtraDobles dias.

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExD_Horas',
                            label: "Horas Extras Dobles Horas"
                        }),//Horas Extra Dobles horas.

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExD_Importe',
                            label: "Horas Extras Dobles Importe"
                        }),//Horas Extras Dobles importe

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExT_Dias',
                            label: "Horas Extra Triples Dias"
                        }),//HorasExtra Triples dias.
                        NominaGridHelper.formatoColumn({
                            field: 'HorasExT_Horas',
                            label: "Horas Extra Triples Horas"
                        }),//Horas Extra Triples horas.
                        NominaGridHelper.formatoColumn({
                            field: 'HorasExT_Importe',
                            label: "Horas Extra Triples Importe"
                        }),//Horas Extras Triples importe

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExS_Dias',
                            label: "Horas Extra Simples Dias"
                        }),//Horas Extra Simples dias.

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExS_Horas',
                            label: "Horas Extra Simples Horas"
                        }),//Horas Extra Simples horas.

                        NominaGridHelper.formatoColumn({
                            field: 'HorasExS_Importe',
                            label: "Horas Extra Simples Importe"
                        }),//Horas Extras Simples importe
                        NominaGridHelper.formatoColumn({
                            field: 'TotalHE',
                            label: "Total Horas Extra Importe"
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
                    ]//Fin del Segundo ColumnSet
                ]
            ]


    });
});