var aggregator = function(rawData) {

    var mappings = [
        { 
            name: "Region",
            value: [
                {
                    name: "APAC",
                    value: ["HK", "IN"]
                },
                {
                    name: "EMEA",
                    value: ["CH", "UK"]
                }
            ]
        },
        {
            name: "Market",
            value: [
                {
                    name: "Developed Markets",
                    value: ["CH", "HK", "UK"]
                },
                {
                    name: "Emerging Markets",
                    value: ["IN"]
                }
            ]
        }
    ];

    var retVal = {
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
            },
            {
                calcDate: "2016-05-16",
                isoCountrySymbol: "APAC",
                price: 1101.1
            },
            {
                calcDate: "2016-05-16",
                isoCountrySymbol: "EMEA",
                price: 696.46
            }
        ]
    };

    var getAggregateMapping = function(countryCode, mappingType) {
        var retval = "x";

        var regions = mappings[0].value;
        var markets = mappings[1].value;

        console.log(regions.length + " Regions " + markets.length + " Markets.");

        if (mappingType === "Region") {
            console.log("Its a Region");
            for (var i = 0; i < regions.length; i++) {
                var region = regions[i];
                console.log("Region:" + region.name);
                var countryCodes = region.value;
                for (var j = 0; j < countryCodes.length; j++) {
                    var cc = countryCodes[j];
                    console.log("CC:" + cc);

                    if (cc === countryCode) {
                        console.log('Made a match with ' + region.name);
                        return region.name;
                    }
                }
            }
        } else if (mappingType === "Market") {
            console.log("Its a Market");
            for (var i = 0; i < markets.length; i++) {
                var market = markets[i];
                console.log("Market:" + market.name);
                var countryCodes = market.value;
                for (var j = 0; j < countryCodes.length; j++) {
                    var cc = countryCodes[j];
                    console.log("CC:" + cc);

                    if (cc === countryCode) {
                        console.log('Made a match with ' + market.name);
                        return market.name;
                    }
                }
            }
        };

        return retval;
    };

    var aggregate = function() {

        var cols = rawData.value[0].value;

        for (var i = 0; i< cols.length; i++) {
            var col = cols[i];
            console.log(col.name);
        }


        //result.value.push({calcDate: "2016-05-15", 'sum of price': 203.9});
        //result.value.push({calcDate: "2016-05-16", 'sum of price': 147.3 });

        return JSON.stringify(retVal);
    };

    return { 
        aggregate:aggregate,
        getAggregateMapping:getAggregateMapping 
    };

};

module.exports = aggregator;