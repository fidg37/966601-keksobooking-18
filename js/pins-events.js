'use strict';
(function () {
  var MAIN_PIN_WIDTH = window.util.mainPin.offsetWidth;
  var MAIN_PIN_HEIGHT = window.util.mainPin.offsetHeight;
  var PIN_ARROW_GAP = parseInt(window.getComputedStyle(window.util.mainPin, ':after').height, 10) - 6;
  var PIN_GAP = MAIN_PIN_WIDTH / 2;

  var fieldsetsCollection = document.querySelectorAll('fieldset');
  var selectsCollection = document.querySelectorAll('select');
  var addressInput = window.util.form.querySelector('#address');

  var disablesForms = function () {
    for (var i = 0; i < fieldsetsCollection.length; i++) {
      fieldsetsCollection[i].setAttribute('disabled', '');
    }

    for (var j = 0; j < selectsCollection.length; j++) {
      selectsCollection[j].setAttribute('disabled', '');
    }
  };

  var activatesForms = function () {
    for (var i = 0; i < fieldsetsCollection.length; i++) {
      fieldsetsCollection[i].removeAttribute('disabled');
    }

    for (var j = 0; j < selectsCollection.length; j++) {
      selectsCollection[j].removeAttribute('disabled');
    }

    window.util.form.classList.remove('ad-form--disabled');
  };

  var setDefaultAddress = function () {
    var pinX = Math.floor(parseInt(window.util.mainPin.style.left, 10) + PIN_GAP);
    var pinY = Math.floor(parseInt(window.util.mainPin.style.top, 10) + PIN_GAP);
    addressInput.value = pinX + ', ' + pinY;
  };

  var setCurrentAddress = function () {
    var pinX = Math.floor(parseInt(window.util.mainPin.style.left, 10) + PIN_GAP);
    var pinY = Math.floor(parseInt(window.util.mainPin.style.top, 10) + MAIN_PIN_HEIGHT + PIN_ARROW_GAP);
    addressInput.value = pinX + ', ' + pinY;
  };

  disablesForms();
  setDefaultAddress();

  var activatePage = function () {
    activatesForms();
    setCurrentAddress();
    window.util.map.classList.remove('map--faded');
  };

  var mainPinClickHandler = function () {
    activatePage();

    window.util.mainPin.removeEventListener('mousedown', mainPinClickHandler);
  };

  var mainPinEnterPressHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activatePage();
      window.util.mainPin.removeEventListener('mousedown', mainPinEnterPressHandler);
    }
  };

  window.util.mainPin.addEventListener('mousedown', mainPinClickHandler);
  window.util.mainPin.addEventListener('keydown', mainPinEnterPressHandler);

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
