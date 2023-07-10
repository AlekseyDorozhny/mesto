import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(selector, formCallback) {
    super(selector);
    this._formCallback = formCallback;
    this._formElement = this._element.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this.inputsValues = {};
    this.saveButton = this._element.querySelector('.popup__save-button');
    this.saveButtonText = this.saveButton.textContent;
  };

  _getInputValues() {
    this._inputList.forEach((input) => {
      this.inputsValues[input.name] = input.value;
    });
  };

  renderLoading(isLoading, loadingText='Удаление...') {
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
      this.renderLoading(true);
      this._formCallback();
    });
  };

  open(id, element) {
    this.id = id;
    this.element = element;
    super.open();
  }
};
