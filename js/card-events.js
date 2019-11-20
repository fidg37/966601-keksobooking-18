'use strict';
(function () {
  var closeButton;
  var noticeCard;

  var addCardToPage = function (arrElem) {
    var card = window.card.create(arrElem);
    window.data.pinsList.insertAdjacentElement('afterend', card);
  };

  var cardCloseHandler = function () {
    window.data.map.removeChild(noticeCard);
    window.pinsEvents.removePinAccent();

    document.removeEventListener('keydown', cardEscPressHandler);
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

  var cardEscPressHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      cardCloseHandler();
    }
  };

  var setCardEvents = function (i) {
    addCardToPage(window.mapFilter.filtratedData[i]);

    noticeCard = window.data.map.querySelector('.map__card');
    closeButton = noticeCard.querySelector('.popup__close');

    document.addEventListener('keydown', cardEscPressHandler);
    closeButton.addEventListener('keydown', closeButtonEnterPressHandler);
    closeButton.addEventListener('click', closeButtonClickHandler);
  };

  window.cardEvents = {
    set: setCardEvents
  };
})();
