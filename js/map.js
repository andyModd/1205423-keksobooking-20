'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapForPins = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');

  var closeOfferCard = function () {
    var offerCard = map.querySelector('.map__card');
    var activePin = map.querySelector('.map__pin--active');
    if (offerCard) {
      offerCard.remove();
      activePin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onEscPress);
      offerCard.removeEventListener('click', onCardMouseDown);
    }
  };

  var openOfferCard = function (offer) {
    var offerCard = window.card.createCard(offer);
    document.querySelector('.map').insertBefore(offerCard, document.querySelector('.map__filters-container'));
    offerCard.querySelector('.popup__close').addEventListener('click', onCardMouseDown);
  };

  var renderOfferPins = function (offers) {
    clearOfferPins();
    var documentFragment = document.createDocumentFragment();
      offers.forEach(function (offer) {
        documentFragment.appendChild(window.pin.createPin(offer));
      });
    mapForPins.appendChild(documentFragment);
  };

  var clearOfferPins = function () {
    var filledOffers = map.querySelectorAll('.map__pin:not(.map__pin--main');
    filledOffers.forEach(function (offer) {
      offer.remove();
    });
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
    window.backend.load('https://javascript.pages.academy/keksobooking/data', renderOfferPins);
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

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeOfferCard();
    }
  }

  var onCardMouseDown = function (evt) {
    if (evt.which === 1) {
      closeOfferCard();
    }
  }

  window.map = {
    renderOfferPins: renderOfferPins,
    openOfferCard: openOfferCard,
    closeOfferCard: closeOfferCard,
    onCardMouseDown: onCardMouseDown,
    onEscPress: onEscPress,
    disableMap: disableMap,
    enableMap: enableMap
  };

})();
