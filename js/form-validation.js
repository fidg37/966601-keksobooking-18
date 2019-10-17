'use strict';
(function () {
  var MAX_PRICE = 1000000;

  var roomNumber = window.util.form.querySelector('#room_number');
  var guestCapacity = window.util.form.querySelector('#capacity');
  var noticeTitle = window.util.form.querySelector('#title');
  var price = window.util.form.querySelector('#price');
  var apartmentsType = window.util.form.querySelector('#type');
  var submitButton = window.util.form.querySelector('.ad-form__submit');
  var rooms;
  var guests;
  var timeIn = window.util.form.querySelector('#timein');
  var timeOut = window.util.form.querySelector('#timeout');

  var getCost = function (arrTypes, arrCosts) {
    var cost;
    var type = apartmentsType.value;
    for (var n = 0; n < arrTypes.length; n++) {
      if (type === arrTypes[n]) {
        cost = arrCosts[n];
        n = arrTypes.length;
      }
    }
    return cost;
  };

  var submitClickHandler = function () {
    rooms = parseInt(roomNumber.value, 10);
    guests = parseInt(guestCapacity.value, 10);
    var cost = getCost(window.data.apartmentsInfo.types, window.data.apartmentsInfo.cost);

    if (guestCapacity.value > rooms && guests !== 0) {
      guestCapacity.setCustomValidity('Гостей больше чем комнат');
    } else if (guests === 0 && rooms !== 100) {
      guestCapacity.setCustomValidity('Выберите количество гостей');
    } else {
      guestCapacity.setCustomValidity('');
    }

    if (rooms === 100 && guests !== 0) {
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