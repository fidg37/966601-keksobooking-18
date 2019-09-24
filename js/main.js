'use strict'
var arraysLength = 8;

var authors = [];
var offers = [];
var locationsArray = [];
var notices = [];
/*
{
  "author": {
    "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },

  "offer": {
    "title": строка, заголовок предложения
    "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
    "price": число, стоимость
    "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    "rooms": число, количество комнат
    "guests": число, количество гостей, которое можно разместить
    "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
    "description": строка с описанием,
    "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  },

  "location": {
    "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    "y": случайное число, координата y метки на карте от 130 до 630.
  }
}
*/

var getRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createAuthorsArray = function () {
  for (var i = 0; i < arraysLength; i++) {
    if (authors.length > 0) {
      var createAvatar = function () {
        var random = getRandom(1, arraysLength);
        for (var j = 0; j < authors.length; j++) {
          if (authors[j].avatar === 'img/avatars/user0' + random + '.png') {
            j = authors.length;
            createAvatar();
            return;
          }
        };

        authors[i] = {
          avatar: 'img/avatars/user0' + random + '.png'
        };
      };

      createAvatar();
    } else {
      authors[i] = {
        avatar: 'img/avatars/user0' + getRandom(1, arraysLength) + '.png'
      };
    }
  };
};

var createOffersArray = function () {
  for (var i = 0; i < arraysLength; i++) {
    var x = getRandom (0,300);
    var y = getRandom (130, 630);
    var typeRandom = getRandom(1, 4);
    var checkinRand = getRandom(1, 3);
    var checkoutRand = getRandom(1, 3);
    
    var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    var randomFeaturesArray = [];
    var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
    var randomPhotosArray = [];

    var randomizePhotos = function () {
      var photosQuantity = getRandom(1, photos.length);
      for (var j = 0; j < photosQuantity; j++) {
        var random = getRandom(0, photosQuantity);
        if (randomPhotosArray.length > 0) {
          var createPhoto = function() {
            var random = getRandom(0, photosQuantity);
            for (y = 0; y < randomPhotosArray.length; y++) {
              if (randomPhotosArray[y] === photos[random]) {
                createPhoto();
                return;
              }
            };

            randomPhotosArray[j] = photos[random];
          };
          createPhoto();
        } else {
          randomPhotosArray[j] = photos[random];
        }
      }
    };

    var randomizeFeatures = function () {
      var featuresQuantity = getRandom(1, features.length);
      for (var j = 0; j < featuresQuantity; j++) {
        var random = getRandom(0, featuresQuantity);
        if (randomFeaturesArray.length > 0) {
          var createFeature = function() {
            var random = getRandom(0, featuresQuantity);
            for (y = 0; y < randomFeaturesArray.length; y++) {
              if (randomFeaturesArray[y] === features[random]) {
                createFeature();
                return;
              }
            };

            randomFeaturesArray[j] = features[random];
          };
          createFeature();
        } else {
          randomFeaturesArray[j] = features[random];
        }
      }
    };
    
    randomizeFeatures();
    randomizePhotos();
    
    offers[i] = {
      title: 'Title №' + (i + 1)
    };

    offers[i].address = x + ', ' + y;

    offers[i].price = getRandom(5000, 10000);

    if (typeRandom === 1) {
      offers[i].type = 'palace';
    } else if (typeRandom === 2) {
      offers[i].type = 'flat';
    } else if (typeRandom === 3) {
      offers[i].type = 'house';
    } else {
      offers[i].type = 'bungalo';
    }

    offers[i].rooms = getRandom(1, 5);

    offers[i].guests = getRandom(1, 5);

    if (checkinRand === 1) {
      offers[i].checkin = '12:00';
    } else if (checkinRand === 2) {
      offers[i].checkin = '13:00';
    } else {
      offers[i].checkin = '14:00';
    }

    if (checkoutRand === 1) {
      offers[i].checkout = '12:00';
    } else if (checkoutRand === 2) {
      offers[i].checkout = '13:00';
    } else {
      offers[i].checkout = '14:00';
    }

    offers[i].features = randomFeaturesArray;

    offers[i].description = 'Random description №' + (i + 1);

    offers[i].photos = randomPhotosArray;

  };
};

var createLocationsArray = function () {
  for (var i = 0; i < arraysLength; i++) {
    locationsArray[i] = {
      x: getRandom(0, 400),
      y: getRandom(130, 630)
    }
  };
};

var createNoticeArray = function () {
  for (var i = 0; i < arraysLength; i++) {
    notices[i] = {
      author: authors[i]
    };
    notices[i].offer = offers[i];
    notices[i].location = locationsArray[i];
  };
};

createAuthorsArray();
createOffersArray();
createLocationsArray();
createNoticeArray()

console.log(authors);
console.log(offers);
console.log(locationsArray);
console.log(notices);
