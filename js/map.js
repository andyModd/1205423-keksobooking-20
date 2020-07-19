'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapForPins = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');

  var fillOffers = function () {
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.offers.length; i++) {
      var createdPin = window.pin.createPin(window.data.offers[i]);
      documentFragment.appendChild(createdPin);
    }
    mapForPins.appendChild(documentFragment);
  };

  var disableMap = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.toggleStateOfForm(fieldsets, false);
    window.form.setInactiveAddress();
    mainPin.addEventListener('mousedown', onPinMouseDown);
    mainPin.addEventListener('keydown', onPinPress);
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.toggleStateOfForm(fieldsets, true);
    window.form.setActiveAddress();
    mainPin.removeEventListener('mousedown', onPinMouseDown);
    mainPin.removeEventListener('keydown', onPinPress);
  };

  var onPinMouseDown = function (evt) {
    if (evt.which === 1) {
      enableMap();
    }
  };

  var onPinPress = function (evt) {
    if (evt.key === 'Enter') {
      enableMap();
    }
  };

  window.map = {
    fillOffers: fillOffers,
    disableMap: disableMap,
    enableMap: enableMap
  };

})();
