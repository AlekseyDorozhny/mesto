import '../pages/index.css';
import {initialCards, validationConfig, buttonProfilePopupOpen, buttonAddCardPopupOpen, imageCardContainer, profileName,profileActivity} from '../utils/constants';
import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';


const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();


/*Работа с карточками*/
const cardsRenderer = (item) => {
  const card = new Card({data: item, handleCardClick: () => {
    const name = card._name
    const link = card._link
    imagePopup.open(name, link);
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
const profileFormCallback = (inputsValues) => {
  const name = inputsValues.profileNameForm;
  const activity = inputsValues.profileActivityForm;
  userInfo.setUserInfo({name, activity});
};

const addCardFormCallback = (inputsValues) => {
  const data = {name: inputsValues.cardNameForm, link: inputsValues.cardSrcForm};
  cardsRenderer(data);
};


const popupFormHendler = (selector, buttonElement, callback) => {
  const popup = new PopupWithForm(selector, () => {
    const inputsValues = popup.inputsValues
    callback(inputsValues);
  });
  popup.setEventListeners();
  buttonElement.addEventListener('click', () => {
    popup.open();
  });
};

popupFormHendler('.popup_type_profile', buttonProfilePopupOpen, profileFormCallback);
popupFormHendler('.popup_type_add-card', buttonAddCardPopupOpen, addCardFormCallback);
