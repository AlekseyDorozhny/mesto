import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._name = 'Упс, что-то пошло не так';
    this._link = 'https://otvet.imgsmail.ru/download/11e473d8bd6575cae570552bf4817cc8_i-4872.jpg';
  }

  open() {
    const imageViewImage = document.querySelector('.image-popup__image');
    const imageViewName = document.querySelector('.image-popup__name');
    imageViewImage.src = this._link;
    imageViewImage.alt = `Изображение добавленное пользователем, название: ${this._name}`;
    imageViewName.textContent = this._name;
    super.open()
  }
};
