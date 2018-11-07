define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dijit/form/ValidationTextBox",
    "dojo/parser",
    "dojo/dom-style",
    "dojo/text!/myApp/widget/templates/EmpleadoValidoWidget.html"
],
    function (
        declare,
        lang,
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

            clave:"",

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
            }
            
        });
        parser.parse();
    });