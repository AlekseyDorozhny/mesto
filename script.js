/* Открытие/закрытие pop-up */

let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

function popupOpen() {
  popup.classList.add('popup_opened')
}

function popupClose() {
  popup.classList.remove('popup_opened')
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

/* Изменение имени и активности профиля */

let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__input_name')
let activityInput = document.querySelector('.popup__input_activity')
let profileName = document.querySelector('.profile__name')
let profileActivity = document.querySelector('.profile__activity')

nameInput.setAttribute('value', profileName.textContent);
activityInput.setAttribute('value', profileActivity.textContent);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);




