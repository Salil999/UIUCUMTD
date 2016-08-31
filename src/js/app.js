var UI = require('ui');
var ajax = require('ajax');
var arrayLength;
var stopIDs = [];
var stopsNearYou = new UI.Menu({});
var stopTimings = new UI.Menu({});
var noBus;
//var key = '79279d634cac41da9258b1875237c75a';
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
        title: '',
    }, {
        title: '',
    }, {
        title: '',
    }, {
        title: '',
    }, {
        title: '',
    }, {
        title: ''
    }]
};

var main = new UI.Card({
    title: ' UIUCUMTD',
    body: 'Welcome to the UIUC bus app!\n\nShashank Saxena',
    scrollable: false,
});
main.icon('vehicle');

var emptyArrayCard = new UI.Card({
    title: '     No Buses',
    subtitle: '\n    No buses within 30 mins',
    scrollable: false
});

function locationSuccess(pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
}

function locationError(err) {
    console.log('location error (' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
});

main.show();

//stopsNearYou.show();

main.on('click', 'select', function(e) {
    for (var i = 0; i < 6; i++) {
        menuList.items[i].title = 'Loading';
    }
    stopsNearYou.section(0, menuList);
    stopsNearYou.show();
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
    });
    var getGeoLocationURL = 'https://developer.cumtd.com/api/v2.2/json/GetStopsByLatLon?key=79279d634cac41da9258b1875237c75a&lat=' + lat + '&lon=' + lon + '&count=6';
    if (stopIDs) {
        stopIDs = [];
    }
    ajax({
            url: getGeoLocationURL,
            type: 'json',
            method: 'get',
            async: true
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
            console.log('ERROR - main.on - \n' + JSON.stringify(err));
        }
    );

    stopsNearYou.on('select', function(e) {
        if (noBus === false) {
            timeOfBuses = {
                title: 'Loading',
                items: [{
                    title: 'Loading...',
                    subtitle: 'Fetching Data...'
                }]
            };
            stopTimings.section(0, timeOfBuses);
            stopTimings.show();
        }
        ajax({
                url: 'https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?key=79279d634cac41da9258b1875237c75a&stop_id=' + stopIDs[e.itemIndex],
                type: 'json',
                method: 'get',
                async: true
            },
            function(data) {
                if (data) {
                    data = JSON.parse(JSON.stringify(data)); //JSON Validator
                    arrayLength = data.departures.length;
                    timeOfBuses.title = e.item.title;
                    switch (arrayLength) {
                        case 0:
                            emptyArrayCard.show();
                            noBus = true;
                            break;

                        case 1:
                            timeOfBuses = {
                                title: e.item.title,
                                items: [{
                                    title: data.departures[0].headsign,
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
                }
            },
            function(err, stat, req) {
                console.log('ERROR - stopsNearYou.on - ' + err);
            }
        );
    });
});