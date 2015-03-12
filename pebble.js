var UI      = require('ui');
var Vector2 = require('vector2');

var config = require('./config');
var api    = require('./api')(config);
var helpers = require('./helpers')(api);

// Splashscreen
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position        : new Vector2(0, 0),
  size            : new Vector2(144, 168),
  text            : 'Loading lights...',
  font            : 'GOTHIC_24_BOLD',
  color           : 'black',
  textOverflow    : 'wrap',
  textAlign       : 'center',
  backgroundColor : 'white'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

var parseFeed = function (lights, quantity) {
  var items = [];
  for (var i = 0; i < quantity; i++) {
    var lightName = lights[i].name;
    var type      = lights[i].type;
    var id        = lights[i].id;

    items.push({
      id       : id,
      title    : lightName,
      subtitle : type
    });
  }
  return items;
};

var hueMenu = function (list) {
  var resultsMenu = new UI.Menu({
    sections: [{
      title : 'Hue Lights Home',
      items : list
    }]
  });
  return resultsMenu;
};

api.findAllLights(function (err, result) {
  if (err) {
    helpers.createErrorMenu('Hue Lights Home', err);
    splashWindow.hide();
    return;
  }

  var hueLights  = parseFeed(result.lights.lights, result.lights.lights.length);
  var lightsMenu = hueMenu(hueLights);

  lightsMenu.show();
  splashWindow.hide();

  lightsMenu.on('select', function (event) {
    var selectedLight = hueLights[event.itemIndex];
    api.getState(selectedLight.id, function (err, result) {
      if (err) {
        helpers.createErrorMenu(selectedLight.name, err);
        return;
      }

      var state = result.light.state.on ? 'On' : 'Off';
      var lightCard = new UI.Card({
        title: result.light.name,
        subtitle: result.light.type,
        body: 'Light Status: ' + state
      });

      lightCard.show();

      lightCard.on('click', 'up', function () {
        api.turnLightOn(selectedLight.id, function (err, result) {
          if (err) {
            helpers.onCardError(lightCard, err);
            return;
          }

          helpers.refreshState(lightCard, selectedLight.id);
        });
      });

      lightCard.on('click', 'down', function () {
        api.turnLightOff(selectedLight.id, function (err, result) {
          if (err) {
            helpers.onCardError(lightCard, err);
            return;
          }

          helpers.refreshState(lightCard, selectedLight.id);
        });
      });
    });
  });
});
