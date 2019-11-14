'use strict';
(function () {
  var MAX_PRICE = 1000000;
  var ZERO_GUESTS = 0;
  var ROOMS_NOT_FOR_GUESTS = 100;
  var MIN_TEXT_LENGTH = 30;
  var MAX_TEXT_LENGTH = 100;

  var roomNumber = window.form.adForm.querySelector('#room_number');
  var guestCapacity = window.form.adForm.querySelector('#capacity');
  var noticeTitle = window.form.adForm.querySelector('#title');
  var price = window.form.adForm.querySelector('#price');
  var apartmentsType = window.form.adForm.querySelector('#type');
  var submitButton = window.form.adForm.querySelector('.ad-form__submit');
  var rooms;
  var guests;
  var timeIn = window.form.adForm.querySelector('#timein');
  var timeOut = window.form.adForm.querySelector('#timeout');
  var resetButton = window.form.adForm.querySelector('.ad-form__reset');

  var getCost = function (arrInfo) {
    var cost;
    var type = apartmentsType.value;
    for (var n = 0; n < arrInfo.length; n++) {
      if (type === arrInfo[n].type) {
        cost = arrInfo[n].cost;
        n = arrInfo.length;
      }
    }
    return cost;
  };

  var submitClickHandler = function () {
    submitEvents();
  };

  var submitEnterPressHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      submitEvents();
    }
  };

  var successHandler = function () {
    window.util.createSuccessMessage();
    window.form.disablesForms();
    window.pinsEvents.setActivatePageEvents();

    resetForm();
  };

  var submitEvents = function () {
    rooms = parseInt(roomNumber.value, 10);
    guests = parseInt(guestCapacity.value, 10);
    var cost = getCost(window.data.apartmentsInfo);

    if (guestCapacity.value > rooms && guests !== ZERO_GUESTS) {
      guestCapacity.setCustomValidity('Гостей больше чем комнат');
    } else if (guests === ZERO_GUESTS && rooms !== ROOMS_NOT_FOR_GUESTS) {
      guestCapacity.setCustomValidity('Выберите количество гостей');
    } else {
      guestCapacity.setCustomValidity('');
    }

    if (rooms === ROOMS_NOT_FOR_GUESTS && guests !== ZERO_GUESTS) {
      roomNumber.setCustomValidity('Эти комнаты не для гостей');
    } else {
      roomNumber.setCustomValidity('');
    }

    if (noticeTitle.value.length < MIN_TEXT_LENGTH) {
      noticeTitle.setCustomValidity('Минимальная длина 30 символов');
    } else if (noticeTitle.value.length > MAX_TEXT_LENGTH) {
      noticeTitle.setCustomValidity('Максимальная длина 100 символов');
    } else {
      noticeTitle.setCustomValidity('');
    }

    if (price.value < cost) {
      price.setCustomValidity('Минимальная цена за ночь ' + cost);
      price.setAttribute('placeholder', cost);
    } else if (parseInt(price.value, 10) > MAX_PRICE) {
      price.setCustomValidity('Цена за ночь не может превышать 1 000 000');
    } else {
      price.setCustomValidity('');
    }

    window.form.adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      window.upload.dataUpload(new FormData(window.form.adForm), window.data.UPLOAD_URL, successHandler, window.util.createErrorMessage);
    });
  };

  var timeInInputHandler = function () {
    timeOut.value = timeIn.value;
  };

  var timeOutInputHandler = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('input', timeInInputHandler);
  timeOut.addEventListener('input', timeOutInputHandler);
  submitButton.addEventListener('click', submitClickHandler);
  submitButton.addEventListener('keydown', submitEnterPressHandler);

  var resetForm = function () {
    window.form.adForm.reset();
    window.mapFilter.mapFilter.reset();
    window.data.mainPin.style.left = window.form.MAIN_PIN_START_X;
    window.data.mainPin.style.top = window.form.MAIN_PIN_START_Y;
    window.pinsEvents.setCurrentAddress();
    window.pinsEvents.setActivatePageEvents();
  };

  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    resetForm();
    window.form.disablesForms();
  };

  var resetButtonPressEnterHandler = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      resetForm();
    }
  };

  resetButton.addEventListener('click', resetButtonClickHandler);
  resetButton.addEventListener('keydown', resetButtonPressEnterHandler);
})();
