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

  var filterReset = function () {
    mapFilter.reset();
  };

  var PriceRange = {
    'low': {
      MIN: 0,
      MAX: 10000
    },
    'middle': {
      MIN: 10000,
      MAX: 50000
    },
    'high': {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var checkFeatures = function (featuresArray, currentFeature) {
    return featuresArray.some(function (item) {
      return item === currentFeature;
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
    return (PriceRange[rangeValue].MIN <= price && price < PriceRange[rangeValue].MAX);
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

    window.pin.create(window.mapFilter.filtratedData);
    window.pinsEvents.setEvents();
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
    engage: engageFilter,
    filtratedData: filtratedData,
    reset: filterReset
  };
}());
