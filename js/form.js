'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var fieldsetsCollection = document.querySelectorAll('fieldset');
  var selectsCollection = document.querySelectorAll('select');
  var noticeForm = document.querySelector('.ad-form');
  var addressInput = noticeForm.querySelector('#address');
  var roomNumber = noticeForm.querySelector('#room_number');
  var guestCapacity = noticeForm.querySelector('#capacity');
  var noticeTitle = noticeForm.querySelector('#title');
  var price = noticeForm.querySelector('#price');
  var apartmentsType = noticeForm.querySelector('#type');
  var submitButton = noticeForm.querySelector('.ad-form__submit');
  var rooms;
  var guests;
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var pinsCollection = window.map.querySelectorAll('[type="button"].map__pin');
  var closeButton;
  var noticeCard;

  var apartmentsCost = [10000, 1000, 5000, 0];

  var MAX_PRICE = 1000000;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  var PIN_ARROW_GAP = window.getComputedStyle(mainPin, ':after').height - 6;
  var PIN_GAP = MAIN_PIN_WIDTH / 2;

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
  };
  
  var setDefaultAddress = function () {
    var pinX = parseInt(mainPin.style.left, 10) + PIN_GAP;
    var pinY = parseInt(mainPin.style.top, 10) + PIN_GAP;
    addressInput.value = pinX + ', ' + pinY;
  };
  
  var setCurrentAddress = function () {
    var pinX = parseInt(mainPin.style.left, 10) + PIN_GAP;
    var pinY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT + PIN_ARROW_GAP;
    addressInput.value = pinX + ', ' + pinY;
  };
  
  disablesForms();
  setDefaultAddress();
  
  mainPin.addEventListener('mousedown', function () {
    activatesForms();
    setCurrentAddress();
    window.map.classList.remove('map--faded');
  });
  
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      activatesForms();
      setCurrentAddress();
      window.map.classList.remove('map--faded');
    }
  });
  
  var pinsClickHandler = function (i) {
    pinsCollection[i].addEventListener('click', function () {
      addCardToPage(window.notices[i]);
  
      noticeCard = map.querySelector('.map__card');
      closeButton = noticeCard.querySelector('.popup__close');
  
      document.addEventListener('keydown', cardESCpressHandler);
      closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
      closeButton.addEventListener('click', closeButtonClickHandler);
    })
  };
  
  var pinsKeydownHandler = function (i) {
    pinsCollection[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        addCardToPage(window.notices[i]);
  
        noticeCard = map.querySelector('.map__card');
        closeButton = noticeCard.querySelector('.popup__close');
  
        document.addEventListener('keydown', cardESCpressHandler);
        closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
        closeButton.addEventListener('click', closeButtonClickHandler);
      }
    })
  };
  
  var cardCloseHandler = function () {
    window.map.removeChild(noticeCard);
  
    document.removeEventListener('keydown', cardESCpressHandler);
    closeButton.removeEventListener('keydown', closeButtonEnterPressHandler);
    closeButton.removeEventListener('click', closeButtonClickHandler);
  };
  
  var closeButtonEnterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      cardCloseHandler();
    }
  };
  
  var closeButtonClickHandler = function (evt) {
    cardCloseHandler();
  }
  
  var cardESCpressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardCloseHandler();
    }
  };
  
  for (var i = 0; i < pinsCollection.length; i++) {
    pinsClickHandler(i)
  };
  
  for (var i = 0; i < pinsCollection.length; i++) {
    pinsKeydownHandler(i)
  };
  
  var getCost = function (arrTypes, arrCosts) {
    var cost;
    var type = apartmentsType.value;
    for (var i = 0; i < arrTypes.length; i++) {
      if (type === arrTypes[i]) {
        cost = arrCosts[i];
        i = arrTypes.length;
      }
    }
    return cost;
  };
  
  submitButton.addEventListener('click', function (evt) {
    rooms = parseInt(roomNumber.value, 10);
    guests = parseInt(guestCapacity.value, 10);
    var cost = getCost(types, apartmentsCost);
  
    if (guestCapacity.value > rooms && guests !== 0) {
      guestCapacity.setCustomValidity('Гостей больше чем комнат');
    } else {
      guestCapacity.setCustomValidity('');
    }
  
    if (noticeTitle.value.length < 30) {
      noticeTitle.setCustomValidity('Минимальная длина 30 символов');
    } else if (noticeTitle.value.length > 100) {
      noticeTitle.setCustomValidity('Максимальная длина 100 символов');
    } else {
      noticeTitle.setCustomValidity('');
    }
  
    if (parseInt(price.value) > MAX_PRICE) {
      price.setCustomValidity('Цена за ночь не может превышать 1 000 000');
    } else {
      price.setCustomValidity('');
    }
  
    if (price.value < cost) {
      price.setCustomValidity('Минимальная цена за ночь ' + cost);
      price.setAttribute('placeholder', cost);
    } else {
      price.setCustomValidity('');
    }
  });
  
  timeIn.addEventListener('input', function() {
    timeOut.value = timeIn.value;
  });
  
  timeOut.addEventListener('input', function() {
    timeIn.value = timeOut.value;
  });
})();
