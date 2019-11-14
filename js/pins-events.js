'use strict';
(function () {
  var PIN_ARROW_OFFSET_TOP = 6;

  var addressInput = window.form.adForm.querySelector('#address');
  var mainPinWidth = window.data.mainPin.offsetWidth;
  var mainPinHeight = window.data.mainPin.offsetHeight;
  var pinArrowGap = parseInt(window.getComputedStyle(window.data.mainPin, ':after').height, 10) - PIN_ARROW_OFFSET_TOP;
  var pinGap = mainPinWidth / 2;

  var setDefaultAddress = function () {
    var pinX = Math.floor(parseInt(window.data.mainPin.style.left, 10) + pinGap);
    var pinY = Math.floor(parseInt(window.data.mainPin.style.top, 10) + pinGap);
    addressInput.value = pinX + ', ' + pinY;
  };

  var setCurrentAddress = function () {
    var pinX = Math.floor(parseInt(window.data.mainPin.style.left, 10) + pinGap);
    var pinY = Math.floor(parseInt(window.data.mainPin.style.top, 10) + mainPinHeight + pinArrowGap);
    addressInput.value = pinX + ', ' + pinY;
  };

  setDefaultAddress();

  var succsessHandler = function (data) {
    window.data.createNoticeArray(data);
    window.mapFilter.engageFilter();
  };

  var errorHandler = function () {
    window.form.disablesForms();
    window.util.createErrorMessage();
    window.data.mainPin.addEventListener('click', mainPinClickHandler);
    window.data.mainPin.addEventListener('keydown', mainPinEnterPressHandler);
  };

  var activatePage = function () {
    if (window.data.map.classList.contains('map--faded')) {
      window.load.dataLoad(window.data.LOAD_URL, succsessHandler, errorHandler);
    }
    window.data.map.classList.remove('map--faded');
    window.form.activatesForms();
    setCurrentAddress();
  };

  var mainPinActivateEvents = function () {
    activatePage();
    window.data.mainPin.removeEventListener('click', mainPinClickHandler);
    window.data.mainPin.removeEventListener('keydown', mainPinEnterPressHandler);
  };

  var mainPinClickHandler = function () {
    mainPinActivateEvents();
  };

  var mainPinEnterPressHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      mainPinActivateEvents();
    }
  };

  var mainPinMouseDownHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinX = parseInt(window.data.mainPin.style.left, 10);
      var pinY = parseInt(window.data.mainPin.style.top, 10);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinY >= window.data.mapDimensions.minHeight && pinY <= window.data.mapDimensions.maxHeight - mainPinHeight) {
        window.data.mainPin.style.top = (window.data.mainPin.offsetTop - shift.y) + 'px';
      } else if (pinY < window.data.mapDimensions.minHeight) {
        window.data.mainPin.style.top = window.data.mapDimensions.minHeight + 'px';
      } else {
        window.data.mainPin.style.top = window.data.mapDimensions.maxHeight - mainPinHeight + 'px';
      }

      if (pinX >= window.data.mapDimensions.minWidth && pinX <= window.data.mapDimensions.maxWidth - mainPinWidth) {
        window.data.mainPin.style.left = (window.data.mainPin.offsetLeft - shift.x) + 'px';
      } else if (pinX < window.data.mapDimensions.minWidth) {
        window.data.mainPin.style.left = window.data.mapDimensions.minWidth + 'px';
      } else {
        window.data.mainPin.style.left = window.data.mapDimensions.maxWidth - mainPinWidth + 'px';
      }
    };

    var mainPinMouseUpHandler = function () {
      setCurrentAddress();

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  var setActivatePageEvents = function () {
    window.data.mainPin.addEventListener('click', mainPinClickHandler);
    window.data.mainPin.addEventListener('keydown', mainPinEnterPressHandler);
  };

  setActivatePageEvents();

  window.data.mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  var removePinAccent = function () {
    window.pin.pinsCollection.forEach(function (item) {
      if (item.classList.contains('map__pin--active')) {
        item.classList.remove('map__pin--active');
      }
    });
  };

  var setClickEventsOnPins = function (i) {
    window.pin.pinsCollection[i].addEventListener('click', function () {
      removePinAccent();
      window.cardEvents.setCardEvents(i);
      window.pin.pinsCollection[i].classList.add('map__pin--active');
    });
  };

  var setKeydownEventsOnPins = function (i) {
    window.pin.pinsCollection[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.cardEvents.setCardEvents(i);
      }
    });
  };

  var setEventsOnPins = function () {
    window.pin.pinsCollection.forEach(function (item, itemNumber) {
      setClickEventsOnPins(itemNumber);
      setKeydownEventsOnPins(itemNumber);
    });
  };

  window.pinsEvents = {
    setDefaultAddress: setDefaultAddress,
    setCurrentAddress: setCurrentAddress,
    setActivatePageEvents: setActivatePageEvents,
    setEventsOnPins: setEventsOnPins,
    removePinAccent: removePinAccent
  };
})();
