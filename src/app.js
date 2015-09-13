var tempURL = 'https://developer.cumtd.com/api/v2.2/json/GetStopsByLatLon?key=79279d634cac41da9258b1875237c75a&lat=40.1128153&lon=-88.2289994&count=5';
// Get stops based on location

var UI = require('ui');
var ajax = require('ajax');

var stopIDs = [];

var baseURL = 'https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?';
var key = '79279d634cac41da9258b1875237c75a';

var stopsNearYou = new UI.Menu({}); // Menu for showing all the stops near your current location
var stopTimings = new UI.Menu({}); // Menu for the timings of the selected stop

var menuList = {
    // List of stops near you, part of stopsNearYou
    title: 'Bus Stops Near You',
    items: [{
        title: 'ERROR',
        //subtitle: 'ERROR'
    }, {
        title: 'ERROR',
        //subtitle: 'ERROR'
    }, {
        title: 'ERROR',
        //subtitle: 'ERROR'
    }, {
        title: 'ERROR',
        //subtitle: 'ERROR'
    }, {
        title: 'ERROR',
        //subtitle: 'ERROR'
    }]
};

var main = new UI.Card({
    title: ' UIUCUMTD',
    icon: 'images/bus.png',
    body: 'Welcome to the UIUC bus app!\n\nShashank Saxena',
    scrollable: false,
});

main.show();

main.on('click', 'select', function(e) {

  if(stopIDs)
    {
      stopIDs = [];
    }
  
    stopsNearYou.on('select', function(e) {
        ajax({
                url: baseURL + 'key=' + key + '&stop_id=' + stopIDs[e.itemIndex],
                type: 'json',
                method: 'get',
                async: false
            },
            function(data) {
                if (data) {
                    data = JSON.parse(JSON.stringify(data));
                    console.log(stopIDs[e.itemIndex]);
                  if(data) {
                    menuList = {
                        // Update the SAME menu object to have the timings of the chosen stop
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
                  }
                  
                    stopTimings.section(0, menuList);
                    stopTimings.show();

                }
            },
            function(err, stat, req) {
                console.log('ERROR - ' + err);
            }
        );

        console.log(e.itemIndex);
        var stopName = e.item.title;
        console.log(stopName);
    });

    ajax({
            //url: baseURL + 'key=' + key + '&stop_id=' + 'iu' + '&count=' + '5',
            url: tempURL,
            type: 'json',
            method: 'get',
            async: false
        },
        function(data) {
            if (data) {
                data = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < 5; i++) {
                    stopIDs.push(data.stops[i].stop_id);
                    menuList.items[i].title = data.stops[i].stop_name;
                }
                stopIDs = stopIDs.slice(0,5);
                stopsNearYou.section(0, menuList);
                //console.log(section.items[0].title);
                console.log(stopIDs);
                stopsNearYou.show();
            }
        },
        function(err, stat, req) {
            console.log('ERROR - ' + err);
        }
    );
});