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
};

function closePopup(modal) {
  modal.classList.remove('popup_opened');
};

/* Обработчик модалки профиля */
  /*Открытие*/
function renderProfileForm() {
  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
  openPopup(profilePopup);
}

buttonProfilePopupOpen.addEventListener('click', renderProfileForm);

  /*Смена имени*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;
  closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', handleFormSubmit);

  /*Закрытие*/
function profilePopupClose() {
  closePopup(profilePopup);
}

buttonProfilePopupClose.addEventListener('click', profilePopupClose);

/* Обработчик модалки добавления карточек */
  /*Функция добавления новой карточки*/
function addNewCardContainer(imageSource, imageName) {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const like = newCard.querySelector('.element__like');
  const trash = newCard.querySelector('.element__trash');
  const cardName = newCard.querySelector('.element__name');
  const cardSrc = newCard.querySelector('.element__image');
  const image = newCard.querySelector('.element__image');

  like.addEventListener ('click', function(evt) {
    evt.target.classList.toggle('element__like_status_active');
  });

  trash.addEventListener ('click', function() {
    newCard.remove();
  });

  cardName.textContent = imageName;
  cardSrc.src = imageSource;

    /*Открытие окна просмотра*/

    function cardViewPopupOpen() {
      openPopup(imageViewPopup);
      imageViewImage.src = cardSrc.src;
      imageViewName.textContent = cardName.textContent;
    }

    image.addEventListener ('click', cardViewPopupOpen);

    /* ......................*/

  elements.prepend(newCard);
}

  /*Открытие/закрытие модалки добавления карточек*/
function openAddCardPopup() {
  openPopup(addCardPopup);
}

buttonAddCardPopupOpen.addEventListener('click', openAddCardPopup);

function closeAddCardPopup() {
  closePopup(addCardPopup);
}

buttonAddCardPopupClose.addEventListener('click', closeAddCardPopup);

  /*Обработчик*/
function handleFormSubmitAddNewCard(evt) {
  evt.preventDefault();

  addNewCardContainer(inputCardSrc.value, inputCardName.value);
  closeAddCardPopup();
}

cardFormElement.addEventListener('submit', handleFormSubmitAddNewCard);

  /*Добавление "старых" карточек*/
  function addInitialCard() {
    for (let i = initialCards.length - 1; i > -1; i--) {
      addNewCardContainer(initialCards[i].link, initialCards[i].name);
    };
  };

  addInitialCard();


/* Закрытие модалки просмотра карточек */

function CloseImageViewPopup() {
  closePopup(imageViewPopup);
}

buttonImageViewClose.addEventListener('click', CloseImageViewPopup);

