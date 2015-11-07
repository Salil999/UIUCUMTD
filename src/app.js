var UI = require('ui');
var ajax = require('ajax');
var lat;
var lon;
var arrayLength;
var locationOptions = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
};

function locationSuccess(pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
}

function locationError(err) {
    console.log('location error (' + err.code + '): ' + err.message);
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
}

var getStopURL = 'https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?';
var key = '79279d634cac41da9258b1875237c75a';

var stopIDs = [];
var stopsNearYou = new UI.Menu({});
var stopTimings = new UI.Menu({});

var timeOfBuses = {
    title: 'test',
    items: [{
        title: '',
        subtitle: ''
    }, {
        title: '',
        subtitle: ''
    }]
};

var menuList = {
    title: 'Bus Stops Near You',
    items: [{
        title: 'ERROR',
    }, {
        title: 'ERROR',
    }, {
        title: 'ERROR',
    }, {
        title: 'ERROR',
    }, {
        title: 'ERROR',
    }, {
        title: 'ERROR'
    }]
};

var main = new UI.Card({
    title: ' UIUCUMTD',
    icon: 'images/bus.png',
    body: 'Welcome to the UIUC bus app!\n\nShashank Saxena',
    scrollable: false,
});
var emptyArrayCard = new UI.Card({
  title: '     No Buses',
  subtitle: '\n    No buses within 30 mins',
  scrollable: false
});

main.show();

main.on('click', 'select', function(e) {
    getLocation();
    var getGeoLocationURL = 'https://developer.cumtd.com/api/v2.2/json/GetStopsByLatLon?key=' + key + '&lat=' + lat + '&lon=' + lon + '&count=6';
    // lat=40.108578
    // lon=-88.228777
    // This points to Transit Plaza
    if (stopIDs) {
        stopIDs = [];
    }

    ajax({
            //url: baseURL + 'key=' + key + '&stop_id=' + 'iu' + '&count=' + '5',
            url: getGeoLocationURL,
            type: 'json',
            method: 'get',
            async: false
        },
        function(data) {
            if (data) {
                data = JSON.parse(JSON.stringify(data)); // JSON validator

                for (var i = 0; i < 6; i++) {
                    stopIDs.push(data.stops[i].stop_id);
                    menuList.items[i].title = data.stops[i].stop_name;
                }

                stopIDs = stopIDs.splice('');
                stopIDs = stopIDs.slice(0, 6);
                stopsNearYou.section(0, menuList);
                stopsNearYou.show();
            }
        },
        function(err, stat, req) {
            console.log('ERROR - main.on - ' + err);
        }
    );

    stopsNearYou.on('select', function(e) {
        ajax({
                url: getStopURL + 'key=' + key + '&stop_id=' + stopIDs[e.itemIndex],
                type: 'json',
                method: 'get',
                async: false
            },
            function(data) {
                console.log(getStopURL + 'key=' + key + '&stop_id=' + stopIDs[e.itemIndex]);

                if (data) {
                    data = JSON.parse(JSON.stringify(data)); //JSON Validator
                    arrayLength = data.departures.length;
                    timeOfBuses.title = e.item.title;
                    switch (arrayLength) {
                        case 0:
                            emptyArrayCard.show();
                            break;

                        case 1:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;

                        case 2:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[1].headsign,
                                    subtitle: data.departures[1].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;

                        case 3:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[1].headsign,
                                    subtitle: data.departures[1].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[2].headsign,
                                    subtitle: data.departures[2].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;

                        case 4:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[1].headsign,
                                    subtitle: data.departures[1].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[2].headsign,
                                    subtitle: data.departures[2].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[3].headsign,
                                    subtitle: data.departures[3].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;

                        case 5:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[1].headsign,
                                    subtitle: data.departures[1].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[2].headsign,
                                    subtitle: data.departures[2].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[3].headsign,
                                    subtitle: data.departures[3].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[4].headsign,
                                    subtitle: data.departures[4].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;

                        case 6:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[1].headsign,
                                    subtitle: data.departures[1].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[2].headsign,
                                    subtitle: data.departures[2].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[3].headsign,
                                    subtitle: data.departures[3].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[4].headsign,
                                    subtitle: data.departures[4].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[5].headsign,
                                    subtitle: data.departures[5].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;

                        case 7:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[1].headsign,
                                    subtitle: data.departures[1].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[2].headsign,
                                    subtitle: data.departures[2].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[3].headsign,
                                    subtitle: data.departures[3].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[4].headsign,
                                    subtitle: data.departures[4].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[5].headsign,
                                    subtitle: data.departures[5].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[6].headsign,
                                    subtitle: data.departures[6].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;

                        case 8:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[1].headsign,
                                    subtitle: data.departures[1].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[2].headsign,
                                    subtitle: data.departures[2].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[3].headsign,
                                    subtitle: data.departures[3].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[4].headsign,
                                    subtitle: data.departures[4].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[5].headsign,
                                    subtitle: data.departures[5].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[6].headsign,
                                    subtitle: data.departures[6].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[7].headsign,
                                    subtitle: data.departures[7].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;

                        default:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
                                    subtitle: data.departures[0].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[1].headsign,
                                    subtitle: data.departures[1].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[2].headsign,
                                    subtitle: data.departures[2].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[3].headsign,
                                    subtitle: data.departures[3].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[4].headsign,
                                    subtitle: data.departures[4].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[5].headsign,
                                    subtitle: data.departures[5].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[6].headsign,
                                    subtitle: data.departures[6].expected_mins + ' Minute(s)'
                                }, {
                                    title: data.departures[7].headsign,
                                    subtitle: data.departures[7].expected_mins + ' Minute(s)'
                                }]
                            };
                            break;
                    }
                }
                if (arrayLength > 0) {
                    timeOfBuses = JSON.parse(JSON.stringify(timeOfBuses));


                    stopTimings.section(0, timeOfBuses);
                    stopTimings.show();
                    timeOfBuses = {};
                }

            },
            function(err, stat, req) {
                console.log('ERROR - stopsNearYou.on - ' + err);
            }
        );
    });

});