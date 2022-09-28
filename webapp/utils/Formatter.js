sap.ui.define(
  ['sap/ui/core/library'],
  function (coreLibrary) {
    'use strict'

    // VARIABLE QUE GUARDA sap.ui.core.ValueState
    var ValueState = coreLibrary.ValueState

    var Formatter = {
      weightState: function (fMeasure, sUnit) {
        // Boarder values for different status of weight
        var fMaxWeightSuccess = 1
        var fMaxWeightWarning = 5
        var fAdjustedMeasure = parseFloat(fMeasure)

        // if the value of fMeasure is not a number, no status will be set
        if (isNaN(fAdjustedMeasure)) {
          return 'None'
        } else {
          if (sUnit === 'G') {
            fAdjustedMeasure = fMeasure / 1000
          }

          if (fAdjustedMeasure < 0) {
            return 'None'
          } else if (fAdjustedMeasure < fMaxWeightSuccess) {
            return 'Success'
          } else if (fAdjustedMeasure < fMaxWeightWarning) {
            return 'Warning'
          } else {
            return 'Error'
          }
        }
      },

      /** estado operativo e inoperativo
       *
       * @param {*} sValue
       * @returns
       */ DispositivoState: function (state) {
        if (state === 'operativo') {
          return 'Success'
        } else if (state === 'inoperativo') {
          return 'Error'
        } else {
          return 'Warning'
        }
      },

      /**
       * Rounds the number unit value to 2 digits
       * @public
       * @param {string} sValue the number string to be rounded
       * @returns {string} sValue with 2 digits rounded
       */
      numberUnit: function (sValue) {
        if (!sValue) {
          return ''
        }
        return parseFloat(sValue).toFixed(2)
      },

      /**
       * Defines a value state based on the stock level
       *
       * @public
       * @param {number} iValue the stock level of a product
       * @returns {string} sValue the state for the stock level
       */
      quantityState: function (iValue) {
        if (iValue === 0) {
          return ValueState.Error
        } else if (iValue <= 10) {
          return ValueState.Warning
        } else {
          return ValueState.Success
        }
      },

      formatterCountDataRows: function (oArray) {
        var sCount = ''

        try {
          if (oArray != undefined) sCount = oArray.length + ''
        } catch (e) {
          sCount = ''
        }

        return sCount
      },
      /**
       * dar formato a la fecha
       */
      formatteDateToSAPTemplate: function (sDateWithoutFormat) {
        var oDateSplit = sDateWithoutFormat.split('T')
        var oDate = oDateSplit[0].split('-') //dias mes año
        var oTime = oDateSplit[1].split('.') //horas
        var oFormattedDate = oDate[2] + '.' + oDate[1] + '.' + oDate[0] + ' ' + oTime[0]
        return oFormattedDate
      }
    }

    return Formatter
  },
  /* bExport= */ true
)
