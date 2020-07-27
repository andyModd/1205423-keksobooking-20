'use strict';
(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
  var priceSelect = mapFiltersForm.querySelector('#housing-price');
  var roomsSelect = mapFiltersForm.querySelector('#housing-rooms');
  var guestsSelect = mapFiltersForm.querySelector('#housing-guests');
  var featuresChoice = mapFiltersForm.querySelector('#housing-features');

  var checkByType = function (element) {
    return housingTypeSelect.value === element.offer.type || housingTypeSelect.value === window.constants.filterDefaultValue;
  };

  var priceRange = {
    min: 10000,
    max: 50000
  };

  var checkByPrice = function (element) {
    var priceValue = priceSelect.value;
    switch (priceValue) {
      case 'low':
        return element.offer.price <= priceRange.min;
      case 'middle':
        return element.offer.price > priceRange.min && element.offer.price < priceRange.max;
      case 'high':
        return element.offer.price >= priceRange.max;
      default:
        return true;
    }
  };

  var checkByRooms = function (element) {
    return roomsSelect.value === window.constants.filterDefaultValue || roomsSelect.value === String(element.offer.rooms);
  };

  var checkByGuests = function (element) {
    return guestsSelect.value === window.constants.filterDefaultValue || guestsSelect.value === String(element.offer.guests);
  };

  var checkByFeatures = function (element) {
    var checkedFeatures = Array.from(featuresChoice.querySelectorAll('input:checked'));
    return checkedFeatures.every(function (feature) {
      return element.offer.features.includes(feature.value);
    });
  };

  var toFilter = function (offers) {
    return offers.filter(function (offer) {
      return checkByType(offer) && checkByRooms(offer) && checkByPrice(offer) && checkByGuests(offer) && checkByFeatures(offer);
    });
  };

  mapFiltersForm.addEventListener('change', function () {
    window.debounce(function () {
      window.map.closeOfferCard();
      window.map.clearOfferPins();
      window.map.renderOfferPins(toFilter(window.offers));
    })();
  });
})();
