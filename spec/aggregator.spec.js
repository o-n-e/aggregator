var assert = require('assert');
var aggregator = require('../src/aggregator.js');

describe('aggregator', function() {

    var rawData  = {
        name: "rawData",
        value: [
            {
                name: "cols",
                value: [
                    {
                        name: "calcDate",
                        type: "group"
                    },
                    {
                        name: "region",
                        type: "group"
                    },
                    {
                        name: "price",
                        type: "aggregate",
                        aggType: "sum"
                    }
                ]
            },
            {
                name: "data",
                value: [
                    {
                        name: "row0",
                        fields: [
                            { 
                                name: "calcDate", 
                                val: "2016-05-15" 
                            },
                            { 
                                name: "isoCountrySymbol", 
                                val: "IN" 
                            },
                            { 
                                name: "price", 
                                val: 344.34 
                            }
                        ]
                    },
                    {
                        name: "row1",
                        fields: [
                            { 
                                name: "calcDate", 
                                val: "2016-05-15" 
                            },
                            { 
                                name: "isoCountrySymbol", 
                                val: "UK" 
                            },
                            { 
                                name: "price", 
                                val: 33.765
                            }
                        ]
                    },
                    {
                        name: "row2",
                        fields: [
                            { 
                                name: "calcDate", 
                                val: "2016-05-15" 
                            },
                            { 
                                name: "isoCountrySymbol", 
                                val: "CH" 
                            },
                            { 
                                name: "price", 
                                val: 89.4
                            }
                        ]
                    },
                    {
                        name: "row3",
                        fields: [
                            { 
                                name: "calcDate", 
                                val: "2016-05-15" 
                            },
                            { 
                                name: "isoCountrySymbol", 
                                val: "HK" 
                            },
                            { 
                                name: "price", 
                                val: 466.788
                            }
                        ]
                    },
                    {
                        name: "row4",
                        fields: [
                            { 
                                name: "calcDate", 
                                val: "2016-05-15" 
                            },
                            { 
                                name: "isoCountrySymbol", 
                                val: "IN" 
                            },
                            { 
                                name: "price", 
                                val: 3.4
                            }
                        ]
                    },
                    {
                        name: "row5",
                        fields: [
                            { 
                                name: "calcDate", 
                                val: "2016-05-15" 
                            },
                            { 
                                name: "isoCountrySymbol", 
                                val: "UK" 
                            },
                            { 
                                name: "price", 
                                val: 66.3
                            }
                        ]
                    },
                    {
                        name: "row6",
                        fields: [
                            { 
                                name: "calcDate", 
                                val: "2016-05-15" 
                            },
                            { 
                                name: "isoCountrySymbol", 
                                val: "CH" 
                            },
                            { 
                                name: "price", 
                                val: 677.76
                            }
                        ]
                    },
                    {
                        name: "row7",
                        fields: [
                            { 
                                name: "calcDate", 
                                val: "2016-05-15" 
                            },
                            { 
                                name: "isoCountrySymbol", 
                                val: "HK" 
                            },
                            { 
                                name: "price", 
                                val: 3.22
                            }
                        ]
                    }
                ]
            }
        ]
    };

    

    var agg;

    beforeEach(function() {
        agg = aggregator(rawData);
    });

    describe('getAggregateMapping', function() {

        it('can get the aggregated Region wrap up for an APAC country', function(){
            var countryCode = "HK";
            var mappingType = "Region";
            var expected = "APAC";
            var result = agg.getAggregateMapping(countryCode, mappingType);
            assert.equal(expected, result);
        });

        it('can get the aggregated Region wrap up for an EMEA tcountry', function(){
            var countryCode = "UK";
            var mappingType = "Region";
            var expected = "EMEA";
            var result = agg.getAggregateMapping(countryCode, mappingType);
            assert.equal(expected, result);
        });

        it('can get the aggregated Market wrap up for an DM country', function(){
            var countryCode = "IN";
            var mappingType = "Market";
            var expected = "Emerging Markets";
            var result = agg.getAggregateMapping(countryCode, mappingType);
            assert.equal(expected, result);
        });

        it('can get the aggregated Region wrap up for an EMEA tcountry', function(){
            var countryCode = "UK";
            var mappingType = "Market";
            var expected = "Developed Markets";
            var result = agg.getAggregateMapping(countryCode, mappingType);
            assert.equal(expected, result);
        });

    });

    describe('aggregate', function() {

        var expected = {
            name: "aggData",
            value: [
                {
                    calcDate: "2016-05-15",
                    region: "APAC",
                    price: 817.748
                },
                {
                    calcDate: "2016-05-15",
                    isoCountrySymbol: "EMEA",
                    price: 867.225
                }
            ]
        };

        it('can aggregate to split 4 records between 2 regions', function() {
            var result = agg.aggregate();
            assert.equal(JSON.stringify(expected), result);
            //assert.equal(true, true);
        });
    });

});
