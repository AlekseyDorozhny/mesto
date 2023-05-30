import {initialCards, validationConfig, buttonProfilePopupOpen, buttonAddCardPopupOpen, imageCardContainer, profileName,profileActivity} from '../utils/constants.js';
import {Card} from './card.js';
import {FormValidator} from './FormValidator.js'
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';


const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();


/*Работа с карточками*/
const cardsRenderer = (item) => {
  const card = new Card({data: item, handleCardClick: () => {
    imagePopup._name = card._name;
    imagePopup._link = card._link;
    imagePopup.open();
  }},
    '.card-template');
  const cardElement = card._generateCard();
  cardList.addItem(cardElement);
};

const cardList = new Section ({items: initialCards, renderer: cardsRenderer},imageCardContainer);
  cardList.renderItems();

const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((formElement) => {
    const validationItem = new FormValidator(validationConfig, formElement);
    validationItem.enableValidation();
  });


 /*Пользователь*/
  const userInfo = new UserInfo(profileName, profileActivity);


  /*Попапы с формами*/
const profileFormCallback = (popup) => {
  const name = popup.inputsValues[0];
  const activity = popup.inputsValues[1];
  userInfo.setUserInfo({name, activity});
};

const addCardFormCallback = (popup) => {
  const data = {name: popup.inputsValues[0], link: popup.inputsValues[1]};
  cardsRenderer(data);
};


const popupFormHendler = (selector, buttonElement, callback) => {
  const popup = new PopupWithForm(selector, () => {
    callback(popup);
  });
  popup.setEventListeners();
  buttonElement.addEventListener('click', () => {
    popup.open();
  });
};

popupFormHendler('.popup_type_profile', buttonProfilePopupOpen, profileFormCallback);
popupFormHendler('.popup_type_add-card', buttonAddCardPopupOpen, addCardFormCallback);


