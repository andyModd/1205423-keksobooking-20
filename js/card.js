'use strict';
(function () {

  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var PHOTO_ALT = 'Фотография жилья';

  var roomTypes = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  var fillPhotos = function (offersPhotos, photoContainer) {
    photoContainer.innerHTML = '';
    if (offersPhotos.length) {
      offersPhotos.forEach(function(offerPhoto) {
        var photoImage = document.createElement('img');
        photoImage.classList.add('popup__photo');
        photoImage.src = offerPhoto;
        photoImage.width = PHOTO_WIDTH;
        photoImage.height = PHOTO_HEIGHT;
        photoImage.alt = PHOTO_ALT;
        photoContainer.appendChild(photoImage);
      });
    } else {
      hideElement(photoContainer);
    }
  };

  var fillFeatures = function (offersFeatures, feautureContainer) {
    feautureContainer.innerHTML = '';
    if (offersFeatures.length) {
      offersFeatures.forEach(function (offerFeature){
        var featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', 'popup__feature--' + offerFeature);
        feautureContainer.appendChild(featureItem);
      });
    } else {
      hideElement(feautureContainer);
    }
  };

  var fillTextContent = function (offersCardElement, container) {
    if (offersCardElement) {
      container.textContent = offersCardElement;
    } else {
      hideElement(container);
    }
  };

  var switchGuests = function (amount) {
    switch (amount) {
      case 1:
        return amount + ' гостя';
      default:
        return amount + ' гостей';
    }
  };

  var switchRooms = function (amount) {
    switch (amount) {
      case 1:
        return amount + ' комната';
      case 2:
      case 3:
      case 4:
        return amount + ' комнаты';
      default:
        return amount + ' комнат';
    }
  };

  var createCard = function (offer) {
    var templateCard = document.querySelector('#card').content.querySelector('.map__card');
    var card = templateCard.cloneNode(true);
    var closeButton = card.querySelector('.popup__close');
    var cardAvatar = card.querySelector('.popup__avatar');
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardFeatures = card.querySelector('.popup__features');
    var cardType = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var cardTime = card.querySelector('.popup__text--time');
    var cardDescription = card.querySelector('.popup__description');
    var cardPhotoContainer = card.querySelector('.popup__photos');

    fillTextContent(offer.offer.description, cardDescription);
    fillTextContent(roomTypes[offer.offer.type], cardType);
    fillTextContent(offer.offer.price, cardPrice);
    fillTextContent(offer.offer.title, cardTitle);
    fillTextContent(offer.offer.address, cardAddress);
    fillFeatures(offer.offer.features, cardFeatures);
    fillPhotos(offer.offer.photos, cardPhotoContainer);

    if (offer.author.avatar) {
      cardAvatar.src = offer.author.avatar;
    } else {
      hideElement(cardAvatar);
    }

    if (offer.offer.price) {
      cardPrice.textContent = offer.offer.price + ' ₽/ночь';
    }

    if (offer.offer.rooms && offer.offer.guests) {
      cardCapacity.textContent = switchRooms(offer.offer.rooms) + ' для ' + switchGuests(offer.offer.guests) + '.';
    } else {
      hideElement(cardCapacity);
    }

    if (offer.offer.checkin || offer.offer.checkout) {
      cardTime.textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout + '.';
    } else {
      hideElement(cardTime);
    }

    closeButton.addEventListener('click', window.map.onCardMouseDown);

    return card;
  };

  window.card = {
    createCard: createCard
  };
})();
