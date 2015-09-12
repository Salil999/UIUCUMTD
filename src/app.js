/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

/*
var title = 'UIUCUMTD';
var sub = 'TEST';
var bod = 'BOD';
*/


var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var baseURL = 'https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?';
var key = '79279d634cac41da9258b1875237c75a';

var main = new UI.Card(
  {
    title: ' UIUCUMTD',
    icon: 'images/menu_icon.png',
    subtitle: 'TEST',
    body: 'Replace this with bod'
});

main.show();

main.on('click', 'select', function(e) {
  ajax(
    {
      url: baseURL + 'key=' + key + '&stop_id=' + 'iu' + '&count=' + '1',
      type: 'json',
      method: 'get',
      async: false
    },
      function(data, stat, req) {
        data = JSON.parse(data);
        console.log(data);
      },
      function(err, stat, req) {
        
      }
  );
  
    var window = new UI.Window({
        fullscreen: true,
    });

    var textfield = new UI.Text({
        position: new Vector2(0, 65),
        size: new Vector2(144, 30),
        font: 'gothic-24-bold',
        text: 'Text Anywhere!',
        textAlign: 'center'
    });

    window.add(textfield);
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