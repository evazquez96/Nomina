define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/ContentPane",
    "dijit/form/TextBox",
    "dijit/form/Button",
    "dojo/text!/myApp/widget/templates/CargaLinkWidget.html",
    "dojo/on",
    "dojo/parser",
    "dojo/dom-style",
    "dojo/request",
    "dojo/when",
    "dojo/Deferred",
    ],
    function (
        declare,
        lang,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        ContentPane,
        TextBox,
        Button,
        template,
        on,
        parser,
        domStyle,
        request,
        when,
        Deferred,
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

            constructor: function (arguments) {
                lang.mixin(this, arguments);
                /**
                La línea anterior permite manipular los objetos que se
                pasan como argumentos en el constructo.
                */
            },

            getNomina: function () {
                return this.deferred.promise
            },

            templateString: template,

            postCreate: function () {
                var domNode = this.domNode;
                this.inherited(arguments);
                this._setWidgetCSS();

                var context = this;

                on(this.btnCargaWidget, 'click', function () {
                    context.cargarNomina();
                });
                /*
                on(this.btnCargaWidget, 'click', function (evt) {

                    when(context.cargarNomina(evt), function (data) {
                        grid.set('collection', collection);
                        grid.refresh();

                    }, function (error) { });

                });

                */

            },

            _getSpreadSheetId: function () {
                /*
                 * Obtiene el SpreadSheetId que corresponde
                 * a la Google Sheet.
                 */
                var url=this.txtLinkWidget.value;
                var token = url.split("/");
                //console.log(token[5]);
                return token[5];
            },
            cargarNomina: function () {
                
                var SpreadSheetId = this._getSpreadSheetId();
                var url = "nomina/"+SpreadSheetId;

                var deferred=request.get(url, {
                    handleAs: "json"
                });

                when(deferred, function (value) {
                    console.log(value);
                });
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
                console.log("Se enviara el link: "+url);
            },
            _setWidgetCSS: function () {
                domStyle.set(this.txtLinkWidget.domNode, "width", "70%");
            }
        });
        parser.parse();
    });