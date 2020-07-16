'use strict';
(function () {
  var map = document.querySelector('.map');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (offer) {
    var pin = template.cloneNode(true);
    var img = pin.querySelector('img');
    img.src = offer['author']['avatar'];
    img.alt = offer['offer']['title'];
    pin.style.top = '' + offer['location']['y'] + 'px';
    pin.style.left = '' + offer['location']['x'] + 'px';

    pin.addEventListener('click', function () {
      if (map.contains(document.querySelector('.map__card'))) {
        map.querySelector('.map__card').remove();
      }
      window.card.createCard(offer);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        map.querySelector('.map__card').remove();
      }
    });
    return pin;
  };

  window.pin = {
    createPin: createPin
  }
})();
