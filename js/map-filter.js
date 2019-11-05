'use strict';
(function () {
  var housingType;
  var mapFilters = window.data.map.querySelector('.map__filters');
  var selectCollection = mapFilters.querySelectorAll('select');
  var filtratedData;
  var isFilterActive;

  var engageFilter = function () {
    var data = window.data.notices.slice();

    housingType = mapFilters.querySelector('#housing-type').value;
    isFilterActive = false;

    window.form.removePins();

    for (var i = 0; i < selectCollection.length; i++) {
      if (selectCollection[i].value !== 'any') {
        isFilterActive = true;
        i = selectCollection.length;
      }
    }

    if (isFilterActive) {
      window.mapFilter.filtratedData = data.filter(function (it) {
        if (housingType === 'any') {
          return window.mapFilter.filtratedData;
        }
        return it.offer.type === housingType;
      });
    } else {
      window.mapFilter.filtratedData = window.data.notices;
    }

    window.pin.createPins(window.mapFilter.filtratedData);
    window.pinsEvents.setEventsOnPins();
  };

  var setSelectEvents = function (i) {
    selectCollection[i].addEventListener('input', engageFilter);
  };

  var setFilterEvents = function () {
    for (var i = 0; i < selectCollection.length; i++) {
      setSelectEvents(i);
    }
  };

  setFilterEvents();

  window.mapFilter = {
    engageFilter: engageFilter,
    filtratedData: filtratedData,
    setFilterEvents: setFilterEvents
  };
}());
