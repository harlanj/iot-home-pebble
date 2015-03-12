var ajax = require('ajax');

var HTTP = function () {
  console.log('IoT - Home - Pebble HTTP Initialized');
};

var IoTHTTP = function () {
  console.log('Initializing IoT - Home - Pebble HTTP');
  return new HTTP();
};

HTTP.prototype.post = function (url, type, data, callback) {
  ajax(
    {
      url: url,
      method: 'post',
      type: type,
      data: JSON.stringify(data)
    },
    function (data) {
      callback(null, data);
    }, function (error) {
      callback(error);
    });
};

HTTP.prototype.get = function (url, type, callback) {
  ajax({
    url: url,
    method: 'get',
    type: type
  }, function (data) {
    callback(null, data);
  }, function (error) {
    callback(error);
  });
};

HTTP.prototype.put = function (url, type, data, callback) {
  ajax({
    url: url,
    method: 'put',
    type: type,
    data: JSON.stringify(data)
  }, function (data) {
    callback(null, data);
  }, function (error) {
    callback(error);
  });
};

module.exports = IoTHTTP;
