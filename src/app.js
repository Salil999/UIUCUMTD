var tempURL = 'https://developer.cumtd.com/api/v2.2/json/GetStopsByLatLon?key=79279d634cac41da9258b1875237c75a&lat=40.1128153&lon=-88.2289994&count=5';
//Get stops based on location

var UI = require('ui');
var ajax = require('ajax');

var stopIDs = [];

//var baseURL = 'https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?';
//var key = '79279d634cac41da9258b1875237c75a';

var stopsNearYou = new UI.Menu({}); // Menu for showing all the stops near your current location
var stopTimings = new UI.Menu({}); // Menu for the timings of the selected stop

var stopsNearYouList = {
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

    stopsNearYou.on('select', function(e) {
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
                //console.log(data);
                for (var i = 0; i < 5; i++) {
                    stopIDs.push(data.stops[i].stop_id);
                    stopsNearYouList.items[i].title = data.stops[i].stop_name;
                }
                stopsNearYou.section(0, stopsNearYouList);
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


/*
main.on('click', 'up', function(e) {
    var menu = new UI.Menu({
        sections: [{
            items: [{
                title: 'First Item',
                icon: 'images/menu_icon.png',
                subtitle: 'Subtitle Text'
            }, {
                title: 'Second Item',
                subtitle: 'Subtitle Text'
            }, {
                title: 'Third Item',
                subtitle: 'Subtitle Text'
            }]
        }]
    });

    menu.on('select', function(e) {
        console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
        console.log('The item is titled "' + e.item.title + '"');
    });
    menu.show();
});

main.on('click', 'down', function(e) {
    var card = new UI.Card();
    card.title('A Card');
    card.subtitle('Is a Window');
    card.body('The simplest window type in Pebble.js.');
    card.show();
});
*/