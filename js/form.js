'use strict';
(function () {
  var MAIN_PIN_START_X = window.data.mainPin.style.left;
  var MAIN_PIN_START_Y = window.data.mainPin.style.top;

  var adForm = document.querySelector('.ad-form');
  var fieldsetsCollection = document.querySelectorAll('fieldset');
  var selectsCollection = document.querySelectorAll('select');
  var pin;
  var card;

  var removePins = function () {
    while (window.data.pinsList.querySelector('.notice-pin')) {
      pin = window.data.pinsList.querySelector('.notice-pin');
      window.data.pinsList.removeChild(pin);
    }
  };

  var removeCard = function () {
    if (window.data.map.querySelector('.map__card')) {
      card = window.data.map.querySelector('.map__card');
      window.data.map.removeChild(card);
    }
  };

  var disablesForms = function () {
    window.data.mainPin.style.left = MAIN_PIN_START_X;
    window.data.mainPin.style.top = MAIN_PIN_START_Y;

    window.data.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    removePins();
    removeCard();

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

    adForm.classList.remove('ad-form--disabled');
  };

  disablesForms();

  window.form = {
    adForm: adForm,
    activatesForms: activatesForms,
    disablesForms: disablesForms,
    MAIN_PIN_START_X: MAIN_PIN_START_X,
    MAIN_PIN_START_Y: MAIN_PIN_START_Y,
    removePins: removePins,
    removeCard: removeCard
  };
})();
