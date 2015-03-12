var UI = require('ui');

var helpers = function (api) {
  if (!api) {
    console.log('Params Missing.');
  }

  this.api = api;
  console.log('IoT - Home - Pebble Helpers Initialized');
};

var IoTHelpers = function (api) {
  console.log('Initializing IoT - Home - Pebble Helpers');
  return new helpers(api);
};

helpers.prototype.refreshState = function (card, light) {
  this.api.getState(light, function (err, result) {
    if (err) {
      var errCard = new UI.Card({
        title    : card.title,
        subtitle : card.subtitle,
        body     : err.message
      });

      errCard.show();
      return;
    }

    var state = result.light.state.on ? 'On' : 'Off';
    card.body('Light Status: ' + state);
  });
};

helpers.prototype.refreshLights = function () {
  this.api.getAllLights(function (err, result) {
    if (err) {
      helpers.createErrorMenu('Hue Lights Home', err);
      return;
    }
  });
};

helpers.prototype.onCardError = function (card, error) {
  var errCard = new UI.Card({
    title: card.title,
    subtitle: card.subtitle,
    body: error.message
  });

  errCard.show();
};

helpers.prototype.createErrorMenu = function (title, error) {
  var errMenu = new UI.Card({
    title : title,
    body  : error.message
  });

  errMenu.show();
};

module.exports = IoTHelpers;
