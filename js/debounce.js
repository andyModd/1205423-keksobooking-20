'use strict';

(function () {
  var lastTimeout = null;

  window.debounce = function (callback) {
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, window.constants.debounceInterval);
    };
  };
})();
