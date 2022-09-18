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
    'sap/ui/model/FilterOperator',
    'sap/ui/core/Fragment',
    'sap/ui/core/syncStyleClass'
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
    FilterOperator,
    Fragment,
    syncStyleClass
  ) {
    'use strict'
    var oCore
    var oView
    var prefixId
    // var oScanResultText
    var searchField

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

        // codigo para funcionalidad del codigo de barra
        prefixId = this.createId()
        if (prefixId) {
          prefixId = prefixId.split('--')[0] + '--'
        } else {
          prefixId = ''
        }
        // oScanResultText = sap.ui.getCore().byId(prefixId + 'sampleBarcodeScannerResult')
        searchField = oView.byId('searchField')
        // fin codigo de barras

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
        var oTable = oEvent.getSource()
        var iTotalItems = oEvent.getParameter('total')
        var oTitle = oView.byId('tableHeader')

        if (iTotalItems && oTable.getBinding('items').isLengthFinal()) {
          oTitle.setText(
            this.getResourceBundle().getText('Principal.icontabbar.title') +
              ' (' +
              oTable.getBinding('items').getLength() +
              ')'
          )
        } else {
          oTitle.setText('(0)')
        }
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
      },
      // incio de metodos del codigo de barras
      onScanSuccess: function (oEvent) {
        if (oEvent.getParameter('cancelled')) {
          MessageToast.show('Scan cancelled', { duration: 1000 })
        } else {
          if (oEvent.getParameter('text')) {
            // oScanResultText.setText(oEvent.getParameter('text'))
            MessageToast.show('escaneado: ' + oEvent.getParameter('text'))
          } else {
            // oScanResultText.setText('')
            MessageToast.show('esta vacio')
          }
        }
      },

      onScanError: function (oEvent) {
        MessageToast.show('Scan failed: ' + oEvent, { duration: 1000 })
      },

      onScanLiveupdate: function (oEvent) {
        // User can implement the validation about inputting value
      },

      onAfterRendering: function () {
        // Reset the scan result
        var oScanButton = sap.ui.getCore().byId(prefixId + 'sampleBarcodeScannerButton')
        if (oScanButton) {
          $(oScanButton.getDomRef()).on('click', function () {
            // oScanResultText.setText('')
            searchField.setText('')
          })
        }
      },
      //fin de metodo de codigo de barras
      //inicio de funcionalidad de modal
      onPressAddProduct: function (oEvent) {
        var oButton = oEvent.getSource(),
          oView = this.getView()

        if (!this._pDialog) {
          this._pDialog = Fragment.load({
            id: oView.getId(),
            name: 'com.moony.gestorinventario.view.newProduct', //"reassingmanager.view.Dialog",
            controller: this
          }).then(function (oDialog) {
            // oDialog.setModel(oCore.getModel("mSustitutos"));
            return oDialog
          })
        }
        this._pDialog.then(
          function (oDialog) {
            oDialog.open()
          }.bind(this)
        )

        // oDetalleController._toggleButtonsAndView(true);
      },
      onDialogClose: function (oEvent) {
        var oDialog = oView.byId('newProducto')
        oDialog.close()
      },
      onSaveProductNew: function (oEvent) {
        // obtener todos los valores del formulario
        var oParams = {
          nombre: oView.byId('txtNombre').getValue(),
          calle: oView.byId('txtCalle').getValue(),
          ncasa: oView.byId('txtNumeroCasa').getValue()
        }

        console.log(oParams)
        var oDialog = oView.byId('newProducto')
        // limpiar el modelo
        MessageToast.show("parametros guardados en consola")
        oDialog.close()
        // eventos posibles: refrescar la pagina, volver a consumir listado o ingresar al detalle
      }
      // fin de funcionalidad de modal
    })
  }
)
