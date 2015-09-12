/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */


var UI = require('ui');
//var Vector2 = require('vector2');
var ajax = require('ajax');

var baseURL = 'https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?';
var key = '79279d634cac41da9258b1875237c75a';

var main = new UI.Card({
    title: ' UIUCUMTD',
    icon: 'bus_icon.png',
    body: 'Replace this with bod'
});

main.show();

main.on('click', 'select', function(e) {

    var menu = new UI.Menu({
    });

    /*
      var textfield = new UI.Text({
          position: new Vector2(0, 65),
          size: new Vector2(144, 30),
          font: 'gothic-24-bold',
          text: 'Text Anywhere!',
          textAlign: 'center'
      });
     Change using 'textfield.objectProperty(newValue);'
     EX 'textfield.text('Hello!');
    */
    ajax({
            url: baseURL + 'key=' + key + '&stop_id=' + 'iu' + '&count=' + '5',
            type: 'json',
            method: 'get',
            async: false
        },
        function(data) {
            //data = JSON.stringify(data);
            //console.log(menu);
            var section = {
                title: 'Bus Stops Near You',
                items: [{
                    title: 'Title 1',
                  subtitle: 'Minutes'
                },
                        {
                    title: 'Title 2',
                  subtitle: 'Minutes'
                },
                        {
                          title: 'Title 3',
                          subtitle: 'Minutes'
                       },
                       {
                         title: 'Title 4',
                         subtitle: 'Minutes'
                       },
                       {
                         title: 'Title 5',
                         subtitle: 'Minutes'
                       }]
            };
            menu.section(0, section);
            menu.show();
        },
        function(err, stat, req) {
            console.log('ERROR - ' + err);
        }
    );

    var window = new UI.Window({
        fullscreen: true,
    });

    window.show();

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