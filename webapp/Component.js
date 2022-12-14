var oBusyDialog;
var oUrl, oUrlApi;

sap.ui.define(
  ['sap/ui/core/UIComponent', 'sap/ui/Device', 'com/moony/gestorinventario/model/models'],
  function (UIComponent, Device, models) {
    'use strict'

    return UIComponent.extend('com.moony.gestorinventario.Component', {
      metadata: {
        manifest: 'json'
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments)

        // enable routing
        this.getRouter().initialize()

        // set the device model
        this.setModel(models.createDeviceModel(), 'device')

        oBusyDialog = new sap.m.BusyDialog();

        //creacion de modelos
        var moProductos = new sap.ui.model.json.JSONModel();
        sap.ui.getCore().setModel(moProductos,"mProductos");
        this.setModel(moProductos, "mProductos");

        var moDetalle = new sap.ui.model.json.JSONModel();
        sap.ui.getCore().setModel(moDetalle,"mDetalle");
        this.setModel(moDetalle, "mDetalle");

        // set the product feedback model
        // this.setModel(models.createCommentsModel(), "productFeedback");

      }
    })
  }
)
