'use strict';
(function () {
  var closeButton;
  var noticeCard;

  var addCardToPage = function (arrElem) {
    window.data.pinsList.insertAdjacentElement('afterend', window.util.fragment.appendChild(window.card.createCard(arrElem)));
  };

  var cardCloseHandler = function () {
    window.data.map.removeChild(noticeCard);

    document.removeEventListener('keydown', cardESCpressHandler);
    closeButton.removeEventListener('keydown', closeButtonEnterPressHandler);
    closeButton.removeEventListener('click', closeButtonClickHandler);
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

    noticeCard = window.data.map.querySelector('.map__card');
    closeButton = noticeCard.querySelector('.popup__close');

    document.addEventListener('keydown', cardESCpressHandler);
    closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
    closeButton.addEventListener('click', closeButtonClickHandler);
  };

  window.cardEvents = {
    setCardEvents: setCardEvents
  };
})();
