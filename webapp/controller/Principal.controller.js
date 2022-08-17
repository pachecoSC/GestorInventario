sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/m/MessageToast', 'sap/ui/model/json/JSONModel', '../model/DemoProductService','../utils/formatter'],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, JSONModel,DemoProductService,Formatter) {
    'use strict'

    return Controller.extend('com.moony.gestorinventario.controller.Principal', {
      Formatter: Formatter,
      onInit: function () {
        // var oModel = new JSONModel(DemoProductService);
        // this.getView().setModel(oModel);
        // console.log(oModel)

        sap.ui.getCore().getModel("mProductos").setProperty("/", DemoProductService);

        // var oModel = sap.ui.getCore().getModel("mProductos");
        // oModel.refresh()
      },

      onClick: function () {
        MessageToast.show('hola mundo')
      }
    })
  }
)
