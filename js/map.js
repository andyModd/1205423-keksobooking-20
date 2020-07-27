'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapForPins = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersFormTags = document.querySelectorAll('input, select, fieldset');
  var fieldsets = document.querySelectorAll('fieldset');

  var closeOfferCard = function () {
    var offerCard = map.querySelector('.map__card');
    var activePin = map.querySelector('.map__pin--active');
    if (offerCard) {
      offerCard.remove();
      activePin.classList.remove('map__pin--active');
    }
    document.removeEventListener('keydown', onEscPress);
  };

  var openOfferCard = function (offer) {
    var offerCard = window.card.create(offer);
    map.insertBefore(offerCard, document.querySelector('.map__filters-container'));
    offerCard.querySelector('.popup__close').addEventListener('click', onCardMouseDown);
  };

  var renderOfferPins = function (offers) {
    clearOfferPins();
    var documentFragment = document.createDocumentFragment();
    offers.slice(0, window.constants.offerAmount).forEach(function (offer) {
      documentFragment.appendChild(window.pin.create(offer));
    });
    mapForPins.appendChild(documentFragment);
  };

  var clearOfferPins = function () {
    var filledOffers = map.querySelectorAll('.map__pin:not(.map__pin--main');
    filledOffers.forEach(function (offer) {
      offer.remove();
    });
  };

  var onSuccessLoad = function (data) {
    window.offers = data;
    renderOfferPins(data);
  };

  var onErrorLoad = function () {
    onUnsuccessfullMessage();
  };


  var onSuccessMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      removeSuccessMessage();
    }
  };

  var onWindowSuccessMessageClick = function (evt) {
    if (evt.target.matches('.success')) {
      removeSuccessMessage();
    }
  };

  var removeSuccessMessage = function () {
    document.querySelector('.success').remove();
  };

  var onSuccessMessage = function () {
    var successfullMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    document.querySelector('main').appendChild(successfullMessage);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onWindowSuccessMessageClick);
  };

  var removeUnsuccessfullMessage = function () {
    document.querySelector('.error').remove();
  };

  var onErrorButtonClick = function () {
    removeUnsuccessfullMessage();
  };

  var onUnSuccessfullMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      removeUnsuccessfullMessage();
    }
  };

  var onWindowUnsuccessfullMessageClick = function (evt) {
    if (evt.target.matches('.error')) {
      removeUnsuccessfullMessage();
    }
  };

  var onUnsuccessfullMessage = function (errorMessage) {
    var unSuccessfullMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var messageText = unSuccessfullMessage.querySelector('.error__message');
    messageText.textContent = errorMessage;

    document.querySelector('main').appendChild(unSuccessfullMessage);

    var errorButton = unSuccessfullMessage.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onUnSuccessfullMessageEscPress);
    document.addEventListener('click', onWindowUnsuccessfullMessageClick);
  };

  var onSubmit = function (evt) {
    window.backend.upload(new FormData(adForm), onSuccessMessage, onUnsuccessfullMessage);
    window.map.disableActiveMode();
    evt.preventDefault();
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    window.map.disableActiveMode();
  };

  adForm.addEventListener('submit', onSubmit);
  resetButton.addEventListener('click', onResetButtonClick);

  var disableActiveMode = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.toggleState(fieldsets, false);
    window.form.toggleState(mapFiltersFormTags, false);
    closeOfferCard();
    clearOfferPins();
    adForm.reset();
    mapFiltersForm.reset();
    mapFiltersForm.classList.add('hidden');
    mainPin.style.top = window.constants.pinStartCoordY;
    mainPin.style.left = window.constants.pinStartCoordX;
    window.form.setInactiveAddress();
    mainPin.addEventListener('mousedown', onPinMouseDown);
    mainPin.addEventListener('keydown', onPinPress);
  };

  var enableActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.toggleState(fieldsets, true);
    window.form.toggleState(mapFiltersFormTags, true);
    mapFiltersForm.classList.remove('hidden');
    window.form.setActiveAddress();
    mainPin.removeEventListener('mousedown', onPinMouseDown);
    mainPin.removeEventListener('keydown', onPinPress);
    window.backend.load(window.constants.urlGet, window.constants.requestGet, onSuccessLoad, onErrorLoad);
  };

  var onPinMouseDown = function (evt) {
    if (evt.which === 1) {
      enableActiveMode();
    }
  };

  var onPinPress = function (evt) {
    if (evt.key === 'Enter') {
      enableActiveMode();
    }
  };

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeOfferCard();
    }
  };

  var onCardMouseDown = function (evt) {
    if (evt.which === 1) {
      closeOfferCard();
    }
  };

  window.map = {
    renderOfferPins: renderOfferPins,
    openOfferCard: openOfferCard,
    closeOfferCard: closeOfferCard,
    clearOfferPins: clearOfferPins,
    onCardMouseDown: onCardMouseDown,
    onEscPress: onEscPress,
    disableActiveMode: disableActiveMode,
    enableActiveMode: enableActiveMode
  };

})();
