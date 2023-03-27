/* Конфигарция настроек */
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const forms = document.querySelectorAll(validationConfig.formSelector);

/*
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = ' ';
};

  const toggleButtonState = (inputList, buttonElement, setupElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(setupElement.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(setupElement.inactiveButtonClass);
    };
  };



const checkValidity = (inputElement, formElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


const setEventListeners = (formElement, validationConfig) => {
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkValidity(inputElement, formElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);*/



class FormValidator {
  constructor (validationConfig, formElement) {
    this._formElement = formElement;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  };

  _showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };

  _hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = ' ';
  };

  _toggleButtonState(inputList, buttonElement, setupElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(setupElement.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(setupElement.inactiveButtonClass);
    };
  };

  _checkValidity(inputElement, formElement, validationConfig) {

    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      this._hideInputError(formElement, inputElement, validationConfig);
    };
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setEventListeners() {


    console.log(thisElement)
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
    /*
    const inputList = Array.from(this.querySelectorAll(this.inputSelector));
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        this._checkValidity(inputElement, formElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });*/
  };
};



const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((item) => {
    const validationItem = new FormValidator(validationConfig, item);
    item.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    validationItem._setEventListeners();
  });
};



enableValidation(validationConfig);
