import {initialCards, validationConfig, buttonProfilePopupOpen, profileFormElement,buttonProfilePopupClose, buttonAddCardPopupOpen, buttonAddCardPopupClose, cardFormElement, buttonImageViewClose, imageCardContainer, inputName, profileName, inputActivity, profileActivity, profilePopup, addCardPopup, inputCardName, inputCardSrc, imageViewPopup} from '../utils/constants.js';
import {Card} from './card.js';
import {FormValidator} from './FormValidator.js'
import {Popup} from './Popup.js';
import {Section} from './Section.js';

/* Функции открытия/закрытия попапов */
/*
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


*/

const createCard = (data, templateSelector) => {
  const card = new Card(data, templateSelector);
  const cardElement = card._generateCard();
  return cardElement
};

const renderCardElements = (data) => {
  data.forEach((item) => {
    const cardElement = createCard(item, '.card-template');
    imageCardContainer.append(cardElement);
  });
};




/*renderCardElements(initialCards);*/

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card._generateCard();
    cardList.addItem(cardElement)
  }
  },imageCardContainer);

  cardList.renderItems();

const addNewCardElement = (name, link) => {
  const cardData = {name:name, link:link}
  const cardElement = createCard(cardData, '.card-template');
  imageCardContainer.prepend(cardElement);
}

const renderNewCardElement = () => {
  addNewCardElement(inputCardName.value, inputCardSrc.value);
};
const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    const validationItem = new FormValidator(validationConfig, formElement);
    validationItem.enableValidation();
  });

const popupHendler = (selector, buttonElement) => {
  const popup = new Popup(selector);
  popup.setEventListeners();
  buttonElement.addEventListener('click', () => {
    popup.open();
  });
};

popupHendler('.popup_type_profile', buttonProfilePopupOpen);
popupHendler('.popup_type_add-card', buttonAddCardPopupOpen);
