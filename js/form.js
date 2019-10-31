'use strict';
(function () {
  var MAIN_PIN_START_X = window.data.mainPin.style.left;
  var MAIN_PIN_START_Y = window.data.mainPin.style.top;

  var adForm = document.querySelector('.ad-form');
  var fieldsetsCollection = document.querySelectorAll('fieldset');
  var selectsCollection = document.querySelectorAll('select');

  var disablesForms = function () {
    var pin;
    var card;

    window.data.mainPin.style.left = MAIN_PIN_START_X;
    window.data.mainPin.style.top = MAIN_PIN_START_Y;

    window.data.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    while (window.data.pinsList.querySelector('.notice-pin')) {
      pin = window.data.pinsList.querySelector('.notice-pin');
      window.data.pinsList.removeChild(pin);
    }

    if (window.data.map.querySelector('.map__card')) {
      card = window.data.map.querySelector('.map__card');
      window.data.map.removeChild(card);
    }

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
    MAIN_PIN_START_Y: MAIN_PIN_START_Y
  };
})();
