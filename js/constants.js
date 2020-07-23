'use strict';
(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var PHOTO_ALT = 'Фотография жилья';

  var MAIN_ACTIVE_PIN_HEIGHT = 77;

  var Y_MIN = 130;
  var Y_MAX = 630;
  var X_MIN = 0;
  var X_MAX = 1200;

  var TIMEOUT_IN_MS = 10000;
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.constants = {
    xMin: X_MIN,
    xMax: X_MAX,
    yMin: Y_MIN,
    yMax: Y_MAX,
    photoWidth: PHOTO_WIDTH,
    photoHeight: PHOTO_HEIGHT,
    photoAlt: PHOTO_ALT,
    mainActivePinHeight: MAIN_ACTIVE_PIN_HEIGHT,
    url: URL,
    timeoutInMs: TIMEOUT_IN_MS
  };
})();
