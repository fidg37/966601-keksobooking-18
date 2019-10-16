'use strict';
(function () {
  window.form = document.querySelector('.ad-form');

  var fieldsetsCollection = document.querySelectorAll('fieldset');
  var selectsCollection = document.querySelectorAll('select');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = window.form.querySelector('#address');
  var closeButton;
  var noticeCard;

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  var PIN_ARROW_GAP = parseInt(window.getComputedStyle(mainPin, ':after').height, 10) - 6;
  var PIN_GAP = MAIN_PIN_WIDTH / 2;

  var addCardToPage = function (arrElem) {
    window.pinsList.insertAdjacentElement('afterend', window.fragment.appendChild(window.createCard(arrElem)));
  };

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

    window.form.classList.remove('ad-form--disabled');
  };

  var setDefaultAddress = function () {
    var pinX = Math.floor(parseInt(mainPin.style.left, 10) + PIN_GAP);
    var pinY = Math.floor(parseInt(mainPin.style.top, 10) + PIN_GAP);
    addressInput.value = pinX + ', ' + pinY;
  };

  var setCurrentAddress = function () {
    var pinX = Math.floor(parseInt(mainPin.style.left, 10) + PIN_GAP);
    var pinY = Math.floor(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT + PIN_ARROW_GAP);
    addressInput.value = pinX + ', ' + pinY;
  };

  disablesForms();
  setDefaultAddress();

  var activatePage = function () {
    activatesForms();
    setCurrentAddress();
    window.map.classList.remove('map--faded');
  };

  var mainPinClickHandler = function () {
    activatePage();

    mainPin.removeEventListener('mousedown', mainPinClickHandler);
  };

  var mainPinEnterPressHandler = function (evt) {
    if (evt.keyCode === 13) {
      activatePage();
      mainPin.removeEventListener('mousedown', mainPinEnterPressHandler);
    }
  };

  mainPin.addEventListener('mousedown', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinEnterPressHandler);

  var setClickEventsOnPins = function (i) {
    window.pinsCollection[i].addEventListener('click', function () {
      addCardToPage(window.notices[i]);

      noticeCard = window.map.querySelector('.map__card');
      closeButton = noticeCard.querySelector('.popup__close');

      document.addEventListener('keydown', cardESCpressHandler);
      closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
      closeButton.addEventListener('click', closeButtonClickHandler);
    });
  };

  var setKeydownEventsOnPins = function (i) {
    window.pinsCollection[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        addCardToPage(window.notices[i]);

        noticeCard = window.map.querySelector('.map__card');
        closeButton = noticeCard.querySelector('.popup__close');

        document.addEventListener('keydown', cardESCpressHandler);
        closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
        closeButton.addEventListener('click', closeButtonClickHandler);
      }
    });
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

  var closeButtonClickHandler = function () {
    cardCloseHandler();
  };

  var cardESCpressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardCloseHandler();
    }
  };

  var setEventsOnPins = function () {
    for (var i = 0; i < window.pinsCollection.length; i++) {
      setClickEventsOnPins(i);
      setKeydownEventsOnPins(i);
    }
  };

  setEventsOnPins();
})();
