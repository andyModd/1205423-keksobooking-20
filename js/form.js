'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var capacitySelect = document.querySelector('#capacity');
  var roomSelect = document.querySelector('#room_number');
  var offerTitle = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var addressInput = document.querySelector('#address');

  var toggleStateOfForm = function (elements, isActive) {
    if (isActive) {
      elements.forEach(function (element) {
        element.disabled = false;
      });
    } else {
      elements.forEach(function (element) {
        element.disabled = true;
      });
    }
  };

  var setInactiveAddress = function () {
    var coordinateX = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var coordinateY = Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
    addressInput.value = coordinateX + ', ' + coordinateY;
  };

  var setActiveAddress = function () {
    var coordinateX = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var coordinateY = Math.round(mainPin.offsetTop + window.constants.mainActivePinHeight);
    addressInput.value = coordinateX + ', ' + coordinateY;
  };

  var onSelectRoomCapacity = function () {
    switch (true) {
      case (roomSelect.value === '100' && capacitySelect.value !== '0'):
        roomSelect.setCustomValidity('Для выбранного количества комнат размещение гостей невозможно');
        break;

      case (roomSelect.value !== '100' && capacitySelect.value === '0'):
        capacitySelect.setCustomValidity('Выберите количество гостей');
        break;

      case (capacitySelect.value > roomSelect.value && capacitySelect.value !== '0'):
        roomSelect.setCustomValidity('Количество комнат не должно быть меньше количества гостей');
        break;

      default:
        roomSelect.setCustomValidity('');
        capacitySelect.setCustomValidity('');
        break;
    }
  };

  offerTitle.addEventListener('input', function () {
    switch (true) {
      case offerTitle.validity.tooShort:
        offerTitle.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
        break;
      case offerTitle.validity.tooLong:
        offerTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
        break;
      case offerTitle.validity.valueMissing:
        offerTitle.setCustomValidity('Обязательное поле');
        break;
      default:
        offerTitle.setCustomValidity('');
        break;
    }
  });

  var minRoomPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  typeSelect.addEventListener('change', function () {
    priceInput.minValue = minRoomPrice[typeSelect.value];
    priceInput.placeholder = minRoomPrice[typeSelect.value];
  });

  priceInput.addEventListener('input', function () {
    switch (true) {
      case priceInput.value < priceInput.minValue:
        priceInput.setCustomValidity('Цена за ночь не может быть меньше ' + priceInput.minValue);
        break;
      case priceInput.validity.valueMissing:
        priceInput.setCustomValidity('Введите цену жилья за ночь');
        break;
      default:
        priceInput.setCustomValidity('');
        break;
    }
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  roomSelect.addEventListener('input', onSelectRoomCapacity);

  capacitySelect.addEventListener('input', onSelectRoomCapacity);

  window.form = {
    toggleState: toggleStateOfForm,
    setInactiveAddress: setInactiveAddress,
    setActiveAddress: setActiveAddress
  };
})();
