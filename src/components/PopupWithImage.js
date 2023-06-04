import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._name = 'Упс, что-то пошло не так';
    this._link = 'https://otvet.imgsmail.ru/download/11e473d8bd6575cae570552bf4817cc8_i-4872.jpg';
    this._imageElement = document.querySelector('.image-popup__image');
    this._nameElement = document.querySelector('.image-popup__name');
  }

  open(name, link) {
    this._name = name;
    this._link = link;
    this._imageElement.src = this._link;
    this._imageElement.alt = `Изображение добавленное пользователем, название: ${this._name}`;
    this._nameElement.textContent = this._name;
    super.open()
  }
};
