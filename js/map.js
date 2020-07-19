'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapForPins = map.querySelector('.map__pins');
  var map = document.querySelector('.map');
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
    evt.preventDefault();

    if (evt.which === 1) {
      enableMap();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        console.log(1);
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };
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
