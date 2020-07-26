'use strict';
(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = mapFiltersForm.querySelector('#housing-type');

  mapFiltersForm.addEventListener('change', function () {
    window.map.closeOfferCard();
    window.map.renderOfferPins(filter(window.offers));
  });

  var checkByType = function (element) {
    return housingTypeSelect.value === element.offer.type || housingTypeSelect.value === window.constants.filterDefaultValue;
  };

  var filter = function (offers) {
    return offers.filter(function (offer) {
      return checkByType(offer);
    });
  };
})();
