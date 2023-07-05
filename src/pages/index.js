import '../pages/index.css';
import {initialCards, validationConfig, buttonProfilePopupOpen, buttonAddCardPopupOpen, imageCardContainer, profileName,profileActivity, profileAvatar} from '../utils/constants';
import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/API.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const cohort = 'cohort-70';
const key = 'a400d028-60ca-4464-923c-d42d02840b32';
const api = new Api(cohort, key)

 /*Пользователь*/
const userInfo = new UserInfo(profileName, profileActivity, profileAvatar);

const serverCardsHendler = () => {
  api.getInitialCards()
  .then(() => cardList._items = api.cardData)
  .then(() => cardList.renderItems())
};

const serverUserInfoHendler = () => {
  api.getUserInfo()
  .then(() => {
    const name = api.name;
    const activity = api.activity;
    const avatar = api.avatar;
    userInfo.setUserInfo({name, activity, avatar})
  })
}

serverUserInfoHendler();
serverCardsHendler();

/*Работа с карточками*/

const cardLikesHandler = (card) => {
  card.refreshLikeData(api.resreshedLikeData)
  card.likeCounterHendler()
  card.likeToggler()
}

const cardsRenderer = (item) => {
  const card = new Card({data: item,
    handleCardClick: () => {
      const name = card.name
      const link = card.link
      imagePopup.open(name, link);
    },
    handleLikeClick: (CardID) => {
      card.likeChecker();
      if (!card.liked) {
        api.putLikeHendler(CardID)
        .then(() => {cardLikesHandler(card)})
      } else {
        api.deleteLikeHendler(CardID)
        .then(() => {cardLikesHandler(card)})
      }
    },
    handleDeleteIconClick: (cardId, element) => {
      popupConfirm.open(cardId, element)
    }
  },
    '.card-template', api.userId);
  const cardElement = card._generateCard();
  cardList.addItem(cardElement);
};

const cardList = new Section(cardsRenderer, imageCardContainer);

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.splice(-1);

formList.forEach((formElement) => {
    const validationItem = new FormValidator(validationConfig, formElement);
    validationItem.enableValidation();
  });

  /*Попапы с формами*/

const profileFormCallback = (inputsValues, popup) => {
  const name = inputsValues.profileNameForm;
  const activity = inputsValues.profileActivityForm;
  api.sendUserInfo(name, activity)
  .then(() => serverUserInfoHendler())
  .then(() => popup.close('Сохранить'))
};

const addCardFormCallback = (inputsValues, popup) => {
  const name = inputsValues.cardNameForm;
  const link = inputsValues.cardSrcForm;
  api.sendCard(link, name)
  .then(() => {
    console.log(api.newCard)
    cardList.renderItem(api.newCard)
    popup.close('Создать')
  })
};

const avatarFormCallback = (inputsValues, popup) => {
  const url = inputsValues.avatarSrcForm;
  api.sendUserAvatar(url)
  .then(() => serverUserInfoHendler())
  .then(() => popup.close('Сохранить'))
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


const popupConfirm = new PopupWithConfirm('.popup_type_confirm', () => {
  api.deleteCard(popupConfirm.id)
  .then(() => {
    popupConfirm.close('Да');
    popupConfirm.element.remove();
  })
});
popupConfirm.setEventListeners();


popupFormHendler('.popup_type_profile', buttonProfilePopupOpen, profileFormCallback);
popupFormHendler('.popup_type_add-card', buttonAddCardPopupOpen, addCardFormCallback);
popupFormHendler('.popup_type_avatar', profileAvatar, avatarFormCallback)



