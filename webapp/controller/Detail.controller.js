var oDetailController
sap.ui.define(
  [
    './BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/routing/History',
    '../utils/formatter',
    'sap/ui/core/format/DateFormat',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
  ],
  function (BaseController, JSONModel, History, Formatter, DateFormat, Filter, FilterOperator) {
    'use strict'

    var oCore, oView, mModelLocal
    var _oSupplier = [],
      oId_detalle

    return BaseController.extend('com.moony.gestorinventario.controller.Detail', {
      formatter: Formatter,

      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      /**
       * Called when the worklist controller is instantiated.
       * @public
       */
      onInit: function () {
        oDetailController = this
        oView = this.getView()
        oCore = sap.ui.getCore()
        var that = this
        mModelLocal = new sap.ui.model.json.JSONModel()

        // oCore.getModel("mSustitutos").setProperty("/", DemoData.bColumns);
        // this.getRouter().getRoute("RouteDetalle").attachPatternMatched(this._onObjectMatched, this);

        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {
          var sRoute = oEvent.getParameter('name')

          if ('RouteDetalle' === sRoute) {
            if (
              oEvent.getParameter('arguments').oId &&
              !$.isEmptyObject(oCore.getModel('mProductos').getData())
            ) {
              oBusyDialog.close()

              var sPathD = oEvent.getParameter('arguments').oId
              var sPath = '/' + sPathD
              oId_detalle = sPath
              var oModel = oCore.getModel('mProductos')
              var oObject = jQuery.extend({}, oModel.getProperty(sPath))
              // clonar la data y ocultar los botones
              _oSupplier = jQuery.extend({}, oModel.getProperty(sPath))
              console.log('osuplier copia de objeto', _oSupplier)

              // console.log("data path", oObject)
              mModelLocal.setProperty('/', oObject)
              oView.setModel(mModelLocal, 'mDetalle')

              oView.bindElement({ path: '/', model: 'mDetalle' })

              // oDetailController._toggleButtonsAndView(false);
            } else {
              alert('No se han enviado argumentos.')
              that.onNavBack()
              // Recargar la pagina, pero espera, el modelo se reinicio. Entonces vuelve al 'Home'
              var oHash = window.location.hash.split('/')
              window.location.assign(oHash[0])
            }
          }
        })
        oView.addEventDelegate({
          // not added the controller as delegate to avoid controller functions with similar names as the events
          onAfterShow: jQuery.proxy(function (oEvt) {
            this.onAfterShow(oEvt)
          }, this)
        })
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this)
      },

      /* =========================================================== */
      /* event handlers                                              */
      /* =========================================================== */
      onAfterShow: function (oEvt) {
        var that = this
        var oParams = {
          codigo_inventario: _oSupplier.codigo_inventario
        }
        function f_next_get_code_qr(res) {
          //obtener el codigo QR y pintarlo -codeQRDetail
          // console.log(oParams)
          //pintar resultado
          if (res.cod_result === 1) {
            console.log('codigo', res.result)
            that.getView().byId('codeQRDetail').setSrc(res.result)
            // oView.byId("codeQRDetail").mProperties.src = res.result;
          } else {
            that.getView().byId('codeQRDetail').setSrc('../assets/150.png')
          }
        }
        oDetailController._ongetCodeQR(oParams, f_next_get_code_qr)
      },
      /**
       * Event handler  for navigating back.
       * It there is a history entry we go one step back in the browser history
       * If not, it will replace the current entry of the browser history with the worklist route.
       * @public
       */
      onNavBack: function () {
        var sPreviousHash = History.getInstance().getPreviousHash()

        if (sPreviousHash !== undefined) {
          history.go(-1)
        } else {
          this.getRouter().navTo('RoutePrincipal', {}, true)
        }
      },
      onPressImprimir: function () {
        console.log('hola')
        oView.byId('get_qr')
      },

      /* =========================================================== */
      /* function de qr                                              */
      /* =========================================================== */
      _ongetCodeQR: function (oParams, callback) {
        var sUrl = 'http://127.0.0.1:4000/api-gestor/get_qr'
        oParams = JSON.stringify(oParams)

        $.ajaxSetup({
          headers: {
            'Content-Type': 'application/json'
          }
        })

        $.post(sUrl, oParams)
          .done(function (res) {
            console.log('result', res)
            if (res.body.cod_result === 1) {
              var data = res.body //JSON.parse(result)
              if (callback) {
                callback(data)
              }
            } else {
              // en caso es 0 recorre este camino
							var oMessage = res.body.msg
							console.log("algo",oMessage)
              // oPrincipalController.f_showMessage('WARNING', oMessage)
            }
          })
          .fail(function (err) {
            console.error(err)
            // oPrincipalController._onErrorWebService()
            oBusyDialog.close()
          })
      }
    })
  }
)
