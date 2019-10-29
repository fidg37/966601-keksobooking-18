'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SUCCESS_CODE = 2;
  var TIMEOUT_LIMIT = 10000;

  var fragment = document.createDocumentFragment();
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successClass = '.success';
  var errorClass = '.error';
  var currentMessageClass;
  var messageBlock;
  var tryAgain;

  var getRandom = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var integerDivision = function (number, denominator) {
    return (number - number % denominator) / denominator;
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

  var closeMessageBlock = function () {
    messageBlock.removeEventListener('click', messageBlockClickHandler);
    document.removeEventListener('keydown', messageBlockPressEscHandler);

    if (tryAgain) {
      tryAgain.removeEventListener('keydown', tryAgainPressEnterHandler);
    }

    document.querySelector('main').removeChild(document.querySelector(currentMessageClass));
  };

  var messageBlockClickHandler = function () {
    closeMessageBlock();
  };

  var messageBlockPressEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeMessageBlock();
    }
  };

  var tryAgainPressEnterHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeMessageBlock();
    }
  };

  var createMessage = function (template, messageClass, isError) {
    var popup = fragment.appendChild(template);

    document.querySelector('main').appendChild(popup);
    messageBlock = document.querySelector(messageClass);
    currentMessageClass = messageClass;

    if (isError) {
      tryAgain = messageBlock.querySelector('.error__button');
      tryAgain.addEventListener('keydown', tryAgainPressEnterHandler);
    }

    messageBlock.addEventListener('click', messageBlockClickHandler);
    document.addEventListener('keydown', messageBlockPressEscHandler);
  };

  var createErrorMessage = function () {
    createMessage(errorTemplate, errorClass, true);
  };

  var createSuccessMessage = function () {
    createMessage(successTemplate, successClass, false);
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    fragment: fragment,
    getRandom: getRandom,
    randomizedArray: randomizedArray,
    getRandArrElem: getRandArrElem,
    createErrorMessage: createErrorMessage,
    createSuccessMessage: createSuccessMessage,
    integerDivision: integerDivision,
    SUCCESS_CODE: SUCCESS_CODE,
    TIMEOUT_LIMIT: TIMEOUT_LIMIT
  };
})();
