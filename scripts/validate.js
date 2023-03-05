/* Конфигарция настроек */
const FormValidationSetup = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/* Функции показа/скрытия ошибки*/
const showInputError = (formElement, inputElement, errorMessage, setupElement) => {
  console.log(inputElement);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add(setupElement.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setupElement.errorClass);
};

const hideInputError = (formElement, inputElement, setupElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(setupElement.inputErrorClass);
  errorElement.classList.remove(setupElement.errorClass);
  errorElement.textContent = ' ';
};

const toggleButtonState = (inputList, buttonElement, setupElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(setupElement.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(setupElement.inactiveButtonClass);
  };
};

/* Функции проверки валидности */
const checkValidity = (inputElement, formElement, setupElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, setupElement);
  } else {
    hideInputError(formElement, inputElement, setupElement);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};



/* Слушатель событий*/
const setEventListeners = (formElement, setupElement) => {
  const buttonElement = formElement.querySelector(setupElement.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(setupElement.inputSelector));
  toggleButtonState(inputList, buttonElement, setupElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkValidity(inputElement, formElement, setupElement);
      toggleButtonState(inputList, buttonElement, setupElement);
    });
  });
};


/* Общая функция включения валидации*/
const enableValidation = (setupElement) => {
  const formList = Array.from(document.querySelectorAll(setupElement.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, setupElement);
  });
};

enableValidation(FormValidationSetup);
