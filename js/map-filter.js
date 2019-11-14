'use strict';
(function () {
  var housingType;
  var housingPrice;
  var housingRooms;
  var housingGuests;
  var mapFilter = window.data.map.querySelector('.map__filters');
  var filterSelectCollection = mapFilter.querySelectorAll('select');
  var filterCheckboxCollection = mapFilter.querySelectorAll('.map__checkbox');
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
    return featuresArray.some(function (item) {
      if (item === currentFeature) {
        return true;
      }

      return false;
    });
  };

  var checkboxFiltration = function () {
    checkedCollection = mapFilter.querySelectorAll('.map__checkbox:checked');

    if (checkedCollection) {
      checkedCollection.forEach(function (item) {
        data = data.filter(function (it) {
          var object = it.offer;
          return checkFeatures(object.features, item.value);
        });
      });
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
    data = window.util.randomizedArray(window.data.notices);

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
    filterCheckboxCollection[j].addEventListener('input', filterChangeHandler);

    filterCheckboxCollection[j].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        if (filterCheckboxCollection[j].getAttribute('checked') !== null) {
          filterCheckboxCollection[j].removeAttribute('checked');
        } else {
          filterCheckboxCollection[j].setAttribute('checked', '');
        }

        window.util.debounce(engageFilter);
      }
    });
  };

  var setSelectEvents = function (i) {
    filterSelectCollection[i].addEventListener('input', filterChangeHandler);
  };

  var setFilterEvents = function () {
    filterSelectCollection.forEach(function (item, itemNumber) {
      setSelectEvents(itemNumber);
    });

    filterCheckboxCollection.forEach(function (item, itemNumber) {
      setCheckboxEvents(itemNumber);
    });
  };

  setFilterEvents();

  window.mapFilter = {
    engageFilter: engageFilter,
    filtratedData: filtratedData,
    setFilterEvents: setFilterEvents,
    mapFilter: mapFilter
  };
}());
