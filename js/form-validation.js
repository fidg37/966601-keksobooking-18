'use strict';
(function () {
  var MAX_COST = 1000000;
  var MIN_COST = 0;
  var ZERO_GUESTS = 0;
  var ROOMS_NOT_FOR_GUESTS = 100;
  var MIN_TEXT_LENGTH = 30;
  var MAX_TEXT_LENGTH = 100;
  var PRICE_DEFAULT_VALUE = 5000;

  var roomNumber = window.form.ad.querySelector('#room_number');
  var guestCapacity = window.form.ad.querySelector('#capacity');
  var noticeTitle = window.form.ad.querySelector('#title');
  var price = window.form.ad.querySelector('#price');
  var apartmentsType = window.form.ad.querySelector('#type');
  var submitButton = window.form.ad.querySelector('.ad-form__submit');
  var rooms;
  var guests;
  var timeIn = window.form.ad.querySelector('#timein');
  var timeOut = window.form.ad.querySelector('#timeout');
  var resetButton = window.form.ad.querySelector('.ad-form__reset');
  var adImage;

  var getCost = function (arrInfo) {
    var cost;
    var type = apartmentsType.value;
    for (var i = 0; i < arrInfo.length; i++) {
      if (type === arrInfo[i].type) {
        cost = arrInfo[i].cost;
        i = arrInfo.length;
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
    window.form.disable();
    window.pinsEvents.setActivatePageEvents();

    resetForm();
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.serverInteraction.loadOrUpload(window.data.UPLOAD_URL, successHandler, window.util.createErrorMessage, true, new FormData(window.form.ad));
    window.form.ad.removeEventListener('submit', submitHandler);
  };

  var titleInputHandler = function () {
    if (noticeTitle.value.length < MIN_TEXT_LENGTH) {
      noticeTitle.setCustomValidity('Минимальная длина ' + MIN_TEXT_LENGTH + ' символов');
    } else if (noticeTitle.value.length > MAX_TEXT_LENGTH) {
      noticeTitle.setCustomValidity('Максимальная длина ' + MAX_TEXT_LENGTH + ' символов');
    } else {
      noticeTitle.setCustomValidity('');
    }
  };

  var costInputHandler = function () {
    var cost = getCost(window.data.apartmentsInfo);

    if (price.value < cost || cost === MIN_COST) {
      price.setAttribute('placeholder', cost);
      price.setAttribute('min', cost);
    } else {
      price.setAttribute('max', MAX_COST);
    }
  };

  noticeTitle.addEventListener('input', titleInputHandler);
  price.addEventListener('input', costInputHandler);
  apartmentsType.addEventListener('input', costInputHandler);

  var submitEvents = function () {
    rooms = parseInt(roomNumber.value, 10);
    guests = parseInt(guestCapacity.value, 10);

    titleInputHandler();

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

    window.form.ad.addEventListener('submit', submitHandler);
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
    price.removeAttribute('min');
    price.setAttribute('placeholder', PRICE_DEFAULT_VALUE);

    while (window.photoLoad.adPreview.querySelector('img')) {
      adImage = window.photoLoad.adPreview.querySelector('img');
      window.photoLoad.adPreview.removeChild(adImage);
    }

    window.photoLoad.avatarPreview.src = window.data.DEFAULT_AVATAR;
    window.form.ad.reset();
    window.mapFilter.reset();
    window.data.mainPin.style.left = window.form.MAIN_PIN_START_X;
    window.data.mainPin.style.top = window.form.MAIN_PIN_START_Y;
    window.pinsEvents.setCurrentAddress();
    window.pinsEvents.setActivatePageEvents();
  };

  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    resetForm();
    window.form.disable();
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
