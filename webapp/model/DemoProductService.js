sap.ui.define(
  ['jquery.sap.global'],
  function (jQuery) {
    'use strict'
    // creacion de datos que deberian venir de servicio
    var DemoProductService = [
      {
        ProductId: 1,
        Name: '10" Portable DVD player',
        SupplierName: 'Titanium',
        Width: 24,
        Depth: 19.5,
        Height: 29,
        DimUnit: 'cm',
        WeightMeasure: 0.84,
        WeightUnit: 'KG',
        Price: '449,99',
        CurrencyCode: 'EUR',
        UnitsInStock: 81,
        Discontinued: true
      },
      {
        ProductId: 2,
        Name: 'Cordless Mouse',
        SupplierName: 'Oxynum',
        Width: 24,
        Depth: 19.5,
        Height: 29,
        DimUnit: 'cm',
        WeightMeasure: 4.2,
        WeightUnit: 'KG',
        Price: '449,99',
        CurrencyCode: 'EUR',
        UnitsInStock: 56,
        Discontinued: true
      },
      {
        ProductId: 3,
        Name: 'Astro Phone 6',
        SupplierName: 'Ultrasonic United',
        Width: 24,
        Depth: 19.5,
        Height: 29,
        DimUnit: 'cm',
        WeightMeasure: 0.84,
        WeightUnit: 'KG',
        Price: '449,99',
        CurrencyCode: 'SOL',
        UnitsInStock: 50,
        Discontinued: false
      },
      {
        ProductId: 4,
        Name: '7" Widescreen Portable DVD Player w MP3r',
        SupplierName: 'Technocom',
        Width: 24,
        Depth: 19.5,
        Height: 29,
        DimUnit: 'cm',
        WeightMeasure: 0.84,
        WeightUnit: 'KG',
        Price: '449,99',
        CurrencyCode: 'DOL',
        UnitsInStock: 14,
        Discontinued: false
      }
    ]

    return DemoProductService
  },
  true
)
