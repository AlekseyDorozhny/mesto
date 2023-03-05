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

function closeAllPopup() {
  closeEditProfilePopup();
  closeAddCardPopup();
  closeImagePopup();
};

  /* Закрытие всех модалок клавишей Esc*/
document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closeAllPopup();
  };
});

  /* Закрытие модалок кликом на темный фон*/
   /* Комментарий: При вводе неправильной ссылки в модалке добавления карточек мышка автоматически тянется выделить всю ссылку и клавиша мыши отпускается в темном фоне, из-за чего модалка закрывается. По этому вместо 'click' я использовал 'mousedown'*/
  document.addEventListener('mousedown', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closeAllPopup();
  };
});


/* Обработчик модалки профиля */
  /*Открытие*/
function renderProfileForm() {
  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
  openPopup(profilePopup);
}

buttonProfilePopupOpen.addEventListener('click', renderProfileForm);

  /*Смена имени*/
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;
  closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', submitEditProfileForm);

  /*Закрытие*/
function closeEditProfilePopup() {
  closePopup(profilePopup);
}

buttonProfilePopupClose.addEventListener('click', closeEditProfilePopup);


/* Обработчик модалки добавления карточек */
  /*Функция создания новой карточки*/
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

    /*Открытие окна просмотра*/

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

  /*Функция добавления новой карточки*/
  function addNewCard(imageSource, imageName) {
    elements.prepend(addNewCardContainer(imageSource, imageName));
  }

  /*Открытие/закрытие модалки добавления карточек*/
function openAddCardPopup() {
  openPopup(addCardPopup);
}

buttonAddCardPopupOpen.addEventListener('click', openAddCardPopup);

function closeAddCardPopup() {
  closePopup(addCardPopup);
  cardFormElement.reset();
}

buttonAddCardPopupClose.addEventListener('click', closeAddCardPopup);

  /*Обработчик*/
function handleFormSubmitAddNewCard(evt) {
  evt.preventDefault();
  addNewCard(inputCardSrc.value, inputCardName.value);
  closeAddCardPopup();
}

cardFormElement.addEventListener('submit', handleFormSubmitAddNewCard);

  /*Добавление "старых" карточек*/
  function renderInitialCards() {
    for (let i = initialCards.length - 1; i > -1; i--) {
      addNewCard(initialCards[i].link, initialCards[i].name);
    };
  };

  renderInitialCards();


/* Закрытие модалки просмотра карточек */

function closeImagePopup() {
  closePopup(imageViewPopup);
}

buttonImageViewClose.addEventListener('click', closeImagePopup);

