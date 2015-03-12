var http = require('./http')();

var api = function (config) {
  if (!config) {
    console.log('Params Missing');
  }
  this.init = true;
  this.config = config;
  console.log('IoT - Home - Pebble API Initialized');
};

var IoTAPI = function (config) {
  console.log('Initializing IoT - Home - Pebble API');
  return new api(config);
};

api.prototype.findAllLights = function (callback) {
  if (!this.init) {
    return callback({ message : 'API Not Initialized' });
  }
  http.get(this.config.host + '/hue/lights', 'json', callback);
};

api.prototype.turnLightOn = function (light, callback) {
  if (!this.init) {
    return callback({ message : 'API Not Initialized' });
  }
  http.get(this.config.host + '/hue/light/' + light + '/on', 'json', callback);
};

api.prototype.turnLightOff = function (light, callback) {
  if (!this.init) {
    return callback({ message : 'API Not Initialized' });
  }
  http.get(this.config.host + '/hue/light/' + light + '/off', 'json', callback);
};

api.prototype.getState = function (light, callback) {
  if (!this.init) {
    return callback({ message : 'API Not Initialized' });
  }
  http.get(this.config.host + '/hue/light/' + light, 'json', callback);
};

module.exports = IoTAPI;
