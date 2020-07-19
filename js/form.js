'use strict';
(function () {
  var MAIN_ACTIVE_PIN_HEIGHT = 77;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFilter = document.querySelector('.map__filters');
  var capacitySelect = document.querySelector('#capacity');
  var roomSelect = document.querySelector('#room_number');
  var offerTitle = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var addressInput = document.querySelector('#address');

  var toggleStateOfForm = function (elements, isActive) {
    isActive ? elements.forEach(function (element) { element.disabled = false; }) : elements.forEach(function (element) { element.disabled = true; });
  };

  var setInactiveAddress = function () {
    var CoordinateX = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var CoordinateY = Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
    addressInput.value = CoordinateX + ', ' + CoordinateY;
  }

  var setActiveAddress = function () {
    var CoordinateX = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var CoordinateY = Math.round(mainPin.offsetTop + MAIN_ACTIVE_PIN_HEIGHT);
    addressInput.value = CoordinateX + ', ' + CoordinateY;
  }

  var selectRoomCapacityHandler = function () {
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
  }

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

  typeSelect.addEventListener('change', function () {
    switch (typeSelect.value) {
      case 'bungalo':
        priceInput.minValue = 0;
        priceInput.placeholder = '0';
        break;
      case 'flat':
        priceInput.minValue = 1000;
        priceInput.placeholder = '1000';
        break;
      case 'house':
        priceInput.minValue = 5000;
        priceInput.placeholder = '5000';
        break;
      case 'palace':
        priceInput.minValue = 10000;
        priceInput.placeholder = '10000';
        break;
    }
  });

  priceInput.addEventListener('invalid', function () {
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
    switch (timeIn.value) {
      case '12:00':
        timeOut.selectedIndex = 0;
        break;
      case '13:00':
        timeOut.selectedIndex = 1;
        break;
      case '14:00':
        timeOut.selectedIndex = 2;
        break;
    }
  });

  timeOut.addEventListener('change', function () {
    switch (timeOut.value) {
      case '12:00':
        timeIn.selectedIndex = 0;
        break;
      case '13:00':
        timeIn.selectedIndex = 1;
        break;
      case '14:00':
        timeIn.selectedIndex = 2;
        break;
    }
  });

  roomSelect.addEventListener('input', selectRoomCapacityHandler);

  capacitySelect.addEventListener('input', selectRoomCapacityHandler);

  window.form = {
    toggleStateOfForm: toggleStateOfForm,
    setInactiveAddress: setInactiveAddress,
    setActiveAddress: setActiveAddress
  }
})();
