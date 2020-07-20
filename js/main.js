'use strict';
(function () {
  var onError = function (message) {
    console.log(message);
  };
  var onSuccess = function (data) {
    console.log(data);
  };
  window.backend.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);

  window.addEventListener('load', function () {
    window.map.disableMap();
  });
})();
