'use strict';
(function () {

  var createCard = function (offer) {
    var templateCard = document.querySelector('#card').content.querySelector('.map__card');
    var card = templateCard.cloneNode(true);
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
    var cardPhoto = card.querySelector('.popup__photo');

    var fillPhotos = function (offersPhotos, photoContainer) {
      photoContainer.innerHTML = '';
      for (var i = 0; i < offersPhotos.length; i++) {
        var photoImage = cardPhoto.cloneNode(true);
        photoImage.src = offersPhotos[i];
        photoContainer.appendChild(photoImage);
      }
      card.querySelector('.popup__close').addEventListener('click', function () {
        card.remove();
      });
    };

    var fillFeatures = function (offersFeatures) {
      for (var i = 0; i < offersFeatures.length; i++) {
        cardFeatures.querySelector('.popup__feature--' + offersFeatures[i]).textContent = offersFeatures[i];
      }
      var currentCardFeatures = cardFeatures.querySelectorAll('.popup__feature');
      for (var j = 0; j < currentCardFeatures.length; j++) {
        if (currentCardFeatures[j].childNodes.length === 0) {
          cardFeatures.removeChild(currentCardFeatures[j]);
        }
      }
    };

    cardAvatar.src = offer.author.avatar;
    cardAddress.textContent = offer.offer.address;
    cardTitle.textContent = offer.offer.title;
    cardPrice.textContent = offer.offer.price + ' ₽/ночь.';
    cardType.textContent = window.data.typesObj[offer.offer.type];
    cardCapacity.textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей.';
    cardTime.textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout + ' .';
    cardDescription.textContent = offer.offer.description;
    fillFeatures(offer.offer.features);
    fillPhotos(offer.offer.photos, cardPhotoContainer);
    document.querySelector('.map').insertBefore(card, document.querySelector('.map__filters-container'));
  };

  window.card = {
    createCard: createCard
  };
})();
