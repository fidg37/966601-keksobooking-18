'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var fragment = document.createDocumentFragment();
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var getRandom = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var randomizedArray = function (array) {
    var initialArray = array.slice();
    var randomArray = [];
    var numberRandomElem = getRandom(1, array.length);

    for (var i = 0; i < numberRandomElem; i++) {
      var removedElem = initialArray.splice(getRandom(0, initialArray.length - 1), 1);
      randomArray[randomArray.length] = removedElem[0];
    }

    return randomArray;
  };

  var getRandArrElem = function (array) {
    return array[getRandom(0, array.length - 1)];
  };

  var createErrorMessage = function (tryAgainAction) {
    var errorPopup = fragment.appendChild(errorTemplate);
    var tryAgain;

    document.querySelector('main').appendChild(errorPopup);
    tryAgain = document.querySelector('.error__button');

    var setErrorMessageEvent = function () {
      tryAgainAction();
      tryAgain.removeEventListener('click', tryAgainClickHandler);
      tryAgain.removeEventListener('keydown', tryAgainPressEnterHandler);
      document.querySelector('main').removeChild(document.querySelector('.error'));
    };

    var tryAgainClickHandler = function () {
      setErrorMessageEvent();
    };

    var tryAgainPressEnterHandler = function (evt) {
      if (evt.keycode === ENTER_KEYCODE) {
        setErrorMessageEvent();
      }
    };

    tryAgain.addEventListener('click', tryAgainClickHandler);
    tryAgain.addEventListener('keydown', tryAgainPressEnterHandler);
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    fragment: fragment,
    getRandom: getRandom,
    randomizedArray: randomizedArray,
    getRandArrElem: getRandArrElem,
    createErrorMessage: createErrorMessage
  };
})();
