var oDetailController
sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	'../utils/formatter',
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (
	BaseController, JSONModel, History, Formatter, DateFormat, Filter, FilterOperator) {
	"use strict";

	var oCore, oView, mModelLocal;
	var _oSupplier = [], oId_detalle;

	return BaseController.extend("com.moony.gestorinventario.controller.Detail", {

		formatter: Formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			oDetailController = this;
			oView = this.getView();
			oCore = sap.ui.getCore();
			var that = this;
			mModelLocal = new sap.ui.model.json.JSONModel();

			// oCore.getModel("mSustitutos").setProperty("/", DemoData.bColumns);
			// this.getRouter().getRoute("RouteDetalle").attachPatternMatched(this._onObjectMatched, this);

			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function (oEvent) {

				var sRoute = oEvent.getParameter("name");

				if ("RouteDetalle" === sRoute) {
						if (oEvent.getParameter("arguments").oId && !$.isEmptyObject(oCore.getModel("mProductos").getData())) {
								oBusyDialog.close();

								var sPathD = oEvent.getParameter("arguments").oId;
								var sPath = "/" + sPathD;
								oId_detalle = sPath;
								var oModel = oCore.getModel('mProductos');
								var oObject = jQuery.extend({}, oModel.getProperty(sPath));
								// clonar la data y ocultar los botones
								_oSupplier = jQuery.extend({}, oModel.getProperty(sPath));
								console.log("osuplier copia de objeto", _oSupplier)

								// console.log("data path", oObject)
								mModelLocal.setProperty("/", oObject);
								oView.setModel(mModelLocal, "mDetalle");

								oView.bindElement({ path: "/", model: "mDetalle" });

								// oDetailController._toggleButtonsAndView(false);
						}
						else {
								alert("No se han enviado argumentos.");
								that.onNavBack();
								// Recargar la pagina, pero espera, el modelo se reinicio. Entonces vuelve al 'Home'
								var oHash = window.location.hash.split("/")
								window.location.assign(oHash[0]);
						}
				}
		});

		this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */


		/**
		 * Event handler  for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("RoutePrincipal", {}, true);
			}
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

	});

});