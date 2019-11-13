'use strict';
(function () {
  var housingType;
  var housingPrice;
  var housingRooms;
  var housingGuests;
  var mapFilter = window.data.map.querySelector('.map__filters');
  var selectCollection = mapFilter.querySelectorAll('select');
  var checkboxCollection = mapFilter.querySelectorAll('.map__checkbox');
  var filtratedData;
  var data;
  var checkedCollection;

  var priceRange = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  var checkFeatures = function (featuresArray, currentFeature) {
    for (var i = 0; i < featuresArray.length; i++) {
      if (featuresArray[i] === currentFeature) {
        return true;
      }
    }
    return false;
  };

  var checkboxFiltration = function () {
    checkedCollection = mapFilter.querySelectorAll('.map__checkbox:checked');

    if (checkedCollection) {
      for (var i = 0; i < checkedCollection.length; i++) {
        data = data.filter(function (it) {
          var object = it.offer;
          return checkFeatures(object.features, checkedCollection[i].value);
        });
      }
    }
  };

  var checkPriceRange = function (price, rangeValue) {
    if (priceRange[rangeValue].min <= price && price < priceRange[rangeValue].max) {
      return true;
    }
    return false;
  };

  var selectFiltration = function (filterValue, objectKey, isPrice) {
    if (filterValue !== 'any' && isPrice) {
      data = data.filter(function (it) {
        var object = it.offer;
        var test = checkPriceRange(object[objectKey], filterValue);
        return test;
      });
    } else if (filterValue !== 'any') {
      if (!isNaN(parseInt(filterValue, 10))) {
        filterValue = parseInt(filterValue, 10);
      }

      data = data.filter(function (it) {
        var object = it.offer;
        return object[objectKey] === filterValue;
      });
    }
  };

  var engageFilter = function () {
    data = window.data.notices.slice();

    housingType = mapFilter.querySelector('#housing-type').value;
    housingPrice = mapFilter.querySelector('#housing-price').value;
    housingRooms = mapFilter.querySelector('#housing-rooms').value;
    housingGuests = mapFilter.querySelector('#housing-guests').value;

    window.form.removePins();
    window.form.removeCard();

    selectFiltration(housingType, 'type');
    selectFiltration(housingPrice, 'price', true);
    selectFiltration(housingRooms, 'rooms');
    selectFiltration(housingGuests, 'guests');
    checkboxFiltration();
    window.mapFilter.filtratedData = data;

    window.pin.createPins(window.mapFilter.filtratedData);
    window.pinsEvents.setEventsOnPins();
  };

  var filterChangeHandler = function () {
    window.util.debounce(engageFilter);
  };

  var setCheckboxEvents = function (j) {
    checkboxCollection[j].addEventListener('input', filterChangeHandler);
  };

  var setSelectEvents = function (i) {
    selectCollection[i].addEventListener('input', filterChangeHandler);
  };

  var setFilterEvents = function () {
    for (var i = 0; i < selectCollection.length; i++) {
      setSelectEvents(i);
    }

    for (var j = 0; j < checkboxCollection.length; j++) {
      setCheckboxEvents(j);
    }
  };

  setFilterEvents();

  window.mapFilter = {
    engageFilter: engageFilter,
    filtratedData: filtratedData,
    setFilterEvents: setFilterEvents
  };
}());
