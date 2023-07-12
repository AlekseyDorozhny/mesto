import '../pages/index.css';
import {validationConfig, buttonProfilePopupOpen, buttonAddCardPopupOpen, imageCardContainer, profileName,profileActivity, profileAvatar} from '../utils/constants';
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: 'a400d028-60ca-4464-923c-d42d02840b32',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(profileName, profileActivity, profileAvatar);

const getAllInfo = () => {
  Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((res)=> {
    const userInfoData = res[1];
    const cardsData = res[0];
    userInfo.setUserInfo({name: userInfoData.name, activity: userInfoData.about, avatar: userInfoData.avatar, _id: userInfoData._id});
    cardList.userId = userInfoData._id;
    cardList.items = cardsData;
    cardList.renderItems();
    })
    .catch((err) => {console.log(err)})
}

getAllInfo()

const cardLikesHandler = (card, res) => {
  card.likes = res.likes;
  card.likeCounterHendler();
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
        .then((res) => {cardLikesHandler(card, res)})
        .catch((err) => {console.log(err)})
      } else {
        api.deleteLikeHendler(CardID)
        .then((res) => {cardLikesHandler(card, res)})
        .catch((err) => {console.log(err)})
      }
    },
    handleDeleteIconClick: (cardId, element) => {
      popupConfirm.open(cardId, element)
    }
  },
    '.card-template', cardList.userId);
  const cardElement = card.generateCard();
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
  .then((res) => userInfo.setUserInfo({name: res.name, activity: res.about, avatar: res.avatar, _id: res._id}))
  .then(() => popup.close())
  .catch((err) => {console.log(err)})
  .finally(() => popup.renderLoading(false))
};

const profileOpenHendler = (popup) => {
  popup.inputList[0].value = userInfo.userName.textContent
  popup.inputList[1].value = userInfo.userActivity.textContent
}

const addCardFormCallback = (inputsValues, popup) => {
  const name = inputsValues.cardNameForm;
  const link = inputsValues.cardSrcForm;
  api.sendCard(link, name)
  .then((res) => {
    cardList.renderItem(res)
    popup.close()
  })
  .catch((err) => {console.log(err)})
  .finally(() => popup.renderLoading(false))
};

const avatarFormCallback = (inputsValues, popup) => {
  const url = inputsValues.avatarSrcForm;
  api.sendUserAvatar(url)
  .then((res) => userInfo.setUserInfo({name: res.name, activity: res.about, avatar: res.avatar, _id: res._id}))
  .then(() => popup.close())
  .catch((err) => {console.log(err)})
  .finally(() => popup.renderLoading(false))
};

const popupFormHendler = (selector, buttonElement, callback, openHendler= ()=>{}) => {
  const popup = new PopupWithForm(selector, () => {
    const inputsValues = popup.inputsValues
    callback(inputsValues, popup)
  }, () => {openHendler(popup)});
  popup.setEventListeners();
  buttonElement.addEventListener('click', () => {
    popup.open();
  });
};

const popupConfirm = new PopupWithConfirm('.popup_type_confirm', () => {
  api.deleteCard(popupConfirm.id)
  .then(() => {
    popupConfirm.close();
    popupConfirm.element.remove();
  })
  .catch((err) => {console.log(err)})
  .finally(() => {
    popupConfirm.renderLoading(false);
  })
});
popupConfirm.setEventListeners();

popupFormHendler('.popup_type_profile', buttonProfilePopupOpen, profileFormCallback, profileOpenHendler);
popupFormHendler('.popup_type_add-card', buttonAddCardPopupOpen, addCardFormCallback);
popupFormHendler('.popup_type_avatar', profileAvatar, avatarFormCallback)



