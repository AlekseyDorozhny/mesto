/*Для ревьювера: Я знаю, что мой код жутко не эфеективный, но к сожалению, я не знаю, как сделать его более легким и "правильным", по этому оставлю до первого ревью  все  как есть, потому что "оно" хотя бы работает :) */

/*Перменные попапа профиля и самого профиля*/
let profilePopupOpenButton = document.querySelector('.profile__edit-button');
let profilePopupCloseButton = document.querySelector('.popup__close-button_area_profile');
let profilePopup = document.querySelector('.popup_type_profile');
let profileFormElement = document.querySelector('.popup__form_type_profile');
let nameInput = document.querySelector('.popup__input_type_name');
let activityInput = document.querySelector('.popup__input_type_activity');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');

/*Переменные попапа добавления карточек и сами карточки*/
let cardPopupCloseButton = document.querySelector('.popup__close-button_area_card');
let cardPopupSaveButton = document.querySelector('.popup__save-button_area_card');
let cardPopup = document.querySelector('.popup_type_add-card');
let addCardButton = document.querySelector('.profile__add-button');
const elementImageContainer = document.querySelectorAll('.element__image-container');
const elementName = document.querySelectorAll('.element__name');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardSrcInput = document.querySelector('.popup__input_type_card-Src');
let cardFormElement = document.querySelector('.popup__form_type_card');
let element = document.querySelector('.element');
let allElements = document.querySelectorAll('.element');
let elements = document.querySelector('.elements');
let like = document.querySelectorAll('.element__like');
let trash = document.querySelectorAll('.element__trash');

/*Переменные попапа просмотра карточки */
const cardPopupView = document.querySelector('.popup_type_image');
const cardView = cardPopupView.querySelector('.image-popup');
const cardPopupViewCloseButton = cardPopupView.querySelector('.popup__close-button_area_image');
const cardViewName = cardPopupView.querySelector('.image-popup__name');
const cardImage = cardPopupView.querySelector('.image-popup__image');


/* Открытие/закрытие pop-up профиля */

function profilePopupOpen() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  profilePopup.classList.add('popup_opened');
}

function profilePopupClose() {
  profilePopup.classList.remove('popup_opened');
}

profilePopupOpenButton.addEventListener('click', profilePopupOpen);
profilePopupCloseButton.addEventListener('click', profilePopupClose);

/* Изменение имени и активности профиля */

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  profilePopupClose();
}

profileFormElement.addEventListener('submit', handleFormSubmit);

/* Открытие/закрытие pop-up добавления карточки*/

function addCardPopupOpen() {
  cardPopup.classList.add('popup_opened');
}

function addCardPopupClose() {
  cardPopup.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', addCardPopupOpen);
cardPopupCloseButton.addEventListener('click', addCardPopupClose);


/* Первичное заполнения блоков element__image */

function primaryCardFilling () {
  const elementImages = [];

  for (let i = 0; i < initialCards.length; i++) {
    const elementImage = document.createElement('img');
    elementImage.src = initialCards[i].link;
    elementImage.classList.add('element__image');
    elementName[i].textContent = initialCards[i].name;
    elementImageContainer[i].append(elementImage);
  }
}

primaryCardFilling();

/* Добавление новых карточек */

function addNewCard (evt) {
  evt.preventDefault();

  let newCard = [];
  newCard.unshift({name: cardNameInput.value, link: cardSrcInput.value});

  let newElement = element.cloneNode(true);
  const newElementImage = newElement.querySelector('img');
  const newElementName = newElement.querySelector('.element__name');

  let newElementTrash = newElement.querySelector('.element__trash');
  let newElementLike = newElement.querySelector('.element__like');

  newElementLike.addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__like_status_active');
  });

  newElementTrash.addEventListener('click', function() {
    newElement.remove();
  })


  newElementImage.src = newCard[0].link;
  newElementName.textContent = newCard[0].name;

  elements.prepend(newElement);
  cardPopupClose();

}

cardFormElement.addEventListener('submit', addNewCard);

/* Лайки старых карточек*/

[].forEach.call(like, function(item) {
  item.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_status_active');
  });
}) ;

/* Удаление старых карточек */

trash.forEach(function(trash, i) {
  trash.addEventListener('click', function() {
    allElements[i].remove();
  })
});

/* Попап просмотра карточек */


  let elmntImage = document.querySelectorAll('.element__image');
  let elmntImageName = document.querySelectorAll('.element__name');


  elmntImage.forEach(function(elmnt, i) {
    elmnt.addEventListener('click', function() {
      cardImage.src = elmntImage[i].src;
      cardViewName.textContent = elmntImageName[i].textContent;
      cardPopupView.classList.add('popup_opened');
    })
  });

function cardPopupClose() {
  cardPopupView.classList.remove('popup_opened');
}

cardPopupViewCloseButton.addEventListener('click', cardPopupClose);

