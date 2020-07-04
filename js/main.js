'use strict';

var hours = ['12:00', '13:00', '14:00'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var typesObj = {'palace': 'Дворец',
                'flat': 'Квартира',
                'house': 'Дом',
                'bungalo': 'Бунгало'
};
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var offers = [];

var map = document.querySelector('.map');
var mapForPins = map.querySelector('.map__pins');
var btnMapPin = document.querySelector('.map__pin');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var card = templateCard.cloneNode(true);
var cardTitle = card.querySelector('.popup__title');
var cardAddress = card.querySelector('.popup__text--address');
var cardPrice = card.querySelector('.popup__text--price');
var cardFeatures = card.querySelector('.popup__features');
var cardType = card.querySelector('.popup__type');
var cardCapacity = card.querySelector('.popup__text--capacity');
var cardTime = card.querySelector('.popup__text--time');
var cardDescription = card.querySelector('.popup__description');
var cardPhotoContainer = card.querySelector('.popup__photos');
var cardPhoto =  card.querySelector('.popup__photo');
var adForm = document.querySelector('.ad-form');
var mapFilter = document.querySelector('.map__filters');
var listCapacity = document.querySelector('#capacity');
var listRoomNumber = document.querySelector('#room_number');

var getRandomInteger = function (maxValue, minValue) {
  if (minValue === undefined) {
    return Math.floor(Math.random() * maxValue);
  } else {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
  }
};

var getRandomArray = function (array) {
  var shuffledArray = [];
  var i = array.length;
  var newLength = getRandomInteger(array.length) + 1;
  while (i--) {
    var r = getRandomInteger(i);
    var removed = array.splice(r, 1);
    shuffledArray.push(removed[0]);
  }
  return shuffledArray.slice(0, newLength);
};

var getRandomOffer = function (featuresArray, photosArray) {
  var offer = {
    'author': {'avatar': 'img/avatars/user0' + getRandomInteger(9) + '.png'},
    'offer': {
      'title': 'заголовок предложения',
      'address': '600, 350',
      'price': getRandomInteger(20000),
      'type': types[getRandomInteger(types.length)],
      'rooms': getRandomInteger(3),
      'guests': getRandomInteger(3),
      'checkin': hours[getRandomInteger(hours.length)],
      'checkout': hours[getRandomInteger(hours.length)],
      'features': getRandomArray(featuresArray),
      'description': 'строка с описанием',
      'photos': getRandomArray(photosArray)
    },
    'location': {
      'x': getRandomInteger(1200, 354) - 32.5,
      'y': getRandomInteger(631, 217) - 87
    }
  };
  return offer;
};

function getSeveralOffers(amount) {
  var offers = [];
  for (var i = 0; i < amount; i++) {
    offers.push(getRandomOffer(features, photos));
  }
  return offers;
}

var createPin = function (offer) {
  var pin = template.cloneNode(true);
  var img = pin.querySelector('img');
  img.src = offer['author']['avatar'];
  img.alt = offer['offer']['title'];
  pin.style.top = '' + offer['location']['y'] + 'px';
  pin.style.left = '' + offer['location']['x'] + 'px';
  return pin;
};

var fillOffers = function () {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    var createdPin = createPin(offers[i]);
    documentFragment.appendChild(createdPin);
  }
  mapForPins.appendChild(documentFragment);
};

function fillPhotos(offersPhotos, cardPhotoContainer) {
  var amount = offersPhotos.length;
  for (var i = 0; i < amount - 1; i++) {
    cardPhotoContainer.appendChild(cardPhoto.cloneNode(true));
  }
  var currentCardPhotos = cardPhotoContainer.querySelectorAll('.popup__photo');
  for (var i = 0; i < offersPhotos.length; i++) {
    currentCardPhotos[i].src = offersPhotos[i];
  }
}

function fillFeatures(offersFeatures) {
  for (var feature of offersFeatures) {
    cardFeatures.querySelector(`.popup__feature--${feature}`).textContent = feature;
  }

  var currentCardFeatures = cardFeatures.querySelectorAll('.popup__feature');
  for (var currentCardFeature of currentCardFeatures) {
    if (currentCardFeature.childNodes.length === 0) {
      cardFeatures.removeChild(currentCardFeature);
    }
  }
}

