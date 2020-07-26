'use strict';
(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var PHOTO_ALT = 'Фотография жилья';

  var MAIN_ACTIVE_PIN_HEIGHT = 77;

  var PIN_START_COORD_X = '570px';
  var PIN_START_COORD_Y = '375px';

  var Y_MIN = 130;
  var Y_MAX = 630;
  var X_MIN = 0;
  var X_MAX = 1200;

  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'http://javascript.pages.academy/keksobooking';
  var REQUEST_GET = 'GET';
  var REQUEST_POST = 'POST';
  var TIMEOUT_IN_MS = 10000;

  var OFFER_AMOUNT = 5;
  var FILTER_DEFAULT_VALUE = 'any';

  window.constants = {
    xMin: X_MIN,
    xMax: X_MAX,
    yMin: Y_MIN,
    yMax: Y_MAX,
    photoWidth: PHOTO_WIDTH,
    photoHeight: PHOTO_HEIGHT,
    photoAlt: PHOTO_ALT,
    mainActivePinHeight: MAIN_ACTIVE_PIN_HEIGHT,
    pinStartCoordX: PIN_START_COORD_X,
    pinStartCoordY: PIN_START_COORD_Y,
    urlGet: URL_GET,
    urlPost: URL_POST,
    requestGet: REQUEST_GET,
    requestPost: REQUEST_POST,
    timeoutInMs: TIMEOUT_IN_MS,
    offerAmount: OFFER_AMOUNT,
    filterDefaultValue: FILTER_DEFAULT_VALUE,
  };
})();
