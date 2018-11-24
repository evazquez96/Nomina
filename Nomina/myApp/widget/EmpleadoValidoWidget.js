define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/on",
    "dijit/Menu",
    "dijit/MenuItem",
    "dojo/mouse",
    "dijit/TooltipDialog",
    "dijit/popup",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dijit/form/ValidationTextBox",
    "dojo/parser",
    "dojo/dom-style",
    "dojo/text!/myApp/widget/templates/EmpleadoValidoWidget.html",
    "dojo/domReady!"
],
    function (
        declare,
        lang,
        dom,
        on,
        Menu,
        MenuItem,
        mouse,
        TooltipDialog,
        popup,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        ContentPane,
        ValidationTextBox,
        parser,
        domStyle,
        template
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

            templateString: template,

            NumEmpleado:"default",
            isValid:null,
            constructor: function (arguments) {
                lang.mixin(this, arguments);
                /**
                La línea anterior permite manipular los objetos que se
                pasan como argumentos en el constructo.
                */
            },

            postCreate: function () {
                var domNode = this.domNode;
                this.inherited(arguments);

                
                
                if (!this.isValid) {
                    /**Solo se activara el dropDownMenu si el registro del empleado no es válido***/
                    
                    on(this.numEmpleadoWidget, "mousedown", lang.hitch(this, function (event) {
                        if (mouse.isRight(event)) {
                            this.grid.set("collection", this.grid.get("collection").filter({ NumEmpleado: this.numEmpleadoWidget.value }))
                            alert(this.error);
                            
                            //alert("Hola mundo");
                        } else {
                            alert("Click izquierdo");
                        }
                            //alert("ADSFasf");
                        //this.numEmpleadoWidget.addChild(menu);
                    }));
                    /***
                     * El evento se activara cuando el usuario de click derecho sobre el 
                     * input el cual desplegara un DropDownMenu donde visualizara los detalles
                     * de los errores o de los datos invalidos.
                     * **/
                }

            }
            
        });
        parser.parse();
    });