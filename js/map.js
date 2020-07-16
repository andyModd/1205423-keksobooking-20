'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapForPins = map.querySelector('.map__pins');

  var fillOffers = function () {
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.offers.length; i++) {
      var createdPin = window.pin.createPin(window.data.offers[i]);
      documentFragment.appendChild(createdPin);
    }
    mapForPins.appendChild(documentFragment);
  };
  fillOffers();
})();
