'use strict';
(function () {
  var addressInput = window.form.adForm.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var pinArrowGap = parseInt(window.getComputedStyle(mainPin, ':after').height, 10) - 6;
  var pinGap = mainPinWidth / 2;

  var setDefaultAddress = function () {
    var pinX = Math.floor(parseInt(mainPin.style.left, 10) + pinGap);
    var pinY = Math.floor(parseInt(mainPin.style.top, 10) + pinGap);
    addressInput.value = pinX + ', ' + pinY;
  };

  var setCurrentAddress = function () {
    var pinX = Math.floor(parseInt(mainPin.style.left, 10) + pinGap);
    var pinY = Math.floor(parseInt(mainPin.style.top, 10) + mainPinHeight + pinArrowGap);
    addressInput.value = pinX + ', ' + pinY;
  };

  setDefaultAddress();

  var activatePage = function () {
    window.form.activatesForms();
    setCurrentAddress();
    window.data.map.classList.remove('map--faded');
  };

  var mainPinClickHandler = function () {
    activatePage();

    mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

    mainPin.removeEventListener('mousedown', mainPinClickHandler);
  };

  var mainPinMouseDownHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMovefunction = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinX = parseInt(mainPin.style.left, 10);
      var pinY = parseInt(mainPin.style.top, 10);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinY >= window.data.mapDimensions.minHeight && pinY <= window.data.mapDimensions.maxHeight - mainPinHeight) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      } else if (pinY < window.data.mapDimensions.minHeight) {
        mainPin.style.top = window.data.mapDimensions.minHeight + 'px';
      } else {
        mainPin.style.top = window.data.mapDimensions.maxHeight - mainPinHeight + 'px';
      }

      if (pinX >= window.data.mapDimensions.minWidth && pinX <= window.data.mapDimensions.maxWidth - mainPinWidth) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      } else if (pinX < window.data.mapDimensions.minWidth) {
        mainPin.style.left = window.data.mapDimensions.minWidth + 'px';
      } else {
        mainPin.style.left = window.data.mapDimensions.maxWidth - mainPinWidth + 'px';
      }
    };

    var mainPinMouseUpHandler = function () {
      setCurrentAddress();

      document.removeEventListener('mousemove', mainPinMouseMovefunction);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMovefunction);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  var mainPinEnterPressHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activatePage();
      mainPin.removeEventListener('mousedown', mainPinEnterPressHandler);
    }
  };

  mainPin.addEventListener('mousedown', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinEnterPressHandler);

  var setClickEventsOnPins = function (i) {
    window.pin.pinsCollection[i].addEventListener('click', function () {
      window.cardEvents.setCardEvents(i);
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
    for (var i = 0; i < window.pin.pinsCollection.length; i++) {
      setClickEventsOnPins(i);
      setKeydownEventsOnPins(i);
    }
  };

  setEventsOnPins();
})();
