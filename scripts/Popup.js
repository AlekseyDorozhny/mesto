export class Popup {
  constructor (selector) {
    this._selector = selector;
    this._status = 'closed';
    this._element = document.querySelector(selector);
    this._closeButtonElement = this._element.querySelector('.popup__close-button');
  };

  open() {
    this._element.classList.add('popup_opened');
    this._status = 'opened';
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  };

  close() {
    this._element.classList.remove('popup_opened');
    this._status = 'closed';
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
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
