import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, formCallback, openHendler) {
    super(selector);
    this._formCallback = formCallback;
    this._formElement = this._element.querySelector('.popup__form');
    this.inputList = this._formElement.querySelectorAll('.popup__input');
    this.inputsValues = {};
    this.saveButton = this._element.querySelector('.popup__save-button');
    this.saveButtonText = this.saveButton.textContent;
    this.openHendler = openHendler;
  };

  open() {
    this.openHendler();
    super.open();
  };

  getInputValues() {
    this.inputList.forEach((input) => {
      this.inputsValues[input.name] = input.value;
    });

  };

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this.saveButton.textContent = loadingText;
    } else {
      this.saveButton.textContent = this.saveButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true)
      this.getInputValues();
      this._formCallback();
    });
  };

  close() {
    this._formElement.reset();
    super.close();
  };
};
