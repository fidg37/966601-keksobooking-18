'use strict';
(function () {
  var addCardToPage = function (arrElem) {
    window.pin.pinsList.insertAdjacentElement('afterend', window.util.fragment.appendChild(window.card.createCard(arrElem)));
  };

  var cardCloseHandler = function () {
    window.util.map.removeChild(window.util.noticeCard);

    document.removeEventListener('keydown', cardESCpressHandler);
    window.util.closeButton.removeEventListener('keydown', closeButtonEnterPressHandler);
    window.util.closeButton.removeEventListener('click', closeButtonClickHandler);
  };

  var closeButtonEnterPressHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      cardCloseHandler();
    }
  };

  var closeButtonClickHandler = function () {
    cardCloseHandler();
  };

  var cardESCpressHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      cardCloseHandler();
    }
  };

  var setCardEvents = function (i) {
    addCardToPage(window.data.notices[i]);

    window.util.noticeCard = window.util.map.querySelector('.map__card');
    window.util.closeButton = window.util.noticeCard.querySelector('.popup__close');

    document.addEventListener('keydown', cardESCpressHandler);
    window.util.closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
    window.util.closeButton.addEventListener('click', closeButtonClickHandler);
  };

  window.cardEvents = {
    setCardEvents: setCardEvents
  };
})();
