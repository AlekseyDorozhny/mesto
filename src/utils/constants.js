export const initialCards = [
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

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/* Переменные */
  /*Общие*/
  export const profilePopup = document.querySelector('.popup_type_profile');
  export const addCardPopup = document.querySelector('.popup_type_add-card');
  export const imageViewPopup = document.querySelector('.popup_type_image');
  export const imageCardContainer = document.querySelector('.elements');

    /*Модалка профиля*/
  export const inputName = document.querySelector('.popup__input_type_name');
  export const inputActivity = document.querySelector('.popup__input_type_activity');
  export const profileName = document.querySelector('.profile__name');
  export const profileActivity = document.querySelector('.profile__activity');
  export const buttonProfilePopupOpen = document.querySelector('.profile__edit-button');
  export const buttonProfilePopupClose = document.querySelector('.popup__close-button_area_profile');
  export const profileFormElement = document.querySelector('.popup__form_type_profile');

    /*Модалка добавления карточек*/
  export const buttonAddCardPopupOpen = document.querySelector('.profile__add-button');
  export const buttonAddCardPopupClose = document.querySelector('.popup__close-button_area_card');
  export const inputCardName = document.querySelector('.popup__input_type_card-name');
  export const inputCardSrc = document.querySelector('.popup__input_type_card-Src');
  export const cardFormElement = document.querySelector('.popup__form_type_card');


    /*Модалка просмотра карточек*/
  export const imageViewImage = document.querySelector('.image-popup__image');
  export const imageViewName = document.querySelector('.image-popup__name');
  export const buttonImageViewClose = document.querySelector('.popup__close-button_area_image');

