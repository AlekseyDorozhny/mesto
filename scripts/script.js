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
const element = document.querySelector('.element');
const elements = document.querySelector('.elements');
let like = document.querySelectorAll('.element__like');




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

function cardPopupOpen() {
  cardPopup.classList.add('popup_opened');
}

function cardPopupClose() {
  cardPopup.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', cardPopupOpen);
cardPopupCloseButton.addEventListener('click', cardPopupClose);


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
  console.log(newElement);
 const newElementImage = newElement.querySelector('img');
  const newElementName = newElement.querySelector('.element__name');


  newElementImage.src = newCard[0].link;
  newElementName.textContent = newCard[0].name;

  elements.prepend(newElement);
  cardPopupClose();

}

cardFormElement.addEventListener('submit', addNewCard);

/* Лайки */

like.addEventListener ('click', function(evt) {
  evt.target.classList.toggle('element__like_status_active');
});



console.log(like);
