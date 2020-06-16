'use strict';

var hours = ['12:00', '13:00', '14:00'];
var types = ['palace', 'flat', 'house', 'bungalo'];
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


var map = document.querySelector('.map');
var mapForPins = map.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
map.classList.remove('map--faded');


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

var getRandomOffer = function (types, features, photos) {
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
      'features': getRandomArray(features),
      'description': 'строка с описанием',
      'photos': getRandomArray(photos)
    },
    'location': {
      'x': getRandomInteger(1200, 354) - 32.5,
      'y': getRandomInteger(631, 217) - 87
    }
  };
  return offer;
};

var getSeveralOffers = function (amount) {
  var offers = [];
  for (var i = 0; i < amount; i++) {
    offers.push(getRandomOffer(types, features, photos));
  }
  return offers;
};

var createPin = function (offer) {
  pin = template.cloneNode(true);
  console.log(pin);
  var img = pin.querySelector('img');
  img.src = offer['author']['avatar'];
  img.alt = offer['offer']['title'];
  pin.style.top = '' + offer['location']['y'] + 'px';
  pin.style.left = '' + offer['location']['x'] + 'px';
  return pin;
};

var fillOffers = function () {
  var documentFragment = document.createDocumentFragment();
  var offers = [];
  offers = getSeveralOffers(8);
  console.log(offers);
  for (var i = 0; i < offers.length; i++) {
    var createdPin = createPin(offers[i]);
    documentFragment.appendChild(createdPin);
  }
  mapForPins.appendChild(documentFragment);
}

fillOffers();

