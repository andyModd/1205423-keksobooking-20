'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mapEdges = {
    top: window.data.yMin - window.form.mainActivePinHeight,
    bottom: window.data.yMax - window.form.mainActivePinHeight,
    left: window.data.xMin - Math.ceil(mainPin.offsetWidth / 2),
    right: window.data.xMax - Math.ceil(mainPin.offsetWidth / 2)
  };
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (mainPin.offsetLeft - shift.x < mapEdges.left) {
        mainPin.style.left = mapEdges.left + 'px';
      } else if (mainPin.offsetLeft - shift.x > mapEdges.right) {
        mainPin.style.left = mapEdges.right + 'px';
      } else if (mainPin.offsetTop - shift.y < mapEdges.top) {
        mainPin.style.top = mapEdges.top + 'px';
      } else if (mainPin.offsetTop - shift.y > mapEdges.bottom) {
        mainPin.style.top = mapEdges.bottom + 'px';
      } else {
        mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
        mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
      }
      window.form.setActiveAddress();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
