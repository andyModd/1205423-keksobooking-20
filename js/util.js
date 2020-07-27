'use strict';
(function () {
  window.util = {
    isEnterPressed: function (evt) {
      return evt.keyCode === window.constants.enterKey;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === window.constants.escKey;
    },
    isLeftMouseDown: function (evt) {
      return evt.which === window.constants.leftMouseButtonKey;
    },
  };
})();
