import '../pages/index.css';
import {initialCards, validationConfig, buttonProfilePopupOpen, buttonAddCardPopupOpen, imageCardContainer, profileName,profileActivity, profileAvatar} from '../utils/constants';
import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import { Api } from '../components/API.js';

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cohort = 'cohort-70';
const key = 'a400d028-60ca-4464-923c-d42d02840b32';
const api = new Api(cohort, key)

 /*Пользователь*/
 const userInfo = new UserInfo(profileName, profileActivity, profileAvatar);

const serverCardsHendler = () => {
  new Promise((resolve, reject) => {
    api.getInitialCards(resolve)
  })
  .then(() => cardList._items = api.cardData)
  .then(() => cardList.renderItems())
};


const serverUserInfoHendler = () => {
  new Promise((resolve, reject) => {
    api.getUserInfo(resolve)
  }).then(() => {
    const name = api.name;
    const activity = api.activity;
    const avatar = api.avatar;
    userInfo.setUserInfo({name, activity, avatar})
  })
}

serverUserInfoHendler();

/*Работа с карточками*/

const cardsRenderer = (item) => {
  const card = new Card({data: item,
    handleCardClick: () => {
      const name = card.name
      const link = card.link
      imagePopup.open(name, link);
    },
    handleLikeClick: () => {

    },
    handleDeleteIconClick: () => {

    }
  },
    '.card-template', api.key);
  const cardElement = card._generateCard();
  cardList.addItem(cardElement);
};

const cardList = new Section(cardsRenderer, imageCardContainer);
serverCardsHendler();



const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((formElement) => {
    const validationItem = new FormValidator(validationConfig, formElement);
    validationItem.enableValidation();
  });

  /*Попапы с формами*/

const profileFormCallback = (inputsValues, popup) => {
  const name = inputsValues.profileNameForm;
  const activity = inputsValues.profileActivityForm;
  new Promise((resolve, reject) => {
    api.sendUserInfo(name, activity, resolve);
  })
  .then(() => serverUserInfoHendler())
  .then(() => popup.close())
};

const addCardFormCallback = (inputsValues) => {
  const name = inputsValues.cardNameForm;
  const link = inputsValues.cardSrcForm;
  console.log(name)
  console.log(link)
  new Promise((resolve, reject) => {
    api.sendCard(link, name, resolve)
  }).then(() => {
    serverCardsHendler()
    })
    /*const data = {name: inputsValues.cardNameForm, link: inputsValues.cardSrcForm};
  cardsRenderer(data);*/
};

const avatarFormCallback = (inputsValues, popup) => {
  const url = inputsValues.avatarSrcForm;
  new Promise((resolve, reject) => {
    api.sendUserAvatar(url, resolve)
  })
  .then(() => serverUserInfoHendler())
  .then(() => popup.close())
};



const popupFormHendler = (selector, buttonElement, callback) => {
  const popup = new PopupWithForm(selector, () => {
    const inputsValues = popup.inputsValues
    callback(inputsValues, popup);
  });
  popup.setEventListeners();
  buttonElement.addEventListener('click', () => {
    popup.open();
  });
};

popupFormHendler('.popup_type_profile', buttonProfilePopupOpen, profileFormCallback);
popupFormHendler('.popup_type_add-card', buttonAddCardPopupOpen, addCardFormCallback);
popupFormHendler('.popup_type_avatar', profileAvatar, avatarFormCallback)


