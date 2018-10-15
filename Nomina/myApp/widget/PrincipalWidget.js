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
    "myApp/widget/myGrid.js"
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
        regex,
        aspect,
        /**
        *Fin de modulos para ColumnSet
        **/
        Memory,
        parser,
        domStyle,
        CustomGrid
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

                this.grid = new CustomGrid();
                aspect.after(this.grid, 'renderRow', function (row, args) {
                    var r = row;
                    var ar = args;
                    var ar0 = args[0];
                    var sum = 1 + 2;
                    return row;
                });
                var context = this;
                /*
                this.grid.on('.dgrid-cell:click', function (event) {
                    var cell = context.grid.cell(event);
                    console.log(cell.element);
                    console.log(cell.column);
                    console.log(cell.row);

                });*/
                
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
                    //console.log(row.element);
                    //console.log(z);
                    //actualizarValoresDgrid(event,grid);
                    grid.save();
                    //grid.refresh();
                });
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

                /*
                this.grid.on('dgrid-editor-show', function (event) {
                    
                    var cell = event.cell;
                    var test = cell.column.renderCell;
                    //context.grid.cell(event).element.style.setProperty("background-color", "red", "important");
                    //cell.style.setProperty("background-color", "red", "important");
                    //Investigar el metodo refresh(cell).
                    var z = context.grid.cell(cell);
                    var row = context.grid.row(event);
                    //console.log(context.grid.row(event));
                    //console.log(context.grid)
                    //actualizarValoresDgrid(event, grid);
                });*/
                
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