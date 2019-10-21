'use strict';
(function () {
  var MAX_PRICE = 1000000;
  var ZERO_GUESTS = 0;
  var ROOMS_NOT_FOR_GUESTS = 100;

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

    if (noticeTitle.value.length < 30) {
      noticeTitle.setCustomValidity('Минимальная длина 30 символов');
    } else if (noticeTitle.value.length > 100) {
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
})();
