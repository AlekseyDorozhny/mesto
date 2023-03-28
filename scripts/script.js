import {Card} from './card.js';
import {initialCards, validationConfig} from './constants.js';
import {FormValidator} from './FormValidator.js'

/* Переменные */
  /*Общие*/
const profilePopup = document.querySelector('.popup_type_profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
export const imageViewPopup = document.querySelector('.popup_type_image');
const imageCardContainer = document.querySelector('.elements');

  /*Модалка профиля*/
const inputName = document.querySelector('.popup__input_type_name');
const inputActivity = document.querySelector('.popup__input_type_activity');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const buttonProfilePopupOpen = document.querySelector('.profile__edit-button');
const buttonProfilePopupClose = document.querySelector('.popup__close-button_area_profile');
const profileFormElement = document.querySelector('.popup__form_type_profile');

  /*Модалка добавления карточек*/
const buttonAddCardPopupOpen = document.querySelector('.profile__add-button');
const buttonAddCardPopupClose = document.querySelector('.popup__close-button_area_card');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardSrc = document.querySelector('.popup__input_type_card-Src');
const cardFormElement = document.querySelector('.popup__form_type_card');


  /*Модалка просмотра карточек*/
export const imageViewImage = document.querySelector('.image-popup__image');
export const imageViewName = document.querySelector('.image-popup__name');
const buttonImageViewClose = document.querySelector('.popup__close-button_area_image');

/* Функции открытия/закрытия попапов */

export function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', escClosePopupHandler);
  document.addEventListener('mousedown', sideClickCloseHandler);
};

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClosePopupHandler);
  document.removeEventListener('mousedown', sideClickCloseHandler);
};


const escClosePopupHandler = (evt) => {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  };
}


const sideClickCloseHandler = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};


function renderProfileForm() {
  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
  openPopup(profilePopup);
}

buttonProfilePopupOpen.addEventListener('click', renderProfileForm);


function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;
  closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', submitEditProfileForm);


function closeEditProfilePopup() {
  closePopup(profilePopup);
}

buttonProfilePopupClose.addEventListener('click', closeEditProfilePopup);

function openAddCardPopup() {
  openPopup(addCardPopup);
}

buttonAddCardPopupOpen.addEventListener('click', openAddCardPopup);

function closeAddCardPopup() {
  closePopup(addCardPopup);
  cardFormElement.reset();
}

buttonAddCardPopupClose.addEventListener('click', closeAddCardPopup);


function handleFormSubmitAddNewCard(evt) {
  evt.preventDefault();
  renderNewCardElement();
  closeAddCardPopup();
}

cardFormElement.addEventListener('submit', handleFormSubmitAddNewCard);

function closeImagePopup() {
  closePopup(imageViewPopup);
}

buttonImageViewClose.addEventListener('click', closeImagePopup);

const renderCardElements = (data) => {
  data.forEach((item) => {
    const card = new Card (item, '.card-template');
    const CardElement = card._generateCard();
    imageCardContainer.append(CardElement);
  });
};

renderCardElements(initialCards);

const addNewCardElement = (elementName, elementLink, data) => {
  data.unshift({name: elementName, link: elementLink});
  const card = new Card(data[0], '.card-template');
  const CardElement = card._generateCard();
  imageCardContainer.prepend(CardElement);
}

const renderNewCardElement = () => {
  addNewCardElement(inputCardName.value, inputCardSrc.value, initialCards);
};


const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    console.log(formElement)
    const validationItem = new FormValidator(validationConfig, formElement);
    console.log('Создание копии класса');
    console.log(validationItem);
    validationItem.enableValidation();
  });
