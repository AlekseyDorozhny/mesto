/* Переменные */
  /*Общие*/
const profilePopup = document.querySelector('.popup_type_profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imageViewPopup = document.querySelector('.popup_type_image');

  /*Карточки*/
const cardTemplate = document.querySelector('.card-template').content;

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
const elements = document.querySelector('.elements');

  /*Модалка просмотра карточек*/
const imageViewImage = document.querySelector('.image-popup__image');
const imageViewName = document.querySelector('.image-popup__name');
const buttonImageViewClose = document.querySelector('.popup__close-button_area_image');

/* Функции открытия/закрытия попапов */

function openPopup(modal) {
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



function addNewCardContainer(imageSource, imageName) {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const like = newCard.querySelector('.element__like');
  const trash = newCard.querySelector('.element__trash');
  const cardName = newCard.querySelector('.element__name');
  const image = newCard.querySelector('.element__image');

  like.addEventListener ('click', function(evt) {
    evt.target.classList.toggle('element__like_status_active');
  });

  trash.addEventListener ('click', function() {
    newCard.remove();
  });

  cardName.textContent = imageName;
  image.src = imageSource;
  image.alt = `Изображение добавленное пользователем, название ${imageName}`;



  function openImagePopup() {
    openPopup(imageViewPopup);
    imageViewImage.src = image.src;
    imageViewImage.alt = `Изображение добавленное пользователем, название ${imageName}`;
    imageViewName.textContent = cardName.textContent;
  }

  image.addEventListener('click', openImagePopup);

    /* ......................*/
    return newCard;
}


  function addNewCard(imageSource, imageName) {
    elements.prepend(addNewCardContainer(imageSource, imageName));
  }


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
  addNewCard(inputCardSrc.value, inputCardName.value);
  closeAddCardPopup();
}

cardFormElement.addEventListener('submit', handleFormSubmitAddNewCard);


 /* function renderInitialCards() {
    for (let i = initialCards.length - 1; i > -1; i--) {
      addNewCard(initialCards[i].link, initialCards[i].name);
    };
  };

  renderInitialCards();*/



function closeImagePopup() {
  closePopup(imageViewPopup);
}

buttonImageViewClose.addEventListener('click', closeImagePopup);

