'use strict';
(function () {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (offer) {
    var pin = template.cloneNode(true);
    var img = pin.querySelector('img');
    img.src = offer.author.avatar;
    img.alt = offer.offer.title;
    pin.style.top = offer.location.y - pin.offsetHeight + 'px';
    pin.style.left = offer.location.x - pin.offsetWidth / 2 + 'px';

    pin.addEventListener('click', function () {
      window.map.closeOfferCard();
      pin.classList.add('map__pin--active');
      window.map.openOfferCard(offer);
      document.addEventListener('keydown', window.map.onEscPress);
    });

    return pin;
  };

  window.pin = {
    createPin: createPin
  };
})();
