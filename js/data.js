'use strict';
(function () {
  var hours = ['12:00', '13:00', '14:00'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var typesObj = {
    'palace': 'Дворец',
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

  var getRandomInteger = function (maxValue, minValue) {
    if (minValue === undefined) {
      return Math.floor(Math.random() * maxValue);
    } else {
      return Math.floor(Math.random() * (maxValue - minValue) + minValue);
    }
  };

  var getRandomArray = function (array) {
    var usedArray = array.slice();
    var shuffledArray = [];
    var i = usedArray.length;
    var newLength = getRandomInteger(usedArray.length) + 1;
    while (i--) {
      var r = getRandomInteger(i);
      var removed = usedArray.splice(r, 1);
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

  var getSeveralOffers = function (amount) {
    var localOffers = [];
    for (var i = 0; i < amount; i++) {
      localOffers.push(getRandomOffer(features, photos));
    }
    return localOffers;
  }

  offers = getSeveralOffers(8);

  window.data = {
    photos: photos,
    features: features,
    typesObj: typesObj,
    types: types,
    hours: hours,
    offers: offers,
  };
})();


