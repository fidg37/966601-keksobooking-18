'use strict';
(function () {
  var addressInput = window.form.ad.querySelector('#address');
  var mainPinWidth = window.data.mainPin.offsetWidth;
  var mainPinHeight = window.data.mainPin.offsetHeight;
  var pinArrowGap = parseInt(window.getComputedStyle(window.data.mainPin, ':after').height, 10);
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
    window.mapFilter.engage();
  };

  var errorHandler = function () {
    window.form.disable();
    window.util.createErrorMessage();
    window.data.mainPin.addEventListener('click', mainPinClickHandler);
    window.data.mainPin.addEventListener('keydown', mainPinEnterPressHandler);
  };

  var activatePage = function () {
    if (window.data.map.classList.contains('map--faded')) {
      window.serverInteraction.loadOrUpload(window.data.LOAD_URL, succsessHandler, errorHandler, false);
    }
    window.data.map.classList.remove('map--faded');
    window.form.activate();
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

  var moveRestriction = function () {
    var pinX = parseInt(window.data.mainPin.style.left, 10) + pinGap;
    var pinY = parseInt(window.data.mainPin.style.top, 10) + mainPinHeight + pinArrowGap;

    if (pinY < window.data.MapDimensions.MIN_HEIGHT) {
      window.data.mainPin.style.top = window.data.MapDimensions.MIN_HEIGHT - mainPinHeight - pinArrowGap + 'px';
    } else if (pinY > window.data.MapDimensions.MAX_HEIGHT) {
      window.data.mainPin.style.top = window.data.MapDimensions.MAX_HEIGHT - mainPinHeight - pinArrowGap + 'px';
    }

    if (pinX < window.data.MapDimensions.MIN_WIDTH) {
      window.data.mainPin.style.left = window.data.MapDimensions.MIN_WIDTH - pinGap + 'px';
    } else if (pinX > window.data.MapDimensions.MAX_WIDTH) {
      window.data.mainPin.style.left = window.data.MapDimensions.MAX_WIDTH - pinGap + 'px';
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

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.data.mainPin.style.top = (window.data.mainPin.offsetTop - shift.y) + 'px';
      window.data.mainPin.style.left = (window.data.mainPin.offsetLeft - shift.x) + 'px';

      moveRestriction();
    };

    var mainPinMouseUpHandler = function () {
      moveRestriction();
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
      window.cardEvents.set(i);
      window.pin.pinsCollection[i].classList.add('map__pin--active');
    });
  };

  var setKeydownEventsOnPins = function (i) {
    window.pin.pinsCollection[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.cardEvents.set(i);
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
    setEvents: setEventsOnPins,
    removePinAccent: removePinAccent
  };
})();
