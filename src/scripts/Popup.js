export class Popup {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(selector);
    this._closeButtonElement = this._element.querySelector('.popup__close-button');
  };

  /*open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  };

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  };*/

open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  };




  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButtonElement.addEventListener('click', () => {
      this.close();
    });
    this._element.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      };
    });
  };
};
