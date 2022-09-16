var oPrincipalController
sap.ui.define(
  [
    './BaseController',
    'sap/m/MessageToast',
    'sap/ui/Device',
    'sap/ui/model/json/JSONModel',
    '../model/DemoProductService',
    '../utils/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    BaseController,
    MessageToast,
    Device,
    JSONModel,
    DemoProductService,
    Formatter,
    Filter,
    FilterOperator
  ) {
    'use strict'
    var oCore
    var oView

    return BaseController.extend('com.moony.gestorinventario.controller.Principal', {
      Formatter: Formatter,

      onInit: function () {
        // var oModel = new JSONModel(DemoProductService);
        // this.getView().setModel(oModel);
        // console.log(oModel)
        oView = this.getView()
        oCore = sap.ui.getCore()
        oPrincipalController = this

        oCore.getModel('mProductos').setProperty('/', DemoProductService)

        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this)

        // var oModel = sap.ui.getCore().getModel("mProductos");
        // oModel.refresh()
      },

      onNavBack: function () {
        history.go(-1)
      },

      onSearch: function (oEvent) {
        if (oEvent.getParameters().refreshButtonPressed) {
          // Search field's 'refresh' button has been pressed.
          // This is visible if you select any master list item.
          // In this case no new search is triggered, we only
          // refresh the list binding.
          this.onRefresh()
        } else {
          var aTableSearchState = []
          var sQuery = oEvent.getParameter('query')

          if (sQuery && sQuery.length > 0) {
            aTableSearchState = [new Filter('Name', FilterOperator.Contains, sQuery)]
          }
          this._applySearch(aTableSearchState)
        }
      },

      _applySearch: function (aTableSearchState) {
        var oTable = this.byId('idProductsTable'),
          oViewModel = this.getModel('mProductos')
        oTable.getBinding('items').filter(aTableSearchState, 'Application')
        // changes the noDataText of the list in case there are no filter results
        if (aTableSearchState.length !== 0) {
          oViewModel.setProperty(
            '/tableNoDataText',
            this.getResourceBundle().getText('Principal.table.no.data')
          )
        }
      },

      onUpdateFinished: function (oEvent) {
        var oTable = oEvent.getSource();
        var iTotalItems = oEvent.getParameter("total");
        var oTitle = oView.byId('tableHeader')

        if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
          oTitle.setText(this.getResourceBundle().getText('Principal.icontabbar.title')+' (' + oTable.getBinding('items').getLength() + ')')
        } else {
          oTitle.setText('(0)')
        }
      },

      onClick: function () {
        MessageToast.show('hola mundo')
      },
      onPress: function (oEvent) {
        // The source is the list item that got pressed
        // this._showObject(oEvent.getSource());
        this._showObject(oEvent.getSource().getBindingContextPath())
      },

      _showObject: function (oItem) {
        var that = this
        var separadoSpath = oItem.split('/')
        that.getRouter().navTo('RouteDetalle', {
          oId: separadoSpath[1]
        })
      }
    })
  }
)
