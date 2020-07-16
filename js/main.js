'use strict';
(function () {
  var map = document.querySelector('.map');
  var btnMapPin = document.querySelector('.map__pin');
  var adForm = document.querySelector('.ad-form');
  var mapFilter = document.querySelector('.map__filters');

  window.addEventListener('load', function () {
    Array.from(mapFilter.children).forEach(function (tag) {
      tag.disabled = true;
    });
    Array.from(adForm.children).forEach(function (tag) {
      tag.disabled = true;
    });

    document.querySelector('#address').value = Math.floor(btnMapPin.offsetLeft + btnMapPin.offsetHeight / 2) + ', ' + Math.floor(btnMapPin.offsetTop + btnMapPin.offsetWidth / 2);
  });

  btnMapPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      Array.from(mapFilter.children).forEach(function (tag) {
        tag.disabled = false;
      });
      Array.from(adForm.children).forEach(function (tag) {
        tag.disabled = false;
      });
      document.querySelector('#address').value = Math.floor(btnMapPin.offsetLeft + btnMapPin.offsetHeight + 10) + ', ' + Math.floor(btnMapPin.offsetTop + btnMapPin.offsetWidth + 22);
    }
  });

  btnMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      Array.from(mapFilter.children).forEach(function (tag) {
        tag.disabled = false;
      });
      Array.from(adForm.children).forEach(function (tag) {
        tag.disabled = false;
      });
      document.querySelector('#address').value = Math.floor(btnMapPin.offsetLeft + btnMapPin.offsetHeight + 10) + ', ' + Math.floor(btnMapPin.offsetTop + btnMapPin.offsetWidth + 22);
    }
  });
})();