function createCard(offer) {
  cardAddress.textContent = offer.offer.address;
  cardTitle.textContent = offer.offer.title;
  cardPrice.textContent = `${offer.offer.price} ₽/ночь.`;
  cardType.textContent = typesObj[offer.offer.type];
  cardCapacity.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей.`;
  cardTime.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}.`;
  cardDescription.textContent = offer.offer.description;
  fillFeatures(offer.offer.features);
  fillPhotos(offer.offer.photos, cardPhotoContainer);
  document.querySelector('.map').insertBefore(card, document.querySelector('.map__filters-container'));
}

offers = getSeveralOffers(8);

window.addEventListener('load', () => {
  Array.from(mapFilter.children).forEach(tag => tag.disabled = true);
  Array.from(adForm.children).forEach(tag => tag.disabled = true);

  document.querySelector('#address').value = `${Math.floor(btnMapPin.offsetLeft + btnMapPin.offsetHeight / 2)}, ${Math.floor(btnMapPin.offsetTop + btnMapPin.offsetWidth / 2)}`;
});

btnMapPin.addEventListener('mousedown', evt => {
  if (evt.which === 1){
    map.classList.remove('map--faded');
    Array.from(mapFilter.children).forEach(tag => tag.disabled = false);
    Array.from(adForm.children).forEach(tag => tag.disabled = false);

    document.querySelector('#address').value = `${Math.floor(btnMapPin.offsetLeft + btnMapPin.offsetHeight + 10)}, ${Math.floor(btnMapPin.offsetTop + btnMapPin.offsetWidth + 22)}`;
  }
});

btnMapPin.addEventListener('keydown', evt => {
  if (evt.key === 'Enter') {
    map.classList.remove('map--faded');
    Array.from(mapFilter.children).forEach(tag => tag.disabled = false);
    Array.from(adForm.children).forEach(tag => tag.disabled = false);
    document.querySelector('#address').value = `${Math.floor(btnMapPin.offsetLeft + btnMapPin.offsetHeight + 10)}, ${Math.floor(btnMapPin.offsetTop + btnMapPin.offsetWidth + 22)}`;
  }
});


listCapacity.addEventListener('invalid', () => {
  if ((listRoomNumber.selectedIndex === 0 && listCapacity.selectedIndex === 0) || (listRoomNumber.selectedIndex === 0 && listCapacity.selectedIndex === 1) || (listRoomNumber.selectedIndex === 0 && listCapacity.selectedIndex === 3)) {
    listCapacity.setCustomValidity('Выберите другое количество гостей');
  } else if ((listRoomNumber.selectedIndex === 1 && listCapacity.selectedIndex === 0) || (listRoomNumber.selectedIndex === 1 && listCapacity.selectedIndex === 3)) {
    listCapacity.setCustomValidity('Выберите другое количество гостей');
  }  else if (listRoomNumber.selectedIndex === 2 && listCapacity.selectedIndex === 3) {
    listCapacity.setCustomValidity('Выберите другое количество гостей');
  } else if ((listRoomNumber.selectedIndex === 3 && listCapacity.selectedIndex === 0) || (listRoomNumber.selectedIndex === 3 && listCapacity.selectedIndex === 1) || (listRoomNumber.selectedIndex === 3 && listCapacity.selectedIndex === 2)) {
    listCapacity.setCustomValidity('Эта квартира не для гостей');
  } else {
    listCapacity.setCustomValidity('');
  }
});

adForm.addEventListener('submit', (evt) => {
  if ((listRoomNumber.selectedIndex === 0 && listCapacity.selectedIndex === 0) || (listRoomNumber.selectedIndex === 0 && listCapacity.selectedIndex === 1) || (listRoomNumber.selectedIndex === 0 && listCapacity.selectedIndex === 3)) {
    evt.preventDefault();
    listCapacity.setCustomValidity('Выберите другое количество гостей');
  } else if ((listRoomNumber.selectedIndex === 1 && listCapacity.selectedIndex === 0) || (listRoomNumber.selectedIndex === 1 && listCapacity.selectedIndex === 3)) {
    evt.preventDefault();
    listCapacity.setCustomValidity('Выберите другое количество гостей');
  }  else if (listRoomNumber.selectedIndex === 2 && listCapacity.selectedIndex === 3) {
    evt.preventDefault();
    listCapacity.setCustomValidity('Выберите другое количество гостей');
  } else if ((listRoomNumber.selectedIndex === 3 && listCapacity.selectedIndex === 0) || (listRoomNumber.selectedIndex === 3 && listCapacity.selectedIndex === 1) || (listRoomNumber.selectedIndex === 3 && listCapacity.selectedIndex === 2)) {
    evt.preventDefault();
    listCapacity.setCustomValidity('Эта квартира не для гостей');
  }
});
//fillOffers();
//createCard(offers[0]);
