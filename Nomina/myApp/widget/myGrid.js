define([
    "dojo/_base/declare",
    "dgrid/OnDemandGrid",
    "dgrid/ColumnSet",
    'dgrid/extensions/DijitRegistry',
    "dgrid/Selection",
    "dgrid/Editor",
    "dgrid/Keyboard",
    "dojo/dom-style",
    "dijit/form/ValidationTextBox",
    "dijit/form/CheckBox"
], function (
    declare,
    OnDemandGrid,
    ColumnSet,
    DijitRegistry,
    Selection,
    Editor,
    Keyboard,
    domStyle,
    ValidationTextBox,
    CheckBox
) {

    return declare([OnDemandGrid, ColumnSet, DijitRegistry, Selection, Editor, Keyboard], {
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
                                return formatoCentrarContenido(data,true);//Corregir en validaciones
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
                                return formatoCentrarContenido(data, true);//Corregir en validaciones
                            }
                        },
                        {
                            field: 'Antiguedad',
                            label: 'Antigüedad',
                            renderCell: function (object, data, td, options) {
                                return formatoCentrarContenido(data, true);//Corregir en validaciones
                            },
                            editor: 'text',
                            editOn: 'dblclick'
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
                                return formatoCentrarContenido(data, true);//Corregir en validaciones
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
                                return formatoCentrarContenido(data, true);//Corregir en validaciones
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 1, "Fecha Inicio", domStyle);
                            }
                        },
                        {
                            field: 'FechaFinalPago',
                            label: "Fecha Fin",
                            renderCell: function (object, data, td, options) {
                                return formatoCentrarContenido(data, true);//Corregir en validaciones
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 1, "Fecha Fin", domStyle);
                            }
                        },
                        {
                            field: 'NumDiasPagados',
                            label: "Dias Pagados",
                            renderCell: function (object, data, td, options) {
                                return formatoCentrarContenido(data, true);//Corregir en validaciones
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 1, "Dias Pagados", domStyle);
                            }
                        },
                        {
                            field: 'Banco',
                            label: "Banco",
                            renderCell: function (object, data, td, options) {
                                return formatoCentrarContenido(data, true);//Corregir en validaciones
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 1, "Banco", domStyle);
                            }
                        },
                        {
                            field: 'Clabe',
                            label: "Clabe",
                            renderCell: function (object, data, td, options) {
                                return formatoCentrarContenido(data, true);//Corregir en validaciones
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 1, "Clabe", domStyle);
                            }

                        },
                        {
                            field: 'Monto',
                            label: "Monto",
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Monto");
                                return formatoCentrarContenido(data,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 1, "Monto", domStyle);
                            }
                        },
                        {//Inicio de los Gravado
                            field: 'Sueldo_Gravado',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            label: "Sueldo Gravado",
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Sueldo_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Sueldo_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'//'(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})' --- (^[0-9]+)|(^[0-9]+\.[0-9]{1,3})
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Aguinaldo_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Sueldo_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PTU_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PTU_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "RGMDyH_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "RGMDyH_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "FDA_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "FDA_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "CDA_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "CDA_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "CCTPP_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "CCTPP_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PP_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PP_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PSV_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PSV_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "SGMM_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "SGMM_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "CSPPP_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "CSPPP_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "SPI_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "SPI_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Becas_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Becas_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "HE_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "HE_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PrimaD_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PrimaD_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PrimaV_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PrimaV_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PrimaA_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PrimaA_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PPS_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PPS_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "SDR_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "SDR_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Indeminizaciones_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Indeminizaciones_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "RPF_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "RPF_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "CDSSPPP_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "CDSSPPP_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Comisiones_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Comisiones_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ValesD_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ValesD_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ValesR_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ValesR_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ValesG_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ValesG_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ValesRopa_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ValesRopa_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaRenta_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaRenta_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaEscolar_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaEscolar_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaAnteojos_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaAnteojos_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaTransporte_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaTransporte_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaGF_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "AyudaGF_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "OIPS_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "OIPS_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "JPHDR_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "JPHDR_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "JPHDRParciales_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "JPHDRParciales_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "IEAOTV_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "IEAOTV_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "IAAS_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "IAAS_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Alimentacion_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Alimentacion_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Habitacion_Gravado");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "Habitacion_Exento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "PAsistecia_Gravado");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Premios por asistencia <br/> Gravado", domStyle);//Bandera 2 para deducciones
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
                                bandera=concatenarError(object, data, 0, "PAsistecia_Exento");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Premios por asistencia <br/> Exento", domStyle);//Bandera 2 para deducciones
                            }
                        },//Premios por asistencia
                        {
                            field: 'TotalPercepcionesGravado',
                            label: "Gravado",
                            //autoSave:true,
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "TotalPercepcionesGravado");
                                return formatoDivTotal(data, td,bandera);
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
                                console.log(object);
                                return a(object);
                            }
                        },//Total
                        {
                            field: 'TotalPercepcionesExento',
                            label: "Exento",
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "TotalPercepcionesExento");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteSeguridadSocial");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteISR");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteARCEAV");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteOtros");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteDPI");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImportePA");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Pensión alimenticia <br/> importe", domStyle);//Bandera 2 para deducciones
                            }
                        },//Importe pensión alimenticia
                        {
                            field: 'ImporteRenta',
                            label: 'importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteRenta");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Renta <br/> importe", domStyle);//Bandera 2 para deducciones
                            }
                        },//ImporteRenta
                        {
                            field: 'ImportePPFNDLVPLT',
                            label: 'importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImportePPFNDLVPLT");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Préstamos provenientes del <br/> Fondo nacional de la <br/> vivienda para los trabajadores<br/> importe", domStyle);//Bandera 2 para deducciones
                            }
                        },//Importe Préstamos provenientes del Fondo nacional de la vivienda para los trabajadores
                        {
                            field: 'ImportePPCDV',
                            label: 'importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImportePPCDV");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteINFONACOT");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteADS");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Anticipo de salarios <br/> importe", domStyle);//Bandera 2 para deducciones
                            }
                        },//Importe anticipo de Salarios
                        {
                            field: 'ImportePHCEAT',
                            label: 'importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImportePHCEAT");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Pagos hechos con exceso <br/>  al trabajador. <br/> importe", domStyle);//Bandera 2 para deducciones
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteErrores");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImportePerdidas");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteAverias");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteAdquisicionArticulos");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteCuotasConstitucion");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteCuotasSindicales");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteAusencia");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteObreroP");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteImpuestosL");
                                return formatoDivTotal(data, td,bandera);
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
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 0, "ImporteAportacionesV");
                                return formatoDivTotal(data, td,bandera);
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
                                bandera=concatenarError(object, data, 0, "TotalDeducciones");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Total deducciones <br/> importe", domStyle);//Bandera 2 para deducciones
                            },

                            set: function (object) {
                                return getTotalDeducciones(object);
                            }
                        },//Total

                        /**Incapacidades**/
                        {
                            field: 'RiesgoTrabajoDias',
                            label: "Dias",
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 1, "RiesgoTrabajoDias");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Riesgo de Trabajo <br/> Dias", domStyle);//Bandera 2 para deducciones
                            }
                        },//Riesgo de trabajo dias
                        {
                            field: 'RiesgoTrabajoDescuento',
                            label: "Descuento",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Riesgo de Trabajo <br/> Descuento", domStyle);//Bandera 2 para deducciones
                            }
                        },//Riesgo de trabajo Descuento
                        {
                            field: 'RiesgoEnfermedadDias',
                            label: "Dias",
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 1, "RiesgoEnfermedadDias");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Enfermedad en general <br/> Dias", domStyle);//Bandera 2 para deducciones
                            }
                        },//Riesgo Enfermedades en General dias.
                        {
                            field: 'RiesgoEnfermedadDescuento',
                            label: "Descuento",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Enfermedad en general <br/> Descuento", domStyle);//Bandera 2 para deducciones
                            }
                        },//Riesgo Enferemedades en General Descuento.
                        {
                            field: 'MaternidadDias',
                            label: "Dias",
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 1, "MaternidadDias");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Maternidad <br/> Dias", domStyle);//Bandera 2 para deducciones
                            }
                        },//Maternidad dias.
                        {
                            field: 'MaternidadDescuento',
                            label: "Descuento",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Maternidad <br/> Descuento", domStyle);//Bandera 2 para deducciones
                            }
                        },//Maternidad Descuento.
                        {
                            field: 'TotalIncapacidadesDias',
                            label: "",
                            renderCell: function (object, data, td, options) {
                                bandera=concatenarError(object, data, 1, "TotalIncapacidadesDias");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Incapacidades Dias <br/> Total", domStyle);//Bandera 2 para deducciones
                            }
                        },//Total de las incapacidades Dias
                        {
                            field: 'TotalIncapacidadesDescuento',
                            label: "",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
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
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra dobles <br/> Dias", domStyle);//Bandera 2 para deducciones
                            }
                        },//HorasExtraDobles dias.
                        {
                            field: 'HorasExD_Horas',
                            label: "Horas",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra dobles <br/> Horas", domStyle);//Bandera 2 para deducciones
                            }
                        },//Horas Extra Dobles horas.
                        {
                            field: 'HorasExD_Importe',
                            label: "Importe",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra dobles <br/> Importe", domStyle);//Bandera 2 para deducciones
                            }
                        },//Horas Extras Dobles importe

                        {
                            field: 'HorasExT_Dias',
                            abel: "Dias",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra triples <br/> Dias", domStyle);//Bandera 2 para deducciones
                            }
                        },//HorasExtra Triples dias.
                        {
                            field: 'HorasExT_Horas',
                            label: "Horas",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra triples <br/> Horas", domStyle);//Bandera 2 para deducciones
                            }
                        },//Horas Extra Triples horas.
                        {
                            field: 'HorasExT_Importe',
                            label: "Importe",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra triples <br/> Importe", domStyle);//Bandera 2 para deducciones
                            }
                        },//Horas Extras Triples importe

                        {
                            field: 'HorasExS_Dias',
                            label: "Dias",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra simples <br/> Dias", domStyle);//Bandera 2 para deducciones
                            }
                        },//Horas Extra Simples dias.
                        {
                            field: 'HorasExS_Horas',
                            label: "Horas",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra dobles <br/> Horas", domStyle);//Bandera 2 para deducciones
                            }
                        },//Horas Extra Simples horas.
                        {
                            field: 'HorasExS_Importe',
                            label: "Importe",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra dobles <br/> Importe", domStyle);//Bandera 2 para deducciones
                            }
                        },//Horas Extras Simples importe
                        {
                            field: 'TotalHE',
                            label: "Importe",
                            renderCell: function (object, data, td, options) {
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2, "Horas extra <br/> Total", domStyle);//Bandera 2 para deducciones
                            }
                        },//Total Horas Extra
                        {//Reintegro de ISR pagado en exeso
                            field: 'Reintegro_ISR',
                            label: 'Reintegro de ISR pagado en exceso (siempre que no haya sido enterado al SAT).',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                // bandera=concatenarError(object, data, 0, "Reintegro_ISR");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2,
                                    "Reintegro de ISR <br/> pagado en exceso <br/> (siempre que no haya <br/> sido enterado al SAT) <br/> importe"
                                    , domStyle);//Bandera 2 para deducciones
                            }
                        },
                        {//Subsidio para el empleo efectivamente entregado
                            field: 'SubsidioEmpleoEfecEntregado',
                            label: 'Subsidio para el empleo efectivamente entregado',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                //bandera=concatenarError(object, data, 0, "SubsidioEmpleoEfecEntregado");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2,
                                    "Subsidio para el empleo <br/> efectivamente entregado <br/> importe"
                                    , domStyle);//Bandera 2 para deducciones
                            }
                        },
                        {//Viáticos (entregados al trabajador).
                            field: 'ViaticosEntregadosTrabajador',
                            label: 'Viáticos (entregados al trabajador).',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                // bandera=concatenarError(object, data, 0, "ViaticosEntregadosTrabajador");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2,
                                    "Viáticos <br/>  (entregados al trabajador) <br/> importe"
                                    , domStyle);//Bandera 2 para deducciones
                            }
                        },
                        {//Aplicación de saldo a favor por compensación anual.
                            field: 'AplicacionSaldoAFavorCompensacionAnual',
                            label: 'Aplicación de saldo a favor por compensación anual  importe',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                //bandera=concatenarError(object, data, 0, "AplicacionSaldoAFavorCompensacionAnual");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2,
                                    "Aplicación de <br/> saldo a favor <br/> por compensación anual <br/> importe"
                                    , domStyle);//Bandera 2 para deducciones
                            }
                        },
                        {//Pagos distintos a los listados y que no deben considerarse como ingreso por sueldos, salarios o ingresos asimilados..
                            field: 'PagosDistintosALosListados',
                            label: 'Pagos distintos a los listados y que no deben considerarse como ingreso por sueldos, salarios o ingresos asimilados.',
                            editor: ValidationTextBox,
                            editOn: 'dblclick',
                            autoSave: true,
                            editorArgs: {
                                style: "width:110px",
                                regExp: '(^[0-9]+)|(^[0-9]+\.[0-9]{1,3})'
                            },
                            renderCell: function (object, data, td, options) {
                                //bandera=concatenarError(object, data, 0, "PagosDistintosALosListados");
                                return formatoDivTotal(data, td,bandera);
                            },
                            renderHeaderCell: function (node) {
                                return formatoHeader(node, 2,
                                    "Pagos distintos a los listados <br/>  y que no deben considerarse como <br/>  ingreso por sueldos, salarios <br/>  o ingresos asimilados. <br/> importe"
                                    , domStyle);//Bandera 2 para deducciones
                            }
                        },
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
});