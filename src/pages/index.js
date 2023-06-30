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

const serverCardsHendler = async () => {
  await api.getInitialCards()
  .then(() => cardList._items = api.cardData)
  .then(() => cardList.renderItems())
};

const getUserInfoCallBack = () => {
  const name = api.name;
  const activity = api.activity;
  const avatar = api.avatar;
  userInfo.setUserInfo({name, activity, avatar})
}

const serverUserInfoHendler = (uxCallback) => {
  api.getUserInfo(getUserInfoCallBack, uxCallback);
}

serverUserInfoHendler(() => {});

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

 /*Пользователь*/
const userInfo = new UserInfo(profileName, profileActivity, profileAvatar);

  /*Попапы с формами*/

const profileFormCallback = (inputsValues, saveButton, uxCallback) => {
  saveButton.textContent = 'Сохранение...'
  const name = inputsValues.profileNameForm;
  const activity = inputsValues.profileActivityForm;
  api.sendUserInfo(name, activity, () => {
    serverUserInfoHendler(uxCallback);
  });
};

const addCardFormCallback = (inputsValues) => {
  const data = {name: inputsValues.cardNameForm, link: inputsValues.cardSrcForm};
  cardsRenderer(data);
};

const avatarFormCallback = (inputsValues, saveButton, uxCallback) => {
  saveButton.textContent = 'Сохранение...'
  const url = inputsValues.avatarSrcForm;
    api.sendUserAvatar(url, () => {
      serverUserInfoHendler(uxCallback);
    })
  };



const popupFormHendler = (selector, buttonElement, callback) => {
  const popup = new PopupWithForm(selector, () => {
    const inputsValues = popup.inputsValues
    const saveButton = popup.saveButton
    callback(inputsValues, saveButton, () => {
      popup.close();
      saveButton.textContent = 'Сохранить'
    });
  });
  popup.setEventListeners();
  buttonElement.addEventListener('click', () => {
    popup.open();
  });
};

popupFormHendler('.popup_type_profile', buttonProfilePopupOpen, profileFormCallback);
popupFormHendler('.popup_type_add-card', buttonAddCardPopupOpen, addCardFormCallback);
popupFormHendler('.popup_type_avatar', profileAvatar, avatarFormCallback)


