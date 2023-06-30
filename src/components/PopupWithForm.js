import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, formCallback) {
    super(selector);
    this._formCallback = formCallback;
    this._formElement = this._element.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this.inputsValues = {};
    this.saveButton = this._element.querySelector('.popup__save-button');
  };

  _getInputValues() {
    this._inputList.forEach((input) => {
      this.inputsValues[input.name] = input.value;
    });

  };

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.saveButton.textContent = "Сохранение..."
      this._getInputValues();
      this._formCallback();
    });
  };

  close() {
    this._formElement.reset();
    super.close();
    this.saveButton.textContent = "Сохранить"
  };
};
